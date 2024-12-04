
/*
*****************
    variables
*****************
*/
const btn_volver = document.querySelector("#btn_go_back"); 
const arrSinDni= [];
const arrObj=[];
const ArrIds =[];
const ArrNom =[];
const ArrApe =[];
const ArrDni =[];
const ArrNac =[];
const ArrCit =[];
const ArrHor =[];
const ArrMin =[];
const ArrTel =[];
const ArrCom =[];

let id;
let nombre;
let apellido;
let dni;
let nacimiento;
let cita;
let hora;
let minutos;
let telefono;
let comentario;

/*********************************************** Fin Variables ************************************************** */


/*
*******************
    --Eventos--
*******************
*/
//Evento principal al cargar la pagina.
window.addEventListener("load",function(){
    deCookieaObjeto();
});
//Evento de escucha para los botones.
btn_volver.addEventListener('click', goBack);


/***********************************************  Fin Eventos  ************************************************** */


/*
***********************
    --Funciones--
***********************
*/

function goBack(){
    window.open("index.html","_self");
}



function deCookieaObjeto(){
    //se extrae la cookie a JSON,
    let cookies = document.cookie;
    //si el JSON esta vacio mostrara un mensaje de que no hay datos
    if(cookies.length == 0){
        
        let newP = document.createElement("p");
        newP.classList.add("aviso");
        let texto = document.createTextNode("No hay datos almacenados.");
        
        newP.appendChild(texto);

        let tabla = document.querySelector(".tabla");

        tabla.appendChild(newP);
    }
    else{
        //si hay datos se llama a la siguiente funcion y se pasa por parametro el JSON cookies.
        obtenerDatosCookies(cookies);
        
    }
}


function obtenerDatosCookies(cookies){
    
    //se separa el JSON en los diferentes objetos pero en este pundo aun no se han convertido en objeto.
    const arrJson = cookies.split("; ");
        
    /*En este momento es cuando se recorre el aray arrJson y se se almacena en arrSinDni suprimiendo 
        los 10 primeros caracteres de cada elemento que corresponden con el dni que es corresponde 
        con la clave de la cookie y se almacena en un array llamado ArrSinDni.
    */
    arrJson.forEach(elemento =>{
        let x = elemento.substring(10);
        arrSinDni.push(x);
        
    })

    //se llama a la funcion crearTabla para obtener una tabla con los elementos del array
    crearTabla();
}   


function crearTabla(){
   //para crear la tabla lo pirmero se llama a la funcion separarDatos().
    separarDatos();  

    //posteriormente se empieza a crear la tabla que contendra las filas donde se mostrara cada cita y las columnas con su respectivos datos.
    /*La tabla inicalmente se ha creado en el documento HTML con solamente las cabeceras de los campos,
        y ahora se van a crear las filas y columnas de los datos alojados en las cookies. */
        
    for(let i=0; i < arrSinDni.length;i++){
        //se selecciona el la tabla creada en el html para ir agnadiendo elementos a posteriori.
        const tabla = document.querySelector("#table");

        // creamos una fila.
        const fila = document.createElement("tr");
        fila.setAttribute("id","fila" + i);

        //agnadir la fila dentro de la tabla.
        tabla.appendChild(fila);

        //bucle par agnadir columnas e inputs.
        for(let x = 0 ; x<10;x++){
            //se selecciona la fila.
            let filaActual = document.querySelector("#fila"+i); 
            
            //se crea una columna.
            const col = document.createElement("td");

            //le añado un atributo id.
            col.setAttribute("id","columna"+i+x);
            
            if(filaActual){
                filaActual.appendChild(col);
            };

            //se crea un input text.
            const input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("id","I"+i+x);
            input.setAttribute("value",null);

            //se agnade el input text al la columna si existe
            if(col){
                col.appendChild(input);
                /*
                    En este punto se introducen los valores de las citas en los inputs.
                    Utilizando un switch se verifica la condicion de la columna, es decir en que columna nos encontramos y que dato
                    se debe incluir en dicho input y con cada bucle de la fila se intruce el dato de la cita que corresponda a
                    dicha fila(cada cliente). 
                */
                switch(x){
                    case 0:
                        input.value = ArrIds[i];
                        break;
                    case 1:
                        input.value = ArrNom[i];
                        break;
                    case 2:
                        input.value = ArrApe[i];
                        break;
                    case 3:
                        input.value = ArrDni[i];
                        break;
                    case 4:
                        input.value = ArrNac[i];
                        break;
                    case 5:
                        input.value = ArrCit[i];
                        break;
                    case 6:
                        input.value = ArrHor[i];
                        break;
                    case 7:
                        input.value = ArrMin[i];
                        break;
                    case 8:
                        input.value = ArrTel[i];
                        break;
                    case 9:
                        input.value = ArrCom[i];
                }
            }
            
        }

    }

    //boton para guardar los cambios.
    const botonGuardar = document.createElement('button');
    const txtbtn = document.createTextNode("guardar");
    botonGuardar.setAttribute("type","button");
    botonGuardar.setAttribute("id","btn-guardar");
    botonGuardar.classList.add('btn');
    botonGuardar.classList.add('btn-guardar');
    botonGuardar.appendChild(txtbtn);
    
    const main = document.querySelector('.main__appointments');
    main.appendChild(botonGuardar);
    botonGuardar.addEventListener("click",guardarCambios);

}

//Esta funcion crea un array para cada dato de los clientes.
function separarDatos(){
    //se ordena el array.
    arrSinDni.sort();
    /*Se recorre cada uno de los JSON que hay en el array par pasarlos a objetos
        y poder extraer sus valores a arrays independientes.
    */
    arrSinDni.forEach(e =>{
        const ob = JSON.parse(e);
        ArrIds.push(ob.id);
        ArrNom.push(ob.nombre);
        ArrApe.push(ob.apellido);
        ArrDni.push(ob.dni);
        ArrTel.push(ob.telefono);
        ArrNac.push(ob.nacimiento);
        ArrCit.push(ob.cita);
        ArrHor.push(ob.hora);
        ArrMin.push(ob.minutos);
        ArrCom.push(ob.comentario);
    })
}


function guardarCambios(){
    /*
     se recorre la tabla seleccionando cada input para agnadir los valores a un objeto GuardarCita crea y guarda
     ese objeto como cookie tras haberlo pasado previamente a un objeto JSON.
     De esta forma se sustituyen los datos guardados anteriormente.
    */
    for(let i=0; i<arrSinDni.length; i++){
        let input_0= document.querySelector("#I"+i +"0");
        let input_1= document.querySelector("#I"+i +"1"); 
        let input_2= document.querySelector("#I"+i +"2"); 
        let input_3= document.querySelector("#I"+i +"3"); 
        let input_4= document.querySelector("#I"+i +"4"); 
        let input_5= document.querySelector("#I"+i +"5"); 
        let input_6= document.querySelector("#I"+i +"6"); 
        let input_7= document.querySelector("#I"+i +"7"); 
        let input_8= document.querySelector("#I"+i +"8"); 
        let input_9= document.querySelector("#I"+i +"9"); 

        let cita = new GuardarCita(input_0.value,input_1.value,input_2.value,input_3.value,input_4.value,
                                    input_5.value,input_6.value,input_7.value,input_8.value,input_9.value);

        const jsonCita = JSON.stringify(cita);

        document.cookie= cita.dni + "=" + jsonCita + ";expires=Fri,6 Dec 2024 12:00:00 UTC;path=/";


    }
    window.open("Apointments.html","_self");
}


class GuardarCita {
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




