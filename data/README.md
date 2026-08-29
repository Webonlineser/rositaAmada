# Catalogo de productos

La fuente recomendada para el catalogo es una hoja con estas columnas:

`id | nombre | descripcion | precio | marca | categoria | imagenes | color | talle | stock | activo`

Cada fila representa una variante. Por ejemplo, una remera negra talle M es una fila distinta de la misma remera blanca talle M. Exporta la hoja como CSV UTF-8 y conviertela al formato de `productos.example.json`.

## Ruta de aprendizaje

1. Ordenar la hoja y validar campos obligatorios: `id`, `nombre`, `precio`, `stock`.
2. Generar un JSON con un script de importacion y validar que los precios sean numeros.
3. Reemplazar el arreglo de productos de `main.js` por una carga desde `data/productos.json`.
4. Cuando el catalogo este estable, migrar esos documentos a Firebase Firestore.
5. Crear una Cloud Function para Mercado Pago. El token privado nunca debe vivir en HTML o JavaScript del navegador.

`productos.example.json` es solo una referencia de estructura y no se carga automaticamente todavia.
