const { servidor } = require('../models/server');



const io = require('socket.io')(servidor);
//Mensajes de sokets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('mensaje','Servidor Normex de Michoacan');
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => { console.log('Cliente desconectado');});
 });