# RositaAmada

Tienda online de indumentaria y streetwear. La interfaz funciona como catalogo estatico con carrito persistido en `localStorage`.

## Errores importantes detectados

1. **No existe integracion real con Mercado Pago.** Un checkout seguro requiere backend o Cloud Function para crear preferencias y recibir webhooks; las credenciales privadas no pueden estar en `main.js`.
2. **El catalogo esta hardcodeado.** Los productos viven dentro de `main.js`, por eso una hoja de Excel no puede actualizar la tienda sin editar codigo.
3. **El stock no tenia una fuente consistente.** Algunos productos declaraban stock global y otros variantes incompletas; eso podia permitir cantidades incorrectas en el carrito.
4. **Habia contenido de prueba visible.** La portada mostraba Lorem ipsum, nombres repetidos y CTA sin destino.
5. **Habia enlaces vacios y rutas absolutas mezcladas.** Esto provoca recargas, errores al publicar en una subcarpeta y navegacion inconsistente.
6. **No hay validacion de datos ni panel de administracion.** Antes de Firebase conviene validar el JSON y definir el modelo de variantes.

## Estado actual

- Portada responsive con identidad visual editorial y llamados a la accion funcionales.
- Catalogo y carrito existentes conservados.
- Precios con formato `es-AR`.
- Calculo de stock centralizado para variantes y productos simples.
- Estructura de datos propuesta en `data/productos.example.json`.

## Proximo orden recomendado

1. Migrar el arreglo de `main.js` a `data/productos.json`.
2. Agregar un conversor CSV a JSON con validaciones.
3. Probar carrito, stock y rutas en un servidor local.
4. Conectar Firebase Authentication/Firestore para administrar productos.
5. Implementar Mercado Pago desde una funcion server-side y probar estados de pago.
