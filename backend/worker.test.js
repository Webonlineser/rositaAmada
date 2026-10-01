import assert from "node:assert/strict";
import { after, test } from "node:test";
import worker from "./worker.js";

const originalFetch = globalThis.fetch;
after(() => {
  globalThis.fetch = originalFetch;
});

function firestoreValue(value) {
  if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
  if (typeof value === "number") return { integerValue: String(value) };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "string") return { stringValue: value };
  if (value === null) return { nullValue: null };
  return {
    mapValue: {
      fields: Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, firestoreValue(nested)]))
    }
  };
}

function makeEnvironment() {
  return {
    SITE_ORIGIN: "https://tienda.test",
    SITE_URL: "https://tienda.test",
    MP_MODE: "sandbox",
    MP_ACCESS_TOKEN: "TEST-example",
    FIREBASE_PROJECT_ID: "rositaamada",
    FIREBASE_API_KEY: "public-key"
  };
}

function makeFirestoreDocument(stock = 3) {
  const product = {
    id: 1,
    nombre: "Remera",
    precio: 45000,
    activo: true,
    stock_detalle: { black: { M: stock } }
  };
  return { fields: { productos: firestoreValue([product]) } };
}

function mockRemoteServices(t, { stock = 3 } = {}) {
  let preferencePayload;
  globalThis.fetch = async (input, options = {}) => {
    const target = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    if (target.hostname === "firestore.googleapis.com") {
      return new Response(JSON.stringify(makeFirestoreDocument(stock)), { status: 200 });
    }
    if (target.hostname === "api.mercadopago.com") {
      preferencePayload = JSON.parse(options.body);
      return new Response(JSON.stringify({
        sandbox_init_point: "https://sandbox.mercadopago.com.ar/checkout/v1/redirect"
      }), { status: 201 });
    }
    throw new Error(`Unexpected request to ${target.hostname}`);
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
  return () => preferencePayload;
}

test("preference uses Firestore price and validates the coupon", async (t) => {
  const getPreference = mockRemoteServices(t);
  const request = new Request("https://api.test/api/create-preference", {
    method: "POST",
    headers: { Origin: "https://tienda.test", "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ id: "1", quantity: 1, color: "black", size: "M", price: 1 }],
      coupon: "ROSITA10"
    })
  });

  const response = await worker.fetch(request, makeEnvironment());
  const result = await response.json();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://tienda.test");
  assert.equal(getPreference().items[0].unit_price, 40500);
  assert.equal(result.checkoutUrl, "https://sandbox.mercadopago.com.ar/checkout/v1/redirect");
});

test("preference rejects duplicate cart lines above variant stock", async (t) => {
  let mercadoPagoCalled = false;
  globalThis.fetch = async (input, options = {}) => {
    const target = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    if (target.hostname === "firestore.googleapis.com") {
      return new Response(JSON.stringify(makeFirestoreDocument(1)), { status: 200 });
    }
    if (target.hostname === "api.mercadopago.com") mercadoPagoCalled = true;
    throw new Error(`Unexpected request to ${target.hostname}`);
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const request = new Request("https://api.test/api/create-preference", {
    method: "POST",
    headers: { Origin: "https://tienda.test", "Content-Type": "application/json" },
    body: JSON.stringify({ items: [
      { id: "1", quantity: 1, color: "black", size: "M" },
      { id: "1", quantity: 1, color: "black", size: "M" }
    ] })
  });
  const response = await worker.fetch(request, makeEnvironment());
  const result = await response.json();
  assert.equal(response.status, 409);
  assert.match(result.error, /stock/i);
  assert.equal(mercadoPagoCalled, false);
});

test("image uploads require a Firebase ID token", async (t) => {
  let firebaseLookupCalled = false;
  globalThis.fetch = async () => {
    firebaseLookupCalled = true;
    throw new Error("Firebase must not be called without a token");
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const request = new Request("https://api.test/api/upload-image", {
    method: "POST",
    headers: { Origin: "https://tienda.test" },
    body: new FormData()
  });
  const response = await worker.fetch(request, {
    ...makeEnvironment(),
    ADMIN_EMAILS: "owner@example.com",
    PRODUCT_IMAGES: { put: async () => assert.fail("Unauthenticated uploads must not reach R2") }
  });
  const result = await response.json();
  assert.equal(response.status, 401);
  assert.match(result.error, /Google/i);
  assert.equal(firebaseLookupCalled, false);
});

test("authorized Google account can upload an allowed image to R2", async (t) => {
  let uploadedObject;
  globalThis.fetch = async (input) => {
    const target = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    assert.equal(target.hostname, "identitytoolkit.googleapis.com");
    return new Response(JSON.stringify({ users: [{ email: "nicolasgabrielgomez75@gmail.com", emailVerified: true }] }), { status: 200 });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const form = new FormData();
  form.set("file", new File(["jpeg-data"], "front.jpg", { type: "image/jpeg" }));
  form.set("path", "productos/NIC-10/front.jpg");
  const request = new Request("https://api.test/api/upload-image", {
    method: "POST",
    headers: { Origin: "https://tienda.test", Authorization: "Bearer valid-firebase-token" },
    body: form
  });
  const response = await worker.fetch(request, {
    ...makeEnvironment(),
    ADMIN_EMAILS: "nicolasgabrielgomez75@gmail.com",
    PRODUCT_IMAGES: {
      put: async (key, body, options) => { uploadedObject = { key, body, options }; }
    }
  });
  const result = await response.json();
  assert.equal(response.status, 201);
  assert.match(uploadedObject.key, /^productos\/NIC-10\/.+\.jpg$/);
  assert.equal(uploadedObject.options.httpMetadata.contentType, "image/jpeg");
  assert.equal(result.url.startsWith("https://api.test/media/productos/NIC-10/"), true);
});

test("another verified Google account cannot upload to R2", async (t) => {
  let r2Called = false;
  globalThis.fetch = async () => new Response(JSON.stringify({
    users: [{ email: "other@example.com", emailVerified: true }]
  }), { status: 200 });
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const form = new FormData();
  form.set("file", new File(["jpeg-data"], "front.jpg", { type: "image/jpeg" }));
  form.set("path", "productos/NIC-10/front.jpg");
  const request = new Request("https://api.test/api/upload-image", {
    method: "POST",
    headers: { Origin: "https://tienda.test", Authorization: "Bearer valid-firebase-token" },
    body: form
  });
  const response = await worker.fetch(request, {
    ...makeEnvironment(),
    ADMIN_EMAILS: "nicolasgabrielgomez75@gmail.com",
    PRODUCT_IMAGES: { put: async () => { r2Called = true; } }
  });
  const result = await response.json();
  assert.equal(response.status, 403);
  assert.match(result.error, /no está autorizada/i);
  assert.equal(r2Called, false);
});