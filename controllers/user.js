const {request, response } = require('express');

const usuariosallGet = (req = request, res = response)=>{
    res.json({
        msg:'get API - controlador'
    });
}
const usuariosGet = (req = request, res = response)=>{
    res.json({
        msg:'get API - controlador'
    });
}
const usuariosPost = (req = request, res = response)=>{
    const { nombre, edad } = req.body;
    res.json({
        msg:'post API - controlador',
        nombre,
        edad
    });
}
const usuariosPut = (req = request, res = response)=>{
    const { id } = req.params;
    res.json({
        msg:'put API - controlador',
        id
    });
}
const usuariosDelete = (req = request, res = response)=>{
    res.json({
        msg:'delete API - controlador'
    });
}



module.exports = {
    usuariosallGet,
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}