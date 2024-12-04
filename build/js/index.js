// obtenemos los elementos
const btn_add = document.querySelector('#btn_add_appoint');
const btn_view = document.querySelector('#btn_view_appoint');

//se ponen a la escucha de ser clicados
btn_add.addEventListener("click",newForm);
btn_view.addEventListener("click",appointments);


//se crean las funciones que seran activadas al hacer click sobre ellos.

//newForm nos enviara la pagina de nuevas citas.
function newForm(){
    window.open("newAppointment.html","_self");
}
//appointments nos enviara a la pagina que muestra las citas.
function appointments(){
    window.open("Apointments.html","_self");
}