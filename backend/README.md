# Backend de checkout

Este Worker sirve la tienda estatica, la API de Checkout Pro y las imagenes desde una sola URL `workers.dev`. Las fotos se guardan en R2 Standard; el panel envia el token de Firebase y el Worker autoriza unicamente los correos incluidos en `ADMIN_EMAILS`. Arranca en sandbox y toma precio y stock del documento publicado `catalog/current` de Firestore. No confia en precios ni totales enviados por el navegador.

## Requisitos previos

- Cuenta de Cloudflare con Workers Free habilitado. El plan Free tiene limites de invocaciones para la API; los archivos estaticos son gratuitos.
- R2 Standard incluye 10 GB-mes, 1 millon de operaciones de escritura y 10 millones de lecturas por mes; el egreso es gratuito. El uso sobre esas cuotas puede generar cargos.
- Cuenta de Mercado Pago con credenciales de prueba.
- Proyecto Firebase con Google habilitado como proveedor de Authentication.
- Lectura publica habilitada para `catalog/current` en Firestore, igual que requiere la tienda.
- Un catalogo con productos publicado desde el panel admin.

## Configuracion

1. En Firebase Console > Authentication > Sign-in method, habilitar Google. En Authorized domains, agregar `rositaamada-checkout.nicolasgabrielgomez75.workers.dev`.
2. `ADMIN_EMAILS` ya está configurado en `wrangler.toml` para `nicolasgabrielgomez75@gmail.com`. El mismo allowlist del panel está en `admin/app.js`; cuando se sumen los dueños, agregar sus correos en ambos lugares y volver a desplegar.
3. Crear el bucket enlazado por `PRODUCT_IMAGES`: `npx wrangler r2 bucket create rositaamada-product-images`.
4. Para pagos, cargar el token de prueba como secreto: `npx wrangler secret put MP_ACCESS_TOKEN`. Usar el token de prueba que empieza con `TEST-`, no el token privado de produccion.
5. Publicar con `npm run deploy`. La misma URL `workers.dev` sirve web, API e imagenes.
6. En el panel de desarrolladores de Mercado Pago, registrar `<URL-WORKER>/api/webhook` como webhook para pagos. Copiar el secreto de firma y cargarlo con `npx wrangler secret put MP_WEBHOOK_SECRET`.
7. Probar `/api/health`, iniciar sesion con Google, subir una foto y crear una compra de prueba.

No pegues tokens en archivos del frontend, en `wrangler.toml`, ni en el chat. Para volver a desplegar en produccion, primero se necesita una cuenta de vendedor real, dominio HTTPS, token de produccion y cambiar `MP_MODE` a `production` de forma intencional.

## Alcance de esta primera etapa

- `POST /api/create-preference`: valida producto, precio, stock y cupones antes de crear el checkout.
- `POST /api/upload-image`: verifica el ID token Firebase, el correo autorizado, el formato y el tamano antes de guardar en R2.
- `GET /media/*`: sirve imagenes desde R2 sin exponer el bucket ni credenciales de escritura.
- `GET /api/payment-status`: consulta a Mercado Pago el estado usando una referencia aleatoria.
- `POST /api/webhook`: verifica la firma y consulta el pago; deja el resultado en los logs del Worker.

Esta etapa no descuenta stock ni guarda pedidos de forma permanente. Hasta agregar esa persistencia, revisar los pagos aprobados en Mercado Pago y actualizar el stock desde el panel antes de despachar.