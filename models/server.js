
const express = require('express');
const cors = require('cors');
const app = express();
const servidor = require('http').createServer(app);
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.port = process.env.PORT;

        //Rutaspath
        this.consecutivospath = '/api/consecutivo';
        //Conectar a base de datos
        this.connectardb();
       

        //Middleweres
        this.middleweres();

        //Rutas de mi aplicacion

        this.routers();
        this.soket();
    }

    async connectardb(){
        await dbConnection();
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
        app.use(this.consecutivospath, require('../routes/consecutivos'));
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