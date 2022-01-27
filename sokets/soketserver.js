const { servidor } = require('../models/server');
const Usuario = require('../models/usuario');

const Consecutivo = require('../models/consecutivo');
const ConsecutivoRPV = require('../servicios/consecutivorpv');


const io = require('socket.io')(servidor,{
    cors:{
        origin:"http://127.0.0.7:5500",
        methods:["GET","POST"],
        allowedHeaders:["my-custom-header"],
        credentials:true
    }
});

io.socketsJoin("Consecutivos");

io.on("connection", async (socket) => {
   const conse = new ConsecutivoRPV();
    conse.agregarconsecutivoRPV();
    const allrpv = await Consecutivo.find();

    var data = [];
    var empaques = [];
    var countempaques =[];
    allrpv.forEach(conse => {
        data.push([conse['dictamen'], conse['sello'], conse['fecha'], conse['destino'], conse['tef'], conse['empaque']]);
        
        if(!empaques.includes(conse['empaque'],0)){
            empaques.push(conse['empaque']);
        }
    });
   
    empaques.forEach( empaque =>{
        var n = 0;
        allrpv.forEach(conse => {
            if(empaque == conse['empaque']){
                n++;
            }  
        });
        countempaques.push(n);
    });

    

    io.in(socket.id).socketsJoin("Consecutivos"); 
    const count = io.engine.clientsCount;
    console.log(`Clientes conectados ${count}`);
    io.to(socket.id).emit('consecutivos', allrpv);
    io.to(socket.id).emit('data', {
        empaques,
        countempaques
    });
});







io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

  
  

/*  const prueba = async () => await io.fetchSockets();

 console.log(prueba);
 
 prueba(); */


  

/* 
//Mensajes de sokets
io.on('connection', async (client) => {
    
    
    io.emit('consecutivos', allrpv);

   
    client.join(name);
    io.to(name).emit('Conectado con el servidor: ', name);

    console.log('Cliente conectado:', name);

    client.emit('mensaje','Servidor Normex de Michoacan');
    client.on('registar-rpv', async (payload)=>{
        const { dictamen, sello, fecha, destino, tef, empaque } = payload;
        //console.log(dictamen);
        const existedictamen = await Consecutivo.findOne({dictamen:dictamen});
       
        if(!existedictamen){
           
                let consecutivo = new Consecutivo({ 
                    dictamen:dictamen, 
                    sello:sello, 
                    fecha:fecha, 
                    destino: destino, 
                    tef:tef, 
                    empaque:empaque });
                    try {
                        await consecutivo.save();
                        io.to(name).emit('response-rpv',{'ok': true, msg:'Consecutivo de RPV registrado'});
                        const allrpv = await Consecutivo.find();
                        io.emit('consecutivos', allrpv);
                    } catch (error) {
                        io.to(name).emit('response-rpv',{'ok': false, msg: 'Error al guardar la informacion'});
                        console.log(error);
                    }
            
        }else{
            io.to(name).emit('response-rpv',{'ok': false, msg:'El folio ya esta registrado'});
        }
        
    });
    client.on('registro-usuario', async(payload)=>{
        console.log(payload);
        const { nombre, email, password,rol} = payload;

        const usuario = new Usuario({
            nombre:nombre,
            email:email,
            password:password,
            rol:rol
        });
        try {
            await usuario.save();
            io.to(name).emit('response-crear-usuario',{'ok': true, msg:'Consecutivo de RPV registrado'});
            const allrpv = await Consecutivo.find();
            //io.emit('consecutivos', allrpv);
        } catch (error) {
            io.to(name).emit('response-crear-usuario',{'ok': false, msg: 'Error al guardar la informacion'});
            console.log(error);
        }
        
    });
    
    client.on('disconnect', () => { console.log('Cliente desconectado');});

 }); */