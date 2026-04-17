/* =========================
   🧭 MENU PRINCIPAL
========================= */

let Btn_menu = document.getElementById("btn_Menu");
let menu = document.getElementById("menu");
let btnCerrar = document.getElementById("btn_cerrar");

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
   📂 FOOTER POLITICAS
========================= */

document.querySelectorAll(".politicas_li").forEach(item => {
  const boton = item.querySelector(".btn_mas");

  if (boton) {
    boton.addEventListener("click", () => {
      item.classList.toggle("activo");
    });
  }
});


/* =========================
   🏷️ FOOTER MARCAS
========================= */

document.querySelectorAll(".marcas_li").forEach(item => {
  const boton = item.querySelector(".btn_marcas");

  if (boton) {
    boton.addEventListener("click", () => {
      item.classList.toggle("activo");
    });
  }
});


/* =========================
   📋 LISTA MARCAS EXTRA
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


// 🧠 TODO ARRANCA ACÁ
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     📦 SECCIÓN PRODUCTOS
  ========================= */
  /* =========================
   📦 SECCIÓN PRODUCTOS
========================= */

const contenedor = document.querySelector(".prod_cards");

if (contenedor) {

  function renderProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

      const card = document.createElement("div");
      card.classList.add("card_prod");

      card.innerHTML = `
        <a class="link_productos" href="/pages/detalle_pro.html?id=${producto.id}">
          <div class="box_img_prod">
            <img class="img_prod" src="${producto.imagenes?.[0] || '/img/default.jpg'}">
          </div>
        </a>

        <div class="card_des">
          <p class="nombre_prod">${producto.nombre}</p>
          <p class="des_prod">${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <div class="box_btn_comprar_producto">
            <a class="btn_vertienda" href="/pages/detalle_pro.html?id=${producto.id}">COMPRAR</a>
          </div>
        </div>
      `;

      contenedor.appendChild(card);

    });
  }

  renderProductos(productos);

  const btnFiltrar = document.getElementById("btn_filtrar");

  if (btnFiltrar) {
    btnFiltrar.addEventListener("click", () => {

      const categoria = document.getElementById("filtro_categoria").value;
      const talle = document.getElementById("filtro_talle").value;
      const marca = document.getElementById("filtro_marca").value;
      const orden = document.getElementById("filtro_orden").value;

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

    });
  }
}

/* =========================
   🔍 SECCIÓN DETALLE
========================= */

const imgMain = document.querySelector(".img_detalle_main");
const contMini = document.querySelector(".img_vista_mini");

if (!imgMain || !contMini) return;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const producto = productos.find(p => p.id === Number(id));

if (!producto || !producto.imagenes) {
  console.error("Producto inválido", producto);
  return;
}

// 🔥 AUTO-CORRECCIÓN DE COLORES DESDE STOCK
if (producto.stock_detalle) {
  producto.colores = Object.keys(producto.stock_detalle);
}

// 🖼️ imágenes
imgMain.src = producto.imagenes[0];

contMini.innerHTML = "";

producto.imagenes.forEach(img => {

  const div = document.createElement("div");
  div.classList.add("box_img_vistamini");

  div.innerHTML = `<img class="img_detalle" src="${img}">`;

  div.addEventListener("click", () => {
    imgMain.src = img;
  });

  contMini.appendChild(div);

});

// 📝 textos
document.querySelectorAll(".nombre_producto").forEach(el => {
  el.textContent = producto.nombre;
});

const desc = document.querySelector(".descripcion_de_producto");
if (desc) desc.textContent = producto.descripcion;


// =========================
// 🧠 VARIABLES
// =========================

let colorSeleccionado = null;
let talleSeleccionado = null;


// =========================
// 👕 TALLE
// =========================

const contTalles = document.querySelector(".talles");

function renderTalles() {

  if (!contTalles) return;

  contTalles.innerHTML = "";

  let talles = producto.talle;

  talles.forEach(t => {

    const btn = document.createElement("button");
    btn.textContent = t;
    btn.classList.add("btn_talle");

    if (colorSeleccionado && producto.stock_detalle) {

      const stock = producto.stock_detalle[colorSeleccionado]?.[t];

      // 🔥 SOLO deshabilitar si EXISTE y es 0
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


// =========================
// 🎨 COLORES (CORREGIDO)
// =========================

const contColores = document.querySelector(".colores");

function renderColores() {

  if (!contColores) return;

  contColores.innerHTML = "";

  let colores = [];

  // 🔥 usar stock como fuente real
  if (producto.stock_detalle) {
    colores = Object.keys(producto.stock_detalle);
  } else {
    colores = producto.colores || [];
  }

  colores.forEach(color => {

    const div = document.createElement("div");
    div.classList.add("color_item");

    div.style.background = color;

    div.addEventListener("click", () => {

      document.querySelectorAll(".color_item").forEach(c => c.classList.remove("activo"));

      div.classList.add("activo");

      colorSeleccionado = color;
      talleSeleccionado = null;

      renderTalles();
      actualizarStockUI();

    });

    contColores.appendChild(div);

  });

}


// =========================
// 📦 STOCK
// =========================

const stockMsg = document.querySelector(".stock_msg");

function actualizarStockUI() {

  if (!stockMsg) return;

  if (!colorSeleccionado || !talleSeleccionado) {
    stockMsg.textContent = "Disponibilidad";
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
    stockMsg.textContent = `✅ Stock disponible (${stock})`;
    stockMsg.style.color = "green";
  } else {
    stockMsg.textContent = "Disponibilidad";
  }

}


// =========================
// 🚀 INIT
// =========================

renderColores();
renderTalles();

});



/*textos de card info*/

const textos = [
  "Aprovechá el envío gratis exclusivo para miembros!",
  "10% OFF en tu primera compra",
  "Pagá en cuotas sin interés",
  "Ofertas todos los días 🔥"
];

let index = 0;

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

  textoInfo.textContent = textos[index];

  function actualizarTexto() {
    textoInfo.textContent = textos[index];
  }

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





document.addEventListener("DOMContentLoaded", () => {

  const linksMarcas = document.querySelectorAll(".lista_marcas a");

  linksMarcas.forEach(link => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      const marca = link.textContent.trim().toUpperCase();

      // redirigir con parámetro
      window.location.href = `/pages/productos.html?marca=${encodeURIComponent(marca)}`;

    });

  });

});




const params = new URLSearchParams(window.location.search);
const marcaURL = params.get("marca");

if (marcaURL && typeof productos !== "undefined") {

  const filtrados = productos.filter(p => p.marca === marcaURL);

  if (typeof renderProductos === "function") {
    renderProductos(filtrados);
  }

}

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const marcaURL = params.get("marca");

  if (!marcaURL) return;

  // esperar a que tu código renderice primero
  setTimeout(() => {

    if (typeof productos === "undefined") return;

    const filtrados = productos.filter(p => 
      p.marca && p.marca.toUpperCase() === marcaURL.toUpperCase()
    );

    const contenedor = document.querySelector(".prod_cards");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    filtrados.forEach(producto => {

      const card = document.createElement("div");
      card.classList.add("card_prod");

      card.innerHTML = `
        <a class="link_productos" href="/pages/detalle_pro.html?id=${producto.id}">
          <div class="box_img_prod">
            <img class="img_prod" src="${producto.imagenes?.[0] || '/img/default.jpg'}">
          </div>
        </a>

        <div class="card_des">
          <p class="nombre_prod">${producto.nombre}</p>
          <p class="des_prod">${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <div class="box_btn_comprar_producto">
            <a class="btn_vertienda" href="/pages/detalle_pro.html?id=${producto.id}">COMPRAR</a>
          </div>
        </div>
      `;

      contenedor.appendChild(card);

    });

  }, 50)

});

