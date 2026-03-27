


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
  { id: 1, nombre: "Remera Adidas Originals", descripcion: "Remera de algodón estampada", precio: 45000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 2, nombre: "Remera Nike Club", descripcion: "Remera básica deportiva", precio: 42000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "NIKE", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 3, nombre: "Remera Puma Essential", descripcion: "Remera urbana lisa", precio: 40000, talle: ["M","L"], stock: true, categoria: "Remeras", marca: "PUMA", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 4, nombre: "Remera Calvin Klein", descripcion: "Remera premium minimalista", precio: 60000, talle: ["S","M","L"], stock: true, categoria: "Remeras", marca: "CALVIN KLEIN", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 5, nombre: "Remera Tommy Hilfiger", descripcion: "Remera clásica logo", precio: 65000, talle: ["M","L"], stock: true, categoria: "Remeras", marca: "TOMY HILFIGER", imagen: "/fotos de wsp/zapa_1.jpeg" },

  { id: 6, nombre: "Pantalón Adidas Tiro", descripcion: "Pantalón deportivo training", precio: 75000, talle: ["M","L"], stock: true, categoria: "Pantalones", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_2.jpeg" },
  { id: 7, nombre: "Pantalón Nike Jogger", descripcion: "Jogger urbano cómodo", precio: 72000, talle: ["S","M","L"], stock: true, categoria: "Pantalones", marca: "NIKE", imagen: "/fotos de wsp/zapa_2.jpeg" },
  { id: 8, nombre: "Pantalón Puma Fit", descripcion: "Pantalón deportivo liviano", precio: 68000, talle: ["S","M","L"], stock: true, categoria: "Pantalones", marca: "PUMA", imagen: "/fotos de wsp/zapa_2.jpeg" },
  { id: 9, nombre: "Pantalón Cargo Urban", descripcion: "Cargo streetwear", precio: 78000, talle: ["M","L","XL"], stock: true, categoria: "Pantalones", marca: "ESSENCIAL", imagen: "/fotos de wsp/zapa_2.jpeg" },
  { id: 10, nombre: "Pantalón Jordan Training", descripcion: "Pantalón deportivo ajustado", precio: 70000, talle: ["M","L"], stock: false, categoria: "Pantalones", marca: "JORDAN", imagen: "/fotos de wsp/zapa_2.jpeg" },

  { id: 11, nombre: "Buzo Nike Club", descripcion: "Buzo sin capucha", precio: 85000, talle: ["M","L","XL"], stock: true, categoria: "Buzos", marca: "NIKE", imagen: "/fotos de wsp/zapa_3.jpeg" },
  { id: 12, nombre: "Buzo Puma Essentials", descripcion: "Buzo con capucha", precio: 80000, talle: ["M","L"], stock: false, categoria: "Buzos", marca: "PUMA", imagen: "/fotos de wsp/zapa_3.jpeg" },
  { id: 13, nombre: "Buzo Adidas Hoodie", descripcion: "Buzo frizado", precio: 90000, talle: ["S","M","L"], stock: true, categoria: "Buzos", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_3.jpeg" },
  { id: 14, nombre: "Buzo Lacoste Classic", descripcion: "Buzo elegante deportivo", precio: 95000, talle: ["M","L"], stock: true, categoria: "Buzos", marca: "LACOSTE", imagen: "/fotos de wsp/zapa_3.jpeg" },
  { id: 15, nombre: "Buzo Oversize Street", descripcion: "Buzo estilo urbano", precio: 88000, talle: ["L","XL"], stock: true, categoria: "Buzos", marca: "ESSENCIAL", imagen: "/fotos de wsp/zapa_3.jpeg" },

  { id: 16, nombre: "Campera Nike Tech", descripcion: "Campera moderna", precio: 160000, talle: ["M","L"], stock: false, categoria: "Camperas", marca: "NIKE", imagen: "/fotos de wsp/zapa_4.jpeg" },
  { id: 17, nombre: "Campera Adidas Puffer", descripcion: "Campera inflable", precio: 170000, talle: ["M","L","XL"], stock: true, categoria: "Camperas", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_4.jpeg" },
  { id: 18, nombre: "Campera Puma Windbreaker", descripcion: "Campera liviana", precio: 110000, talle: ["S","M"], stock: true, categoria: "Camperas", marca: "PUMA", imagen: "/fotos de wsp/zapa_4.jpeg" },
  { id: 19, nombre: "Campera Lacoste Sport", descripcion: "Campera impermeable", precio: 150000, talle: ["M","L"], stock: true, categoria: "Camperas", marca: "LACOSTE", imagen: "/fotos de wsp/zapa_4.jpeg" },
  { id: 20, nombre: "Campera Columbia Outdoor", descripcion: "Campera outdoor", precio: 155000, talle: ["M","L"], stock: false, categoria: "Camperas", marca: "ESSENCIAL", imagen: "/fotos de wsp/zapa_4.jpeg" },

  { id: 21, nombre: "Zapatillas Nike Air Max", descripcion: "Zapatillas urbanas", precio: 120000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "NIKE", imagen: "/fotos de wsp/zapa_5.jpeg" },
  { id: 22, nombre: "Zapatillas Adidas Forum", descripcion: "Zapatillas clásicas", precio: 130000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_5.jpeg" },
  { id: 23, nombre: "Zapatillas Puma RS-X", descripcion: "Zapatillas modernas", precio: 125000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "PUMA", imagen: "/fotos de wsp/zapa_5.jpeg" },
  { id: 24, nombre: "Zapatillas Jordan 1", descripcion: "Zapatillas icónicas", precio: 180000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "JORDAN", imagen: "/fotos de wsp/zapa_5.jpeg" },
  { id: 25, nombre: "Zapatillas Vans Old Skool", descripcion: "Zapatillas skate", precio: 95000, talle: ["M"], stock: true, categoria: "zapatillas", marca: "ESSENCIAL", imagen: "/fotos de wsp/zapa_5.jpeg" },

  { id: 26, nombre: "Gorra Nike", descripcion: "Gorra deportiva", precio: 25000, talle: ["M"], stock: true, categoria: "accesorios", marca: "NIKE", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 27, nombre: "Gorra Adidas", descripcion: "Gorra urbana", precio: 23000, talle: ["M"], stock: true, categoria: "accesorios", marca: "ADIDAS", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 28, nombre: "Mochila Puma", descripcion: "Mochila deportiva", precio: 50000, talle: ["M"], stock: true, categoria: "accesorios", marca: "PUMA", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 29, nombre: "Riñonera Street", descripcion: "Riñonera urbana", precio: 30000, talle: ["M"], stock: true, categoria: "accesorios", marca: "ESSENCIAL", imagen: "/fotos de wsp/zapa_1.jpeg" },
  { id: 30, nombre: "Medias Nike Pack", descripcion: "Pack medias deportivas", precio: 20000, talle: ["M"], stock: true, categoria: "accesorios", marca: "NIKE", imagen: "/fotos de wsp/zapa_1.jpeg" }
];


// 🧠 TODO ARRANCA ACÁ
document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.querySelector(".prod_cards");

  function renderProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

      const card = document.createElement("div");
      card.classList.add("card_prod");

      card.innerHTML = `
        <a class="link_productos" href="/pages/detalle_pro.html?id=${producto.id}">
          <div class="box_img_prod">
            <img class="img_prod" src="${producto.imagen}">
          </div>
        </a>

        <div class="card_des">
          <p class="nombre_prod">${producto.nombre}</p>
          <p class="des_prod">${producto.descripcion}</p>
          <p class="precio">$${producto.precio}</p>
          <div class="box_btn_comprar_producto"> <a class="btn_vertienda" id="btn_comprar_producto" href="/pages/detalle_pro.html">COMPRAR</a> </div>
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

      const okCategoria = categoria === "Todos" || prod.categoria === categoria;
      const okTalle = prod.talle.includes(talle);
      const okMarca = marca === "TODAS" || prod.marca === marca;

      return okCategoria && okTalle && okMarca;

    });

    // ordenar
    if (orden === "Precio: menor a mayor") {
      filtrados.sort((a, b) => a.precio - b.precio);
    }

    if (orden === "Precio: mayor a menor") {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    renderProductos(filtrados);

  });

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

// Mostrar texto inicial
textoInfo.textContent = textos[index];

// Función actualizar
function actualizarTexto() {
  textoInfo.textContent = textos[index];
}

// Botón siguiente
btnNext.addEventListener("click", () => {
  index = (index + 1) % textos.length;
  actualizarTexto();
});

// Botón anterior
btnPrev.addEventListener("click", () => {
  index = (index - 1 + textos.length) % textos.length;
  actualizarTexto();
});

// Cambio automático cada 5 segundos
setInterval(() => {
  index = (index + 1) % textos.length;
  actualizarTexto();
}, 5000);