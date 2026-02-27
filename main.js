


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

