const { servidor } = require('../models/server');
const xslFile = require('read-excel-file/node');
const Consecutivo = require('../models/consecutivo');
const Usuario = require('../models/usuario');

var userNames = {};
var getDefaultName = function(){
    var cnt = 0;
    for (user in userNames) {
        cnt+=1;
    }
    return 'User' + String(cnt);
};
const io = require('socket.io')(servidor);
//Mensajes de sokets
io.on('connection', async (client) => {
    xslFile('./sokets/consecutivos/concentrado de rpv.xlsx').then( (rows) => {
        rows.forEach( async (col) => {
            //var fila = [];
            const existedictamen = await Consecutivo.findOne({ dictamen: col[0] });
            
            if (!existedictamen) {
                let consecutivo = new Consecutivo({
                    dictamen: col[0],
                    sello: col[1],
                    fecha: col[6],
                    destino: col[3],
                    tef: col[4],
                    empaque: col[5]
                });
                try {
                    consecutivo.save();
                   
                } catch (error) {
                    console.log(error);
                }
            }
        });
    } );
    var name = getDefaultName();
    userNames[name] = client.id;
    data = {name: name};
    const allrpv = await Consecutivo.find();
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

 });