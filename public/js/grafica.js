import Conexion from "./conexion.js";
var pag = 1;
const conexion = new Conexion();
conexion.conectar();
conexion.desconectar();

function cambiardata(valor){
    console.log('Estoy en cambiar grafica');
    
    pag = valor;
    conexion.grafica(valor);
}

cambiardata(pag);

// document.getElementById("pg3").addEventListener("click", cambiardata(13));
// document.getElementById("pg4").addEventListener("click", cambiardata(19));
// document.getElementById("pg5").addEventListener("click", cambiardata(25));
// document.getElementById("pg6").addEventListener("click", cambiardata(32));
