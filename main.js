/* =========================  
   🧭 MENU
========================= */

const Btn_menu = document.getElementById("btn_Menu");
const menu = document.getElementById("menu");
const btnCerrar = document.getElementById("btn_cerrar");

if (Btn_menu && menu) {
  Btn_menu.addEventListener("click", () => {
    menu.classList.toggle("activo");
    document.body.classList.toggle("no-scroll");
  });
}

if (btnCerrar && menu) {
  btnCerrar.addEventListener("click", () => {
    menu.classList.remove("activo");
    document.body.classList.remove("no-scroll");
  });
}


/* =========================
   📂 FOOTER
========================= */

document.querySelectorAll(".politicas_li").forEach(item => {
  const boton = item.querySelector(".btn_mas");
  if (boton) {
    boton.addEventListener("click", () => {
      item.classList.toggle("activo");
    });
  }
});

document.querySelectorAll(".marcas_li").forEach(item => {
  const boton = item.querySelector(".btn_marcas");
  if (boton) {
    boton.addEventListener("click", () => {
      item.classList.toggle("activo");
    });
  }
});


/* =========================
   📋 LISTA MARCAS
========================= */

const btnMarcas = document.querySelector(".btn_mas_lista");
const listaMarcas = document.querySelector(".box_list_marcas");
const icono = document.querySelector(".img_btn_mas");

if (btnMarcas && listaMarcas) {
  btnMarcas.addEventListener("click", () => {
    const abierto = listaMarcas.style.display === "block";
    listaMarcas.style.display = abierto ? "none" : "block";
    if (icono) {
      icono.style.transform = abierto ? "rotate(0deg)" : "rotate(45deg)";
    }
  });
}



/*productos*/

const productos = [
{ id: 1, cantidad:"5", nombre: "Remera Adidas Originals", descripcion: "Remera de algodón estampada", precio: 45000, talle: ["S","M","L"], colores:["black","white","red"], stock: true, categoria: "Remeras", marca: "ADIDAS", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 2, cantidad:"5", nombre: "Remera Nike Club", descripcion: "Remera básica deportiva", precio: 42000, talle: ["S","M","L"], colores:["black","gray","white"], stock: true, categoria: "Remeras", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 3, cantidad:"5", nombre: "Remera Puma Essential", descripcion: "Remera urbana lisa", precio: 40000, talle: ["M","L"], colores:["black","green"], stock: true, categoria: "Remeras", marca: "PUMA", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 4, cantidad:"5", nombre: "Remera Calvin Klein", descripcion: "Remera premium minimalista", precio: 60000, talle: ["S","M","L"], colores:["white","black"], stock: true, categoria: "Remeras", marca: "CALVIN KLEIN", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 5, cantidad:"5", nombre: "Remera Tommy Hilfiger", descripcion: "Remera clásica logo", precio: 65000, talle: ["M","L"], colores:["blue","white","red"], stock: true, categoria: "Remeras", marca: "TOMY HILFIGER", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },

{ id: 6, cantidad:"5", nombre: "Pantalón Adidas Tiros", descripcion: "Pantalón deportivo training", precio: 75000, talle: ["M","L"], colores:["black","gray"], stock: true, categoria: "Pantalones", marca: "ADIDAS", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 7, cantidad:"5", nombre: "Pantalón Nike Jogger", descripcion: "Jogger urbano cómodo", precio: 72000, talle: ["S","M","L"], colores:["black","gray","blue"], stock: true, categoria: "Pantalones", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 8, cantidad:"5", nombre: "Pantalón Puma Fit", descripcion: "Pantalón deportivo liviano", precio: 68000, talle: ["S","M","L"], colores:["black","green"], stock: true, categoria: "Pantalones", marca: "PUMA", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 9, cantidad:"5", nombre: "Pantalón Cargo Urban", descripcion: "Cargo streetwear", precio: 78000, talle: ["M","L","XL"], colores:["brown","black"], stock: true, categoria: "Pantalones", marca: "ESSENCIAL", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 10, cantidad:"5", nombre: "Pantalón Jordan Training", descripcion: "Pantalón deportivo ajustado", precio: 70000, talle: ["M","L"], colores:["black","red"], stock: false, categoria: "Pantalones", marca: "JORDAN", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},

{ id: 11, cantidad:"5", nombre: "Buzo Nike Club", descripcion: "Buzo sin capucha", precio: 85000, talle: ["M","L","XL"], colores:["black","gray"], stock: true, categoria: "Buzos", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 12, cantidad:"5", nombre: "Buzo Puma Essentials", descripcion: "Buzo con capucha", precio: 80000, talle: ["M","L"], colores:["black","blue"], stock: false, categoria: "Buzos", marca: "PUMA", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 13, cantidad:"5", nombre: "Buzo Adidas Hoodie", descripcion: "Buzo frizado", precio: 90000, talle: ["S","M","L"], colores:["black","red"], stock: true, categoria: "Buzos", marca: "ADIDAS", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 14, cantidad:"5", nombre: "Buzo Lacoste Classic", descripcion: "Buzo elegante deportivo", precio: 95000, talle: ["M","L"], colores:["green","white"], stock: true, categoria: "Buzos", marca: "LACOSTE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 15, cantidad:"5", nombre: "Buzo Oversize Street", descripcion: "Buzo estilo urbano", precio: 88000, talle: ["L","XL"], colores:["black","beige"], stock: true, categoria: "Buzos", marca: "ESSENCIAL", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },

{ id: 16, cantidad:"5", nombre: "Campera Nike Tech", descripcion: "Campera moderna", precio: 160000, talle: ["M","L"], colores:["black","gray"], stock: false, categoria: "Camperas", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 17, cantidad:"5", nombre: "Campera Adidas Puffer", descripcion: "Campera inflable", precio: 170000, talle: ["M","L","XL"], colores:["black","blue"], stock: true, categoria: "Camperas", marca: "ADIDAS", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 18, cantidad:"5", nombre: "Campera Puma Windbreaker", descripcion: "Campera liviana", precio: 110000, talle: ["S","M","XL"], colores:["black","red"], stock: true, categoria: "Camperas", marca: "PUMA", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] },
{ id: 19, cantidad:"5", nombre: "Campera Lacoste Sport", descripcion: "Campera impermeable", precio: 150000, talle: ["M","L"], colores:["green","black"], stock: true, categoria: "Camperas", marca: "LACOSTE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 20, cantidad:"5", nombre: "Campera Columbia Outdoor", descripcion: "Campera outdoor", precio: 155000, talle: ["M","L"], colores:["gray","black"], stock: false, categoria: "Camperas", marca: "ESSENCIAL", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},

{ 
  id: 21,
  cantidad:"5",
  nombre: "Zapatillas Nike Air Max",
  descripcion: "Zapatillas urbanas",
  precio: 120000,
  talle: ["38","39","40","41","42","43"],
  colores:["black","white","blue"],
  stock: true,
  categoria: "zapatillas",
  marca: "NIKE",
  imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"],
  stock_detalle: {
    black: { "38": 2, "39": 1, "40": 3, "41": 0, "42": 2, "43": 1 },
    white: { "38": 1, "39": 2, "40": 0, "41": 3, "42": 1, "43": 0 },
    blue:  { "38": 0, "39": 1, "40": 2, "41": 1, "42": 0, "43": 2 }
  }
},

{ 
  id: 22,
  cantidad:"5",
  nombre: "Zapatillas Adidas Forum",
  descripcion: "Zapatillas clásicas",
  precio: 130000,
  talle: ["38","39","40","41","42"],
  colores:["white","black"],
  stock: true,
  categoria: "zapatillas",
  marca: "ADIDAS",
  imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"],
  stock_detalle: {
    black: { "38": 2, "39": 1, "40": 3, "41": 0, "42": 2 },
    white: { "38": 1, "39": 2, "40": 0, "41": 3, "42": 1 }
  }
},

{ 
  id: 23,
  cantidad:"5",
  nombre: "Zapatillas Puma RS-X",
  descripcion: "Zapatillas modernas",
  precio: 125000,
  talle: ["39","40","41","42"],
  colores:["red","black","yellow"],
  stock: true,
  categoria: "zapatillas",
  marca: "PUMA",
  imagenes: ["/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"],
  stock_detalle: {
    black:  { "39": 2, "40": 1, "41": 3, "42": 0 },
    red:    { "39": 1, "40": 2, "41": 0, "42": 1 },
    yellow: { "39": 0, "40": 1, "41": 2, "42": 1 }
  }
},

{ 
  id: 24,
  cantidad:"5",
  nombre: "Zapatillas Jordan 1",
  descripcion: "Zapatillas icónicas",
  precio: 180000,
  talle: ["40","41","42","43"],
  colores:["black","red","white"],
  stock: true,
  categoria: "zapatillas",
  marca: "JORDAN",
  imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"],
  stock_detalle: {
    black: { "40": 2, "41": 1, "42": 3, "43": 0 },
    red:   { "40": 1, "41": 2, "42": 0, "43": 1 },
    white: { "40": 0, "41": 1, "42": 2, "43": 1 }
  }
},

{ 
  id: 25,
  cantidad:"5",
  nombre: "Zapatillas Vans Old Skool",
  descripcion: "Zapatillas skate",
  precio: 18000,
  talle: ["38","39","40","41","42"],
  colores:["black","white"],
  stock: true,
  categoria: "zapatillas",
  marca: "ESSENCIAL",
  imagenes: ["/fotos de wsp/zapa_3.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"],
  stock_detalle: {
    black: { "38": 2, "39": 1, "40": 3, "41": 0, "42": 2 },
    white: { "38": 1, "39": 2, "40": 0, "41": 3, "42": 1 }
  }
},
{ id: 26, cantidad:"5", nombre: "Gorra Nike", descripcion: "Gorra deportiva", precio: 25000, talle: ["M"], colores:["black","white"], stock: true, categoria: "accesorios", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 27, cantidad:"5", nombre: "Gorra Adidas", descripcion: "Gorra urbana", precio: 23000, talle: ["M"], colores:["black","blue"], stock: true, categoria: "accesorios", marca: "ADIDAS", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  }},
{ id: 28, cantidad:"5", nombre: "Mochila Puma", descripcion: "Mochila deportiva", precio: 50000, talle: ["M"], colores:["black","gray"], stock: true, categoria: "accesorios", marca: "PUMA", imagenes: ["/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 29, cantidad:"5", nombre: "Riñonera Street", descripcion: "Riñonera urbana", precio: 30000, talle: ["M"], colores:["black","brown"], stock: true, categoria: "accesorios", marca: "ESSENCIAL", imagenes: ["/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"]  ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } },
{ id: 30, cantidad:"5", nombre: "Medias Nike Pack", descripcion: "Pack medias deportivas", precio: 20000, talle: ["M"], colores:["white","black"], stock: true, categoria: "accesorios", marca: "NIKE", imagenes: ["/fotos de wsp/zapa_1.jpeg","/fotos de wsp/zapa_2.jpeg","/fotos de wsp/zapa_3.jpeg"] ,stock_detalle: {  black: { S: 2, M: 0, L: 3 }, white: { S: 5, M: 2, L: 1 }, red: { S: 0, M: 1, L: 0 }  } }
];

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

function obtenerStock(producto, color, talle) {
  if (producto.stock_detalle && color && talle) {
    return producto.stock_detalle[color]?.[talle] || 0;
  }

  return producto.stock ? Number(producto.cantidad) || 0 : 0;
}

function resolverRuta(ruta) {
  if (!ruta?.startsWith("/")) return ruta;
  return window.location.pathname.includes("/pages/") ? `..${ruta}` : `.${ruta}`;
}

const bannersCategorias = {
  todos: { etiqueta: "ROSITAAMADA / SHOP", titulo: "La colección que buscabas.", texto: "30 piezas seleccionadas · entrega a todo el país", clase: "banner-todos" },
  remeras: { etiqueta: "CATEGORÍA / REMERAS", titulo: "Básicos que hablan.", texto: "Remeras para todos los días · selección RositaAmada", clase: "banner-remeras" },
  zapatillas: { etiqueta: "CATEGORÍA / ZAPATILLAS", titulo: "Pisá fuerte.", texto: "Modelos urbanos y clásicos para completar tu outfit", clase: "banner-zapatillas" },
  buzos: { etiqueta: "CATEGORÍA / BUZOS", titulo: "Abrigo con actitud.", texto: "Volúmenes cómodos y streetwear premium", clase: "banner-buzos" },
  camperas: { etiqueta: "CATEGORÍA / CAMPERAS", titulo: "La capa final.", texto: "Prendas técnicas y urbanas para esta temporada", clase: "banner-camperas" },
  pantalones: { etiqueta: "CATEGORÍA / PANTALONES", titulo: "Tu base, tu estilo.", texto: "Cortes cómodos para moverte como quieras", clase: "banner-pantalones" },
  accesorios: { etiqueta: "CATEGORÍA / ACCESORIOS", titulo: "Los detalles importan.", texto: "Complementos que terminan de definir tu outfit", clase: "banner-accesorios" }
};

function actualizarBannerCategoria(categoria = "TODOS") {
  const banner = document.querySelector(".banner_prod");
  if (!banner) return;

  const clave = categoria.toLowerCase();
  const contenido = bannersCategorias[clave] || bannersCategorias.todos;
  const titulo = banner.querySelector("h1");
  const etiqueta = banner.querySelector("p");
  const texto = banner.querySelector("span");

  banner.className = `banner_prod ${contenido.clase}`;
  if (etiqueta) etiqueta.textContent = contenido.etiqueta;
  if (titulo) titulo.innerHTML = contenido.titulo.replace(" ", "<br>");
  if (texto) texto.textContent = contenido.texto;
}

function configurarBusqueda() {
  const panel = document.querySelector(".box_input_busqueda");
  const input = panel?.querySelector(".text_input");
  if (!panel || !input) return;

  const botonesBusqueda = document.querySelectorAll(".search .btn_search");
  const sugerencias = document.createElement("div");
  sugerencias.className = "search_suggestions";
  panel.appendChild(sugerencias);

  function actualizarSugerencias(valor = "") {
    const termino = valor.trim().toLowerCase();
    panel.classList.toggle("has-results", Boolean(termino));
    const resultados = productos.filter(producto =>
      [producto.nombre, producto.marca, producto.categoria, producto.descripcion]
        .join(" ").toLowerCase().includes(termino)
    ).slice(0, 6);

    sugerencias.innerHTML = resultados.length
      ? resultados.map(producto => `<button class="search_suggestion" type="button" data-id="${producto.id}"><span><strong>${producto.nombre}</strong><small>${producto.marca} · ${producto.categoria}</small></span><span>${formatoPrecio.format(producto.precio)}</span></button>`).join("")
      : `<p class="search_empty">No encontramos productos con esa búsqueda.</p>`;

    sugerencias.querySelectorAll(".search_suggestion").forEach(boton => {
      boton.addEventListener("click", () => {
        const detalleURL = window.location.pathname.includes("/pages/")
          ? `./detalle_pro.html?id=${boton.dataset.id}`
          : `./pages/detalle_pro.html?id=${boton.dataset.id}`;
        window.location.href = detalleURL;
      });
    });
  }

  botonesBusqueda.forEach(boton => boton.addEventListener("click", evento => {
    evento.preventDefault();
    if (panel.classList.contains("abierto")) {
      panel.classList.remove("abierto");
      return;
    }
    panel.classList.add("abierto");
    input.focus();
    actualizarSugerencias("");
  }));

  input.addEventListener("input", () => actualizarSugerencias(input.value));
  input.addEventListener("keydown", evento => {
    if (evento.key === "Enter" && input.value.trim()) {
      const productosURL = window.location.pathname.includes("/pages/")
        ? `./productos.html?q=${encodeURIComponent(input.value.trim())}`
        : `./pages/productos.html?q=${encodeURIComponent(input.value.trim())}`;
      window.location.href = productosURL;
    }
    if (evento.key === "Escape") panel.classList.remove("abierto");
  });

  document.addEventListener("click", evento => {
    if (!panel.contains(evento.target) && !Array.from(botonesBusqueda).some(boton => boton.contains(evento.target))) {
      panel.classList.remove("abierto");
    }
  });
}




/* =========================
   🧱 RENDER PRODUCTOS
========================= */

function renderProductos(lista) {
  const contenedor = document.querySelector(".prod_cards");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(producto => {

    const card = document.createElement("div");
    card.classList.add("card_prod");

    card.innerHTML = `
      <a class="link_productos" href="${window.location.pathname.includes("/pages/") ? "./detalle_pro.html" : "./pages/detalle_pro.html"}?id=${producto.id}">
        <div class="box_img_prod">
          <img class="img_prod" src="${resolverRuta(producto.imagenes?.[0]) || './img/default.jpg'}" alt="${producto.nombre}">
        </div>
      </a>

      <div class="card_des">
        <p class="nombre_prod">${producto.nombre}</p>
        <p class="des_prod">${producto.descripcion}</p>
        <p class="precio">${formatoPrecio.format(producto.precio)}</p>
        <div class="box_btn_comprar_producto">
          <a class="btn_vertienda" href="${window.location.pathname.includes("/pages/") ? "./detalle_pro.html" : "./pages/detalle_pro.html"}?id=${producto.id}">COMPRAR</a>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });

  const contadorResultados = document.querySelector(".resultados_count");
  if (contadorResultados) {
    contadorResultados.textContent = `${lista.length} ${lista.length === 1 ? "producto" : "productos"}`;
  }
}

function renderProductosSimilares(productoActual) {
  const contenedor = document.querySelector(".box_productos_similares");
  if (!contenedor) return;

  const rutaDetalle = window.location.pathname.includes("/pages/") ? "./detalle_pro.html" : "./pages/detalle_pro.html";
  const similares = productos
    .filter(producto => producto.id !== productoActual.id && producto.categoria === productoActual.categoria)
    .slice(0, 6);

  contenedor.innerHTML = similares.map(producto => `
    <a class="box_Producto_similar" href="${rutaDetalle}?id=${producto.id}">
      <div class="box_img_similar"><img src="${resolverRuta(producto.imagenes?.[0])}" alt="${producto.nombre}"></div>
      <div class="descripcion_similar">
        <p class="ingreso_simil">${producto.marca}</p>
        <p class="nombre_prod">${producto.nombre}</p>
        <p class="des_prod">${producto.descripcion}</p>
        <p class="precio">${formatoPrecio.format(producto.precio)}</p>
        <span class="similar_cta">Ver producto ↗</span>
      </div>
    </a>
  `).join("");
}


/* =========================
   🚀 INIT GENERAL
========================= */

document.addEventListener("DOMContentLoaded", () => {

  configurarBusqueda();

  /* =========================
     📦 LISTADO PRODUCTOS
  ========================= */

  const contenedor = document.querySelector(".prod_cards");

  if (contenedor) {

    const params = new URLSearchParams(window.location.search);
    const marcaURL = params.get("marca");
    const busquedaURL = params.get("q")?.trim().toLowerCase();
    const categoriaURL = params.get("categoria") || "TODOS";

    let lista = productos;

    // 🔥 FILTRO POR URL (sin duplicados ni timeout)
    if (marcaURL) {
      lista = productos.filter(p =>
        p.marca && p.marca.toUpperCase() === marcaURL.toUpperCase()
      );
    }

    if (busquedaURL) {
      lista = lista.filter(producto =>
        [producto.nombre, producto.marca, producto.categoria, producto.descripcion]
          .join(" ").toLowerCase().includes(busquedaURL)
      );
    }

    if (categoriaURL.toUpperCase() !== "TODOS") {
      lista = lista.filter(producto => producto.categoria.toLowerCase() === categoriaURL.toLowerCase());
    }

    const selectorCategoria = document.getElementById("filtro_categoria");
    if (selectorCategoria && [...selectorCategoria.options].some(opcion => opcion.value === categoriaURL || opcion.textContent === categoriaURL)) {
      selectorCategoria.value = categoriaURL;
    }
    actualizarBannerCategoria(categoriaURL);

    renderProductos(lista);

    const btnFiltrar = document.getElementById("btn_filtrar");

    if (btnFiltrar) {
      const aplicarFiltros = () => {

        const categoria = document.getElementById("filtro_categoria").value;
        const talle = document.getElementById("filtro_talle").value;
        const marca = document.getElementById("filtro_marca").value;
        const orden = document.getElementById("filtro_orden").value;

        actualizarBannerCategoria(categoria);

        let filtrados = productos.filter(prod => {
          const okCategoria = categoria === "TODOS" || prod.categoria === categoria;
          const okTalle = talle === "TODOS" || prod.talle.includes(talle);
          const okMarca = marca === "TODAS" || prod.marca === marca;
          return okCategoria && okTalle && okMarca;
        });

        if (orden === "Precio: menor a mayor") {
          filtrados.sort((a, b) => a.precio - b.precio);
        }

        if (orden === "Precio: mayor a menor") {
          filtrados.sort((a, b) => b.precio - a.precio);
        }

        renderProductos(filtrados);
      };

      btnFiltrar.addEventListener("click", aplicarFiltros);
      ["filtro_categoria", "filtro_talle", "filtro_marca", "filtro_orden"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", aplicarFiltros);
      });
    }

    const btnLimpiar = document.getElementById("btn_limpiar_filtros");
    if (btnLimpiar) {
      btnLimpiar.addEventListener("click", () => {
        document.getElementById("filtro_categoria").value = "TODOS";
        document.getElementById("filtro_talle").value = "TODOS";
        document.getElementById("filtro_marca").value = "TODAS";
        document.getElementById("filtro_orden").value = "TODOS";
        actualizarBannerCategoria("TODOS");
        renderProductos(productos);
      });
    }
  }


  /* =========================
     🔍 DETALLE PRODUCTO
  ========================= */

  const imgMain = document.querySelector(".img_detalle_main");
  const contMini = document.querySelector(".img_vista_mini");

  if (imgMain && contMini) {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const producto = productos.find(p => p.id === Number(id));
    if (!producto) return;

    renderProductosSimilares(producto);

    if (producto.stock_detalle) {
      producto.colores = Object.keys(producto.stock_detalle);
    }

    imgMain.src = resolverRuta(producto.imagenes[0]);
    contMini.innerHTML = "";

    producto.imagenes.forEach(img => {
      const div = document.createElement("div");
      div.classList.add("box_img_vistamini");

      div.innerHTML = `<img class="img_detalle" src="${resolverRuta(img)}" alt="${producto.nombre}">`;

      div.addEventListener("click", () => {
        imgMain.src = resolverRuta(img);
      });

      contMini.appendChild(div);
    });

    document.querySelectorAll(".nombre_producto").forEach(el => {
      el.textContent = producto.nombre;
    });

    const marcaDetalle = document.querySelectorAll(".product_marca_detail");
    marcaDetalle.forEach(el => { el.textContent = producto.marca || "ROSITAAMADA SELECT"; });
    const nombreDetalle = document.querySelector(".producto_nombre_detail");
    if (nombreDetalle) nombreDetalle.textContent = producto.nombre;
    const precioDetalle = document.querySelector(".producto_precio");
    if (precioDetalle) precioDetalle.textContent = formatoPrecio.format(producto.precio);

    const desc = document.querySelector(".descripcion_de_producto");
    if (desc) desc.textContent = producto.descripcion;

    let colorSeleccionado = null;
    let talleSeleccionado = null;

    const contTalles = document.querySelector(".talles");
    const contColores = document.querySelector(".colores");
    const stockMsg = document.querySelector(".stock_msg");
    const colorSeleccionadoTexto = document.querySelector(".color_seleccionado");

    function renderTalles() {
      if (!contTalles) return;

      contTalles.innerHTML = "";

      producto.talle.forEach(t => {
        const btn = document.createElement("button");
        btn.textContent = t;
        btn.classList.add("btn_talle");

        if (colorSeleccionado && producto.stock_detalle) {
          const stock = producto.stock_detalle[colorSeleccionado]?.[t];
          if (stock === 0) {
            btn.classList.add("sin_stock");
            btn.disabled = true;
          }
        }

        btn.addEventListener("click", () => {
          if (btn.classList.contains("sin_stock")) return;

          document.querySelectorAll(".btn_talle").forEach(b => b.classList.remove("activo"));
          btn.classList.add("activo");

          talleSeleccionado = t;
          actualizarStockUI();
        });

        contTalles.appendChild(btn);
      });
    }

    function renderColores() {
      if (!contColores) return;

      contColores.innerHTML = "";

      const colores = producto.stock_detalle
        ? Object.keys(producto.stock_detalle)
        : producto.colores || [];

      colores.forEach(color => {
        const div = document.createElement("button");
        div.type = "button";
        div.classList.add("color_item");
        div.style.backgroundColor = color;
        div.dataset.color = color;
        div.setAttribute("aria-label", `Color ${color}`);

        div.addEventListener("click", () => {
          document.querySelectorAll(".color_item").forEach(c => c.classList.remove("activo"));

          div.classList.add("activo");
          colorSeleccionado = color;
          if (colorSeleccionadoTexto) colorSeleccionadoTexto.textContent = color;
          talleSeleccionado = null;

          renderTalles();
          actualizarStockUI();
        });

        contColores.appendChild(div);
      });
    }

    function actualizarStockUI() {
      if (!stockMsg) return;

      if (!colorSeleccionado || !talleSeleccionado) {
        stockMsg.textContent = "En stock";
        return;
      }

      const stock = producto.stock_detalle?.[colorSeleccionado]?.[talleSeleccionado];

      if (stock === 0) {
        stockMsg.textContent = "❌ Sin stock";
        stockMsg.style.color = "red";
      } else if (stock && stock <= 3) {
        stockMsg.textContent = `⚠️ Últimas ${stock} unidades`;
        stockMsg.style.color = "orange";
      } else if (stock) {
        stockMsg.textContent = `✅ En stock (${stock})`;
        stockMsg.style.color = "green";
      }
    }

    renderColores();
    renderTalles();

    const guiaTalles = document.querySelector(".guia_talles");
    const guiaTallesPanel = document.querySelector(".guia_talles_panel");
    guiaTalles?.addEventListener("click", () => {
      if (guiaTallesPanel) guiaTallesPanel.hidden = !guiaTallesPanel.hidden;
    });

    // Auto-seleccionar primer color y talle disponibles
    if (producto.colores && producto.colores.length > 0) {
      const primerColor = producto.colores[0];
      const colorEl = document.querySelector(`.color_item[style*="background: ${primerColor}"]`);
      if (colorEl) {
        colorEl.click();
      }
    }

    /* =========================
       🔢 CANTIDAD CON CONTROL DE STOCK
    ========================= */

    const btnRestar = document.querySelector(".btn-restar");
    const btnSumar = document.querySelector(".btn-sumar");
    const cantidadSpan = document.querySelector(".cantidad");
    const msgStockCantidad = document.createElement("p");
    msgStockCantidad.className = "msg_stock_cantidad";
    msgStockCantidad.style.cssText = "font-size: 12px; margin-top: 8px; color: #e63946; display: none;";
    
    // Insertar mensaje después de cantidad_unidades
    const cantidadUnidades = document.querySelector(".cantidad_unidades");
    if (cantidadUnidades) {
      cantidadUnidades.parentNode.insertBefore(msgStockCantidad, cantidadUnidades.nextSibling);
    }

    let cantidadActual = 1;
    let stockDisponible = 0;

    function obtenerStockDisponible() {
      if (!colorSeleccionado || !talleSeleccionado) {
        return obtenerStock(producto, colorSeleccionado, talleSeleccionado);
      }
      return obtenerStock(producto, colorSeleccionado, talleSeleccionado);
    }

    function actualizarCantidadUI() {
      stockDisponible = obtenerStockDisponible();
      
      if (cantidadSpan) {
        cantidadSpan.textContent = cantidadActual;
      }

      // Deshabilitar botón restar si cantidad es 1
      if (btnRestar) {
        btnRestar.disabled = cantidadActual <= 1;
        btnRestar.style.opacity = cantidadActual <= 1 ? "0.5" : "1";
      }

      // Deshabilitar botón sumar si alcanza el stock
      if (btnSumar) {
        btnSumar.disabled = cantidadActual >= stockDisponible;
        btnSumar.style.opacity = cantidadActual >= stockDisponible ? "0.5" : "1";
      }

      // Mostrar mensaje si alcanza el límite
      if (cantidadActual >= stockDisponible && stockDisponible > 0) {
        msgStockCantidad.textContent = `⚠️ Máximo disponible: ${stockDisponible} unidades`;
        msgStockCantidad.style.display = "block";
      } else if (stockDisponible === 0) {
        msgStockCantidad.textContent = "❌ No hay stock disponible";
        msgStockCantidad.style.display = "block";
      } else {
        msgStockCantidad.style.display = "none";
      }
    }

    if (btnRestar && btnSumar) {
      btnRestar.addEventListener("click", () => {
        if (cantidadActual > 1) {
          cantidadActual--;
          actualizarCantidadUI();
        }
      });

      btnSumar.addEventListener("click", () => {
        stockDisponible = obtenerStockDisponible();
        
        if (cantidadActual < stockDisponible) {
          cantidadActual++;
          actualizarCantidadUI();
        } else {
          // Feedback visual de error
          msgStockCantidad.textContent = `❌ No hay más stock. Máximo: ${stockDisponible}`;
          msgStockCantidad.style.display = "block";
          
          // Animación de shake
          cantidadUnidades?.classList.add("shake");
          setTimeout(() => cantidadUnidades?.classList.remove("shake"), 300);
        }
      });
    }

    // Actualizar cuando cambia color o talle
    const originalActualizarStockUI = actualizarStockUI;
    actualizarStockUI = function() {
      originalActualizarStockUI();
      cantidadActual = 1; // Resetear cantidad al cambiar selección
      actualizarCantidadUI();
    };

    // Inicializar
    actualizarCantidadUI();
  }


  /* =========================
     🏷️ LINKS MARCAS
  ========================= */

  document.querySelectorAll(".lista_marcas a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const marca = link.textContent.trim().toUpperCase();
      window.location.href = `/pages/productos.html?marca=${encodeURIComponent(marca)}`;
    });
  });


  /* =========================
     📢 TEXTOS ROTATIVOS
  ========================= */

  const textoInfo = document.getElementById("textoInfo");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (textoInfo && btnPrev && btnNext) {

    const textos = [
      "Aprovechá el envío gratis exclusivo para miembros!",
      "10% OFF en tu primera compra",
      "Pagá en cuotas sin interés",
      "Ofertas todos los días 🔥"
    ];

    let index = 0;

    function actualizarTexto() {
      textoInfo.textContent = textos[index];
    }

    actualizarTexto();

    btnNext.addEventListener("click", () => {
      index = (index + 1) % textos.length;
      actualizarTexto();
    });

    btnPrev.addEventListener("click", () => {
      index = (index - 1 + textos.length) % textos.length;
      actualizarTexto();
    });

    setInterval(() => {
      index = (index + 1) % textos.length;
      actualizarTexto();
    }, 5000);
  }


  /* =========================
     💬 TOOLTIP WHATSAPP
  ========================= */

  const btnWsp = document.querySelector(".a_circle_wsp");

  if (btnWsp) {

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip_wsp_js");
    tooltip.textContent = "Escribinos a nuestro WhatsApp 📩";

    document.body.appendChild(tooltip);

    btnWsp.addEventListener("mouseenter", () => {
      const rect = btnWsp.getBoundingClientRect();

      tooltip.style.top = rect.top + rect.height / 2 + "px";
      tooltip.style.left = rect.left - 10 + "px";
      tooltip.style.transform = "translate(-100%, -50%)";

      tooltip.style.opacity = "1";
    });

    btnWsp.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  }


  /* =========================
     🛒 CARRITO LATERAL
  ========================= */
// ============================
// 🛒 CARRITO
// ============================

// Carrito en localStorage
function mostrarMensajeStock(mensaje) {
  const msg = document.getElementById("msg_carrito_stock");
  if (!msg) return;

  msg.textContent = mensaje;
  msg.classList.add("activo");

  setTimeout(() => {
    msg.classList.remove("activo");
  }, 2500);
}
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuentoAplicado = 0;
let codigoDescuento = "";

// Elementos del DOM
const btnCerrarCarrito = document.getElementById("btn_cerrar_carrito");
const carritoLateral = document.getElementById("carrito_lateral");
const carritoOverlay = document.getElementById("carrito_overlay");
const btnAgregarCarrito = document.querySelector(".btn_agregar_carrito");
const btnCompraDirecta = document.querySelector(".btn_compra_directa");
const btnCheckout = document.getElementById("btn_checkout");
const btnAplicarDescuento = document.getElementById("btn_aplicar");
const inputCodigo = document.getElementById("input_codigo");

// ============================
// 🟢 ABRIR / CERRAR
// ============================
function abrirCarrito() {
  if (!carritoLateral || !carritoOverlay) return;

  carritoLateral.classList.add("activo");
  carritoOverlay.classList.add("activo");
  document.body.classList.add("no-scroll");
  renderCarrito();
}

function cerrarCarrito() {
  if (!carritoLateral || !carritoOverlay) return;

  carritoLateral.classList.remove("activo");
  carritoOverlay.classList.remove("activo");
  document.body.classList.remove("no-scroll");
}

// Eventos básicos
btnCerrarCarrito?.addEventListener("click", cerrarCarrito);
carritoOverlay?.addEventListener("click", cerrarCarrito);

// Abrir desde navbar
document.querySelectorAll(".box_carrito, .a_op2_Carrito, .box_carrito_sider")
  .forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      abrirCarrito();
    });
  });

// ============================
// 👉 SWIPE PARA CERRAR
// ============================
let startX = 0;

carritoLateral?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carritoLateral?.addEventListener("touchmove", (e) => {
  const diff = e.touches[0].clientX - startX;

  if (diff > 80) {
    cerrarCarrito();
  }
});

// ============================
// ➕ AGREGAR PRODUCTO
// ============================
function agregarAlCarrito(producto, cantidad = 1) {
  const existente = carrito.find(item =>
    item.id === producto.id &&
    item.color === producto.colorSeleccionado &&
    item.talle === producto.talleSeleccionado
  );

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: resolverRuta(producto.imagenes[0]),
      color: producto.colorSeleccionado,
      talle: producto.talleSeleccionado,
      cantidad
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  abrirCarrito();
}

// ============================
// 🛒 BOTONES
// ============================
btnAgregarCarrito?.addEventListener("click", () => {
 

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const color = document.querySelector(".color_item.activo")?.style.background || producto.colores[0];
  const talle = document.querySelector(".btn_talle.activo")?.textContent || producto.talle[0];
  const cantidad = parseInt(document.querySelector(".cantidad")?.textContent) || 1;

  const stock = obtenerStock(producto, color, talle);

  if (stock === 0) return alert("❌ Sin stock");
  if (cantidad > stock) return alert(`⚠️ Solo hay ${stock}`);

  producto.colorSeleccionado = color;
  producto.talleSeleccionado = talle;

  agregarAlCarrito(producto, cantidad);
});

// ============================
// 🎨 RENDER
// ============================
function renderCarrito() {
  const contenedor = document.getElementById("carrito_items");
  const vacio = document.getElementById("carrito_vacio");

  if (!contenedor || !vacio) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = "";
    vacio.style.display = "flex";
    actualizarTotales(0);
    return;
  }

  vacio.style.display = "none";
  contenedor.innerHTML = "";

  let subtotal = 0;

  carrito.forEach((item, index) => {
    const total = item.precio * item.cantidad;
    subtotal += total;

    const div = document.createElement("div");
    div.className = "carrito_producto";

    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <p>${item.nombre}</p>
      <p>${item.color} - ${item.talle}</p>
      <p>${formatoPrecio.format(item.precio)}</p>

      <button data-i="${index}" class="restar">-</button>
      <span>${item.cantidad}</span>
      <button data-i="${index}" class="sumar">+</button>

      <button data-i="${index}" class="eliminar">x</button>
    `;

    contenedor.appendChild(div);
  });

  // Eventos
  document.querySelectorAll(".restar").forEach(btn => {
  btn.onclick = e => {
    const i = e.target.dataset.i;

    if (carrito[i].cantidad > 1) {
      carrito[i].cantidad--;
    } else {
      // opcional: feedback visual en vez de hacer nada
      mostrarMensajeStock(" Mínimo 1 unidad");
      return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    actualizarContador();
  };
});

 document.querySelectorAll(".sumar").forEach(btn => {
  btn.onclick = e => {
    const i = e.target.dataset.i;
    const item = carrito[i];

    // Buscar producto original
    const producto = productos.find(p => p.id === item.id);

    if (!producto) return;

    const stockDisponible = obtenerStock(producto, item.color, item.talle);

    if (item.cantidad < stockDisponible) {
      item.cantidad++;
    } else {
     mostrarMensajeStock(`Solo hay ${stockDisponible} unidades disponibles`);
  return;
    
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    actualizarContador();
  };
});

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.onclick = e => {
      const i = e.target.dataset.i;
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
      actualizarContador();
    };
  });

  actualizarTotales(subtotal);
}

// ============================
// 💰 TOTALES
// ============================
function actualizarTotales(subtotal) {
  document.getElementById("subtotal_carrito").textContent = formatoPrecio.format(subtotal);

  let total = subtotal;

  if (descuentoAplicado > 0) {
    total -= subtotal * (descuentoAplicado / 100);
  }

  document.getElementById("total_carrito").textContent = formatoPrecio.format(total);
}

// ============================
// 🔢 CONTADOR
// ============================
function actualizarContador() {
  const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  document.querySelectorAll(".contador, .contador_Sider")
    .forEach(el => el.textContent = total);
}

// INIT
actualizarContador();
});


