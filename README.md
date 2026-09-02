# RositaAmada

Proyecto de e-commerce de indumentaria y streetwear. La web ya tiene una base funcional de catalogo, carrito y estructura visual, pero aun falta cerrar la parte de administracion, datos reales y pagos.

## Estado actual de la web

### Lo que ya esta hecho
- Home principal con hero, barra informativa, promos y secciones visuales.
- Catalogo de productos y detalle de producto.
- Carrito funcional con persistencia local.
- Logica de stock y descuento.
- Panel de administracion para importar productos desde Excel/CSV.
- Estructura base para datos en Firebase/Firestore.
- Archivos de ejemplo para `siteConfig/home` y `productos/{codigo}`.
- Configuracion inicial de Firebase preparada para uso futuro.

### Lo que aun falta para terminar la web
- Conectar la web con Firestore para leer productos y contenido global.
- Dejar de depender de `localStorage` para datos principales.
- Definir el flujo final de carga de productos desde Excel a base de datos.
- Reemplazar datos de prueba por datos reales del cliente.
- Implementar la logica completa del checkout y envio.
- Integrar Mercado Pago real con backend seguro.
- Resolver la parte de imagenes y almacenamiento de archivos.
- Definir permisos, auth y acceso privado del panel administrativo.
- Revisar estilo final, responsive y QA de todas las paginas.
- Hacer prueba final con flujo completo: cargar producto, ver web, agregar al carrito, pagar, enviar.

## Estimacion realista de avance

Considerando todo lo que falta para dejar la web terminada y lista para uso con datos reales, el avance actual se estima asi:

- Frontend publico: 85%
- Catalogo/productos y estructura: 75%
- Panel administrativo: 70%
- Firestore / datos reales: 45%
- Checkout / pagos: 0%
- Imagenes / almacenamiento: 10%
- QA final y pulido de produccion: 35%

### Resultado estimado
- Proyecto completado: 62%
- Restante para terminar: 38%

## Orden recomendado para seguir manana

1. Conectar el panel administrativo con Firestore.
2. Cargar productos reales desde Excel y validar estructura.
3. Hacer que la web lea desde Firestore en vez de localStorage.
4. Arreglar el flujo final de envio y checkout.
5. Preparar Mercado Pago real y pruebas de pago.
6. Dejar el panel privado, con control de contenido y carga de datos.
7. Revisar responsive final y pulido visual.
8. Hacer una prueba end-to-end completa antes de lanzar.

## Nota

El estado actual es funcional como base de proyecto, pero aun no es una web de produccion terminada. La mayor parte del trabajo restante no es visual sino de estructura de datos, integracion y flujo de negocio.

Seguimos manana con el mismo enfoque: dejar el proyecto listo por etapas y priorizando lo que realmente falta para que el cliente pueda operar la web sin editar codigo.

