


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

