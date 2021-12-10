
const express = require('express');
const cors = require('cors');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Rutaspath
        this.usuariospath = '/api/usuarios';

        //Middleweres
        this.middleweres();

        //Rutas de mi aplicacion

        this.routers();
    }

    middleweres(){
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));

    }

    //rutas
    routers(){
        this.app.use(this.usuariospath, require('../routes/user'));
    }

    listem(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

}



module.exports = Server;