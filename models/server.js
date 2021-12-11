
const express = require('express');
const cors = require('cors');
const app = express();
const servidor = require('http').createServer(app);

class Server{
    constructor(){
        this.port = process.env.PORT;

        //Rutaspath
        this.usuariospath = '/api/usuarios';
       

        //Middleweres
        this.middleweres();

        //Rutas de mi aplicacion

        this.routers();
        this.soket();
    }

    middleweres(){
        //Cors
        app.use(cors());
        //Lectura y parseo del body
        app.use(express.json());
        //Directorio publico
        app.use(express.static('public'));

    }

    //rutas
    routers(){
        app.use(this.usuariospath, require('../routes/user'));
    }

    listem(){
        servidor.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

    //Sokets

    soket(){
        
        require("../sokets/soketserver");

    }

}



module.exports = {Server, servidor};