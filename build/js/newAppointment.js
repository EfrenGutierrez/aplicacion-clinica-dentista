/*
    ***************
        variables
    ***************
*/

const btn_volver = document.querySelector("#btn_go_back");
const btn_enviar = document.querySelector("#btn__enviar");

let numCita=0;

//se obtienen los elementos <input>
let iNombre = document.querySelector("#iNombre");
let iApellidos = document.querySelector("#iApellidos");
let iDni = document.querySelector("#iDni");
let iNacimiento = document.querySelector("#iFechaNacimiento");
let iCita = document.querySelector("#iFechaCita");
let iHora = document.querySelector("#iHora");
let iMin = document.querySelector("#iMin");
let iTel = document.querySelector("#iTel");
let iCom = document.querySelector("#iComentarios");




//Evento de escucha para los botones.
btn_volver.addEventListener('click', goBack);
btn_enviar.addEventListener('click', enviar);

/*
    ***********************
        --Funciones--
    ***********************
*/

//funcion para el boton de volver.
function goBack(){
    window.open("index.html","_self");
}



//funcion del boton enviar.
function enviar(){

   //se obtienen lso valores de los inputs
    let nom = iNombre.value;
    let ape = iApellidos.value;
    let dni = iDni.value;
    let nac = iNacimiento.value;
    let cit = iCita.value;
    let hor = iHora.value;
    let min = iMin.value;
    let com = iCom.value;
    let tel = iTel.value;
    
    // comprueba que los campos no esten vacios.
    if((nom != "") && (ape != "") && (dni != "") && (nac != "") && (cit != "") && (hor != "") && (min !="") && (tel !="") && (com !="") ){
        
        //se comprueba que los datos de nombre y apellidos no sean numeros.
        if(isNaN(nom) == false){

            alert("El campo nombre no es un tipo de dato correcto");
        }
        
        else if(isNaN(ape) == false) {
            alert("El campo apellido no es un tipo de dato correcto");    
        }
        else if(dni.length!=9){
            alert("El dni es erroneo.");
        }
        else if(isNaN(tel)== true){
            alert("El campo telefono no es un dato valido");
        }
        else if(isNaN(hor) == true){
            alert("la hora no es un dato valido");
        }
        else if(isNaN(min) == true){
            alert("los minutos no son un dato valido");
        }

        //si todo esta correcto se llama a esta funcion con parametros.
        else{
            
            //se crea una id con la fecha actual.
            const date = new Date();
            const ye = date.getFullYear();
            const me = date.getMonth();
            const da = date.getDate();
            const ho = date.getHours();
            const mi = date.getMinutes();
            const se = date.getSeconds();

            //se crea un id con el nombre y el apellido de la persona para identificar la cookie.
            //y otro id con el DNI de la persona
            const id = ye + "" + (me+1) + "" + da + "" + ho + "" + mi + "" +  se;
            
            
            
            //Se crea el objeto cita.
            const cita = new NuevaCita(id,nom,ape,dni,nac,cit,hor,min,tel,com);
            //se convierte el objeto en JSON.
            const citaJSON = JSON.stringify(cita)
            //se crea la cookie
            document.cookie = cita.dni + "=" + citaJSON + ";expires=Fri, 6 Dec 2025 12:00:00 UTC; path=/";
         
            
            //funcion que elimina el texto de los <inputs> y del <textarea> tras crear almacenar los datos en la cookie.
            borrarInputs(); 
            
            
            //document.cookie =`${id}, id = ${id}, nombre = ${nom}, apellido = ${ape}, dni = ${dni}, nacimiento = ${nac}, cita = ${cit}, hora = ${hor}, telefono = ${tel}, comentarios = ${com}`;
            
            //** cita con objeto json funciona pero solo me crea una cookie.
            // const citaJSON = JSON.stringify(cita);
            // document.cookie = citaJSON;
            
        }


    //si hay algun campo vacio salta esta alerta.
    }else{
       
        alert("debe rellenar todos los campos");
    }
}//fin de la funcion enviar.


//funcion nuevaCita. crea un objeto
class NuevaCita {
    constructor(id ,nom, ape, dni, nac, cit, hor, min, tel, com) {
        this.id = id;
        this.nombre = nom;
        this.apellido = ape;
        this.dni = dni;
        this.nacimiento = nac;
        this.cita = cit;
        this.hora = hor;
        this.minutos = min;
        this.telefono = tel;
        this.comentario = com;
    }
    
}


//funcion para borrar los inputs del html.
function borrarInputs(){
    let inputs = document.querySelectorAll("input");
    let textArea = document.querySelector("textarea");
    inputs.forEach(input =>{
        input.value = "";
    })
    textArea.value = "";
}


