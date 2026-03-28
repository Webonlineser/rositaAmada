


let Btn_menu = document.getElementById("btn_Menu");
let menu = document.getElementById("menu");

Btn_menu.addEventListener("click",()=>{

 controlar ()
    



} )

function controlar() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}


console.log(Btn_menu + " este es el elemento capturado del dom" )





let btnCerrar = document.getElementById("btn_cerrar");

btnCerrar.addEventListener("click", () => {
  menu.classList.remove("active");
});


Btn_menu.addEventListener("click", ()=>{

    menu.classList.toggle("activo");

    document.body.classList.toggle("no-scroll"); // ← agregás esta línea

});


/*Animaciones*/




/*botonos desplegue */ 

/*politicas footer*/ 

const politicas = document.querySelectorAll(".politicas_li");

politicas.forEach(item => {

  const boton = item.querySelector(".btn_mas");

  boton.addEventListener("click", () => {

    item.classList.toggle("activo");

  });

});




document.querySelectorAll(".marcas_li").forEach(item => {

  const boton = item.querySelector(".btn_marcas");

  boton.addEventListener("click", () => {

    item.classList.toggle("activo");

  });

});


const btnMarcas = document.querySelector(".btn_mas_lista");
const listaMarcas = document.querySelector(".box_list_marcas");
const icono = document.querySelector(".img_btn_mas");

btnMarcas.addEventListener("click", function(){

    if(listaMarcas.style.display === "block"){
        listaMarcas.style.display = "none";
        icono.style.transform = "rotate(0deg)";
    } else {
        listaMarcas.style.display = "block";
        icono.style.transform = "rotate(45deg)";
    }

});












/*productos*/


const productos = [
  { id: 1, cantidad:"5" , nombre: "Remera Adidas Originals", descripcion: "Remera de algodón estampada", precio: 45000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ]},
  { id: 2, cantidad:"5" , nombre: "Remera Nike Club", descripcion: "Remera básica deportiva", precio: 42000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 3, cantidad:"5" , nombre: "Remera Puma Essential", descripcion: "Remera urbana lisa", precio: 40000, talle: ["M","L"], stock: true, categoria: "Remeras", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 4, cantidad:"5" ,  nombre: "Remera Calvin Klein", descripcion: "Remera premium minimalista", precio: 60000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "CALVIN KLEIN",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 5, cantidad:"5" , nombre: "Remera Tommy Hilfiger", descripcion: "Remera clásica logo", precio: 65000, talle: ["M","L"], stock: true, categoria: "Remeras", marca: "TOMY HILFIGER",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },

  { id: 6, cantidad:"5" , nombre: "Pantalón Adidas Tiro", descripcion: "Pantalón deportivo training", precio: 75000, talle: ["M","L"], stock: true, categoria: "Pantalones", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 7, cantidad:"5" , nombre: "Pantalón Nike Jogger", descripcion: "Jogger urbano cómodo", precio: 72000, talle: ["S","M","L"], stock: true, categoria: "Pantalones", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 8, cantidad:"5" , nombre: "Pantalón Puma Fit", descripcion: "Pantalón deportivo liviano", precio: 68000, talle: ["S","M","L"], stock: true, categoria: "Pantalones", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 9, cantidad:"5" , nombre: "Pantalón Cargo Urban", descripcion: "Cargo streetwear", precio: 78000, talle: ["M","L","XL"], stock: true, categoria: "Pantalones", marca: "ESSENCIAL",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 10,cantidad:"5" ,  nombre: "Pantalón Jordan Training", descripcion: "Pantalón deportivo ajustado", precio: 70000, talle: ["M","L"], stock: false, categoria: "Pantalones", marca: "JORDAN",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },

  { id: 11, cantidad:"5",  nombre: "Buzo Nike Club", descripcion: "Buzo sin capucha", precio: 85000, talle: ["M","L","XL"], stock: true, categoria: "Buzos", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 12, cantidad:"5",  nombre: "Buzo Puma Essentials", descripcion: "Buzo con capucha", precio: 80000, talle: ["M","L"], stock: false, categoria: "Buzos", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 13, cantidad:"5" , nombre: "Buzo Adidas Hoodie", descripcion: "Buzo frizado", precio: 90000, talle: ["S","M","L"], stock: true, categoria: "Buzos", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 14, cantidad:"5" , nombre: "Buzo Lacoste Classic", descripcion: "Buzo elegante deportivo", precio: 95000, talle: ["M","L"], stock: true, categoria: "Buzos", marca: "LACOSTE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 15, cantidad:"5" , nombre: "Buzo Oversize Street", descripcion: "Buzo estilo urbano", precio: 88000, talle: ["L","XL"], stock: true, categoria: "Buzos", marca: "ESSENCIAL",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },

  { id: 16, cantidad:"5" , nombre: "Campera Nike Tech", descripcion: "Campera moderna", precio: 160000, talle: ["M","L"], stock: false, categoria: "Camperas", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 17, cantidad:"5" , nombre: "Campera Adidas Puffer", descripcion: "Campera inflable", precio: 170000, talle: ["M","L","XL"], stock: true, categoria: "Camperas", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 18, cantidad:"5" , nombre: "Campera Puma Windbreaker", descripcion: "Campera liviana", precio: 110000, talle: ["S","M"], stock: true, categoria: "Camperas", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 19, cantidad:"5" , nombre: "Campera Lacoste Sport", descripcion: "Campera impermeable", precio: 150000, talle: ["M","L"], stock: true, categoria: "Camperas", marca: "LACOSTE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 20, cantidad:"5" , nombre: "Campera Columbia Outdoor", descripcion: "Campera outdoor", precio: 155000, talle: ["M","L"], stock: false, categoria: "Camperas", marca: "ESSENCIAL",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },

  { id: 21, cantidad:"5" , nombre: "Zapatillas Nike Air Max", descripcion: "Zapatillas urbanas", precio: 120000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 22, cantidad:"5" , nombre: "Zapatillas Adidas Forum", descripcion: "Zapatillas clásicas", precio: 130000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 23, cantidad:"5" , nombre: "Zapatillas Puma RS-X", descripcion: "Zapatillas modernas", precio: 125000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 24, cantidad:"5" , nombre: "Zapatillas Jordan 1", descripcion: "Zapatillas icónicas", precio: 180000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "JORDAN",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 25, cantidad:"5" , nombre: "Zapatillas Vans Old Skool", descripcion: "Zapatillas skate", precio: 18000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "ESSENCIAL",imagenes: [
    "/fotos de wsp/zapa_3.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },

  { id: 26, cantidad:"5" , nombre: "Gorra Nike", descripcion: "Gorra deportiva", precio: 25000, talle: ["M"], stock: true, categoria: "accesorios", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 27, cantidad:"5" , nombre: "Gorra Adidas", descripcion: "Gorra urbana", precio: 23000, talle: ["M"], stock: true, categoria: "accesorios", marca: "ADIDAS",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 28, cantidad:"5" , nombre: "Mochila Puma", descripcion: "Mochila deportiva", precio: 50000, talle: ["M"], stock: true, categoria: "accesorios", marca: "PUMA",imagenes: [
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 29, cantidad:"5" , nombre: "Riñonera Street", descripcion: "Riñonera urbana", precio: 30000, talle: ["M"], stock: true, categoria: "accesorios", marca: "ESSENCIAL",imagenes: [
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] },
  { id: 30, cantidad:"5" , nombre: "Medias Nike Pack", descripcion: "Pack medias deportivas", precio: 20000, talle: ["M"], stock: true, categoria: "accesorios", marca: "NIKE",imagenes: [
    "/fotos de wsp/zapa_1.jpeg",
    "/fotos de wsp/zapa_2.jpeg",
    "/fotos de wsp/zapa_3.jpeg"
  ] }
];


// 🧠 TODO ARRANCA ACÁ
document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.querySelector(".prod_cards");
if(!contenedor) return; // 
  function renderProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

      const card = document.createElement("div");
      card.classList.add("card_prod");
      
      card.innerHTML = `
        <a class="link_productos" href="/pages/detalle_pro.html?id=${producto.id}">
          <div class="box_img_prod">
            <img class="img_prod" src="${producto.imagenes[0]}">
          </div>
        </a>

        <div class="card_des">
          <p class="nombre_prod">${producto.nombre}</p>
          <p class="des_prod">${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <div class="box_btn_comprar_producto"> <a class="btn_vertienda" id="btn_comprar_producto" href="/pages/detalle_pro.html?id=${producto.id}">COMPRAR</a> </div>
        </div>
      `;

      contenedor.appendChild(card);

    });
  }

  // 🔥 mostrar todos al inicio
  renderProductos(productos);

  // 🔥 filtro
 document.getElementById("btn_filtrar").addEventListener("click", () => {

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

  // 🧠 ORDENAR
  if (orden === "Precio: menor a mayor") {
    filtrados.sort((a, b) => a.precio - b.precio);
  }

  if (orden === "Precio: mayor a menor") {
    filtrados.sort((a, b) => b.precio - a.precio);
  }

  // 🔥 si elige TODOS en ordenar → no hace nada (queda como viene)
  if (orden === "TODOS") {
    filtrados = [...filtrados];
  }

  renderProductos(filtrados);

});

});

/* carga de datos a detalle*/ 

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const producto = productos.find(p => p.id == id);

const imgMain = document.querySelector(".img_detalle_main");
const contMini = document.querySelector(".img_vista_mini");

// imagen principal
imgMain.src = producto.imagenes[0];

// miniaturas
contMini.innerHTML = "";

producto.imagenes.forEach(img => {
  const div = document.createElement("div");
  div.classList.add("box_img_vistamini");

  div.innerHTML = `<img class="img_detalle" src="${img}">`;

  // cambiar imagen principal al hacer click
  div.addEventListener("click", () => {
    imgMain.src = img;
  });

  contMini.appendChild(div);
});

document.querySelectorAll(".nombre_producto").forEach(el => {
  el.textContent = producto.nombre;
});

document.querySelector(".descripcion_de_producto").textContent = producto.descripcion;







const contTalles = document.querySelector(".talles");

producto.talle.forEach(t => {
  const btn = document.createElement("button");
  btn.textContent = t;
  btn.classList.add("btn_talle");

  btn.addEventListener("click", () => {
    document.querySelectorAll(".btn_talle").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
  });

  contTalles.appendChild(btn);
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




/*tOOLSTIP DE BTN WSP*/ 

const btnWsp = document.querySelector(".a_circle_wsp");

// crear tooltip
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip_wsp_js");
tooltip.textContent = "Escribinos a nuestro WhatsApp 📩";

document.body.appendChild(tooltip);

// mostrar
btnWsp.addEventListener("mouseenter", () => {
  const rect = btnWsp.getBoundingClientRect();

  tooltip.style.top = rect.top + rect.height / 2 + "px";
  tooltip.style.left = rect.left - 10 + "px";
  tooltip.style.transform = "translate(-100%, -50%)";

  tooltip.style.opacity = "1";
});

// ocultar
btnWsp.addEventListener("mouseleave", () => {
  tooltip.style.opacity = "0";
});