# Integracion del catalogo y Mercado Pago

## Lectura futura desde JSON

El punto actual del catalogo es el arreglo `productos` en `main.js`. La migracion recomendada es:

1. Exportar la planilla como CSV UTF-8.
2. Convertir cada fila a `data/productos.json` usando la estructura de `data/productos.example.json`.
3. Reemplazar el arreglo local por una carga asincrona:

```js
const respuesta = await fetch("./data/productos.json");
const productos = await respuesta.json();
```

La funcion `renderProductos` dibuja las tarjetas del catalogo. La logica de detalle busca por `id`, y `renderProductosSimilares` filtra por categoria. Ambas funciones quedaran reutilizables si la fuente cambia de arreglo local a JSON o Firestore.

## Mercado Pago

Mercado Pago no debe integrarse directamente con un token privado en `main.js`. El flujo seguro necesita un backend o Firebase Cloud Function:

1. El navegador envia al backend los productos del carrito y sus cantidades.
2. El backend valida precios y stock contra la fuente oficial.
3. El backend crea una preferencia de Mercado Pago con el SDK oficial.
4. El backend devuelve `init_point` o `sandbox_init_point` al navegador.
5. El navegador redirige al comprador a Mercado Pago.
6. Un webhook del backend confirma el estado real del pago y actualiza el stock.

Puntos recomendados para agregarlo:

- Frontend: handler de `btn_checkout` al final de `main.js`.
- Backend: `functions/src/mercadopago/createPreference`.
- Webhook: `functions/src/mercadopago/webhook`.
- Configuracion: credenciales en variables de entorno o Firebase Secret Manager.

Nunca confiar en el precio recibido desde el navegador. El backend debe reconstruir el total usando los IDs del carrito y el catalogo oficial.

## Checklist antes de publicar

- [ ] Validar CSV y campos obligatorios.
- [ ] Validar stock por variante.
- [ ] Crear preferencia en backend.
- [ ] Configurar URLs de exito, pendiente y fallo.
- [ ] Configurar webhook HTTPS.
- [ ] Probar primero con credenciales de prueba.
- [ ] Activar reglas de Firestore y limitar escritura al backend.
