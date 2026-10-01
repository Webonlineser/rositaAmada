const COUPONS = { ROSITA10: 10, ROSITA20: 20, BARRIO: 15 };

function json(data, status, request, env) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin"
  };
  const origin = request.headers.get("Origin");
  if (origin && origin === env.SITE_ORIGIN) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  const body = status === 204 ? null : JSON.stringify(data);
  return new Response(body, { status, headers });
}

function fail(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function decodeValue(value) {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields || {});
  return null;
}

function decodeFields(fields) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));
}

async function getPublishedProducts(env) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;
  if (!projectId || !apiKey) throw fail("Falta configurar la lectura publica del catalogo.", 503);

  const url = new URL(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/catalog/current`);
  url.searchParams.set("key", apiKey);
  const response = await fetch(url);
  if (response.status === 404) throw fail("No hay un catalogo publicado en Firestore.", 409);
  if (!response.ok) throw fail("No se pudo validar el catalogo publicado.", 502);

  const document = await response.json();
  const fields = decodeFields(document.fields || {});
  if (!Array.isArray(fields.productos) || !fields.productos.length) {
    throw fail("El catalogo publicado no tiene productos.", 409);
  }
  return fields.productos;
}

function getAvailableStock(product, color, size) {
  const variants = product.stock_detalle || product.stockDetalle;
  if (variants && Object.keys(variants).length) {
    return Math.max(0, Number(variants[color]?.[size]) || 0);
  }
  return Math.max(0, Number(product.stock ?? product.cantidad) || 0);
}

function normalizeCheckoutItems(requestItems, products) {
  if (!Array.isArray(requestItems) || requestItems.length < 1 || requestItems.length > 30) {
    throw fail("El carrito no tiene un formato valido.");
  }

  let totalQuantity = 0;
  return requestItems.map((item) => {
    const id = String(item?.id ?? "").trim();
    const quantity = Number(item?.quantity);
    const color = String(item?.color ?? "").trim();
    const size = String(item?.size ?? "").trim();
    if (!id || id.length > 100 || /[/.]/.test(id)) throw fail("Hay un producto invalido en el carrito.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw fail("La cantidad solicitada no es valida.");
    totalQuantity += quantity;
    if (totalQuantity > 50) throw fail("El carrito supera el limite de unidades por compra.");

    const product = products.find((candidate) => String(candidate.id ?? candidate.codigo) === id);
    if (!product || product.activo === false) throw fail(`El producto ${id} ya no esta disponible.`, 409);
    const unitPrice = Number(product.precio);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) throw fail(`El producto ${id} no tiene un precio valido.`, 409);

    if (product.stock_detalle || product.stockDetalle) {
      if (!color || !size) throw fail(`Elegí color y talle para ${product.nombre || id}.`, 409);
    }
    if (getAvailableStock(product, color, size) < quantity) {
      throw fail(`No hay stock suficiente para ${product.nombre || id}.`, 409);
    }

    return {
      id,
      title: [product.nombre || `Producto ${id}`, color, size].filter(Boolean).join(" - ").slice(0, 250),
      quantity,
      unitPrice,
      currency_id: "ARS"
    };
  });
}

function returnUrl(siteUrl, state, reference) {
  const url = new URL("/pages/productos.html", siteUrl);
  url.searchParams.set("checkout", state);
  url.searchParams.set("external_reference", reference);
  return url.toString();
}

async function mercadoPagoRequest(path, env, options = {}) {
  if (!env.MP_ACCESS_TOKEN) throw fail("Falta configurar el token de Mercado Pago en el backend.", 503);
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Mercado Pago API error", response.status, result.message || result.error || "unknown");
throw fail("PRUEBA WORKER 123", 502);  }
  return result;
}

async function createPreference(request, env) {
  const siteUrl = env.SITE_URL;
  if (!siteUrl || !env.SITE_ORIGIN) throw fail("Falta configurar la URL publica de la tienda.", 503);
  const site = new URL(siteUrl);
  if (env.MP_MODE === "production" && site.protocol !== "https:") {
    throw fail("La tienda debe tener HTTPS para habilitar pagos reales.", 503);
  }
  if (env.MP_MODE !== "production" && !env.MP_ACCESS_TOKEN) {
  throw fail("Falta configurar el token de Mercado Pago en el backend.", 503);
}
  if (env.MP_MODE === "production" && env.MP_ACCESS_TOKEN?.startsWith("TEST-")) {
    throw fail("El modo produccion requiere un token de produccion.", 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    throw fail("La solicitud no contiene JSON valido.");
  }

  const products = await getPublishedProducts(env);
  const items = normalizeCheckoutItems(body.items, products);
  const coupon = String(body.coupon || "").trim().toUpperCase();
  if (coupon && !COUPONS[coupon]) throw fail("El cupon no es valido.");
  const discount = coupon ? COUPONS[coupon] : 0;
  const preferenceItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    currency_id: item.currency_id,
    unit_price: Number((item.unitPrice * (100 - discount) / 100).toFixed(2))
  }));
  const reference = crypto.randomUUID();
  const workerUrl = new URL(request.url);

  const preference = await mercadoPagoRequest("/checkout/preferences", env, {
    method: "POST",
    body: JSON.stringify({
      items: preferenceItems,
      external_reference: reference,
      notification_url: new URL("/api/webhook", workerUrl.origin).toString(),
      back_urls: {
        success: returnUrl(siteUrl, "success", reference),
        pending: returnUrl(siteUrl, "pending", reference),
        failure: returnUrl(siteUrl, "failure", reference)
      },
      auto_return: "approved"
    })
  });

  const checkoutUrl = env.MP_MODE === "production"
    ? preference.init_point
    : preference.sandbox_init_point || preference.init_point;
  if (!checkoutUrl) throw fail("Mercado Pago no devolvio una URL de pago.", 502);
  return { checkoutUrl, externalReference: reference };
}

async function getPaymentStatus(reference, env) {
  const url = new URL("https://api.mercadopago.com/v1/payments/search");
  url.searchParams.set("external_reference", reference);
  url.searchParams.set("sort", "date_created");
  url.searchParams.set("criteria", "desc");
  const result = await mercadoPagoRequest(`${url.pathname}${url.search}`, env);
  const payment = result.results?.[0];
  return { status: payment?.status || "pending" };
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyWebhook(request, paymentId, secret) {
  const signatureHeader = request.headers.get("x-signature") || "";
  const requestId = request.headers.get("x-request-id") || "";
  const parts = Object.fromEntries(signatureHeader.split(",").map((part) => {
    const [key, value] = part.trim().split("=");
    return [key, value];
  }));
  if (!parts.ts || !parts.v1 || !requestId) return false;

  const manifest = `id:${String(paymentId).toLowerCase()};request-id:${requestId};ts:${parts.ts};`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  const digest = bytesToHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest)));
  if (digest.length !== parts.v1.length) return false;
  let difference = 0;
  for (let index = 0; index < digest.length; index += 1) difference |= digest.charCodeAt(index) ^ parts.v1.charCodeAt(index);
  return difference === 0;
}

async function handleWebhook(request, env) {
  if (!env.MP_WEBHOOK_SECRET) return json({ error: "Webhook sin configurar." }, 503, request, env);
  const url = new URL(request.url);
  let body = {};
  try { body = await request.json(); } catch { /* Mercado Pago can send an empty notification body. */ }
  const paymentId = url.searchParams.get("data.id") || body.data?.id;
  const type = url.searchParams.get("type") || body.type;
  if (type !== "payment") return json({ received: true }, 200, request, env);
  if (!paymentId || !(await verifyWebhook(request, paymentId, env.MP_WEBHOOK_SECRET))) {
    return json({ error: "Firma de webhook invalida." }, 401, request, env);
  }

  const payment = await mercadoPagoRequest(`/v1/payments/${encodeURIComponent(paymentId)}`, env);
  console.log("Verified Mercado Pago payment notification", {
    externalReference: payment.external_reference,
    status: payment.status
  });
  return json({ received: true }, 200, request, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return json({}, 204, request, env);
    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ready: true, mode: env.MP_MODE || "sandbox" }, 200, request, env);
    }
    if (url.pathname === "/api/webhook" && request.method === "POST") {
      try { return await handleWebhook(request, env); }
      catch (error) {
        console.error("Webhook processing failed", error.message);
        return json({ error: "No se pudo procesar la notificacion." }, error.status || 500, request, env);
      }
    }

    const origin = request.headers.get("Origin");
    if (origin && origin !== env.SITE_ORIGIN) return json({ error: "Origen no autorizado." }, 403, request, env);

    try {
      if (url.pathname === "/api/create-preference" && request.method === "POST") {
        return json(await createPreference(request, env), 200, request, env);
      }
      if (url.pathname === "/api/payment-status" && request.method === "GET") {
        const reference = url.searchParams.get("external_reference") || "";
        if (!/^[0-9a-f-]{36}$/i.test(reference)) throw fail("Referencia de pago invalida.");
        return json(await getPaymentStatus(reference, env), 200, request, env);
      }
      return json({ error: "Ruta no encontrada." }, 404, request, env);
    } catch (error) {
      return json({ error: error.message || "Error interno." }, error.status || 500, request, env);
    }
  }
};