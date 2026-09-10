# Catalogo de productos

La fuente recomendada para el catalogo es una hoja con estas columnas:

`id | nombre | descripcion | precio | marca | categoria | imagenes | color | talle | stock | activo`

Cada fila representa una variante. Por ejemplo, una remera negra talle M es una fila distinta de la misma remera blanca talle M. Exporta la hoja como CSV UTF-8 y conviertela al formato de `productos.example.json`.

## Columnas que entiende el panel

- `id`, `codigo` o `sku`: codigo unico que tambien permite buscar y editar el producto desde el panel.
- `nombre`, `marca`, `categoria`, `descripcion`, `precio`, `stock` e `imagenes`.
- `colores`: una sola columna con nombres CSS en ingles separados por coma, por ejemplo `black, white, red`. El panel tambien convierte nombres comunes en español como `negro` a `black`.
- `talles`: valores separados por coma, por ejemplo `S, M, L` o `38, 39, 40`.
- `descuento`: porcentaje numerico. Si es mayor que cero, el producto queda marcado para Sale.
- `nuevo`: `si`, `true`, `1` o `new` lo muestra como New Arrivals / Novedades.
- `activo`: `si` o `true` lo deja visible en la tienda.
- `stock_detalle`: opcionalmente un JSON para stock por color y talle.

El panel muestra cada sector que se modifica, permite revisar la tabla antes de guardar y ofrece edición individual por código. Al pulsar **Guardar productos en Firebase**, el flujo es:

1. El Excel se transforma y normaliza a objetos JavaScript.
2. Cada producto se guarda en `productos/{id}`.
3. El JSON completo se publica en `catalog/current`, junto con `updatedAt` y la cantidad de productos.
4. La web lee `catalog/current` al iniciar y usa la colección individual como respaldo.

Así, cada nueva carga del panel reemplaza el JSON publicado sin editar manualmente los archivos del proyecto.

## Ruta de aprendizaje

1. Ordenar la hoja y validar campos obligatorios: `id`, `nombre`, `precio`, `stock`.
2. Generar un JSON con un script de importacion y validar que los precios sean numeros.
3. Reemplazar el arreglo de productos de `main.js` por una carga desde `data/productos.json`.
4. Cuando el catalogo este estable, migrar esos documentos a Firebase Firestore.
5. Crear una Cloud Function para Mercado Pago. El token privado nunca debe vivir en HTML o JavaScript del navegador.

`productos.example.json` es solo una referencia de estructura y no se carga automaticamente todavia.
