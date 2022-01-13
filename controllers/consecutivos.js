const { request, response } = require('express');
const Consecutivo = require('../models/consecutivo');

const consecutivoallGet = async (req = request, res = response) => {
    const allrpv = await Consecutivo.find();
    res.json({
        allrpv
    });
}
const consecutivoGet = (req = request, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}
const consecutivoPost = async (req = request, res = response) => {
    const { dictamen, sello, fecha, destino, tef, empaque } = req.body;

    const existedictamen = await Consecutivo.findOne({ dictamen: dictamen });

    if (!existedictamen) {

        let consecutivo = new Consecutivo({
            dictamen: dictamen,
            sello: sello,
            fecha: fecha,
            destino: destino,
            tef: tef,
            empaque: empaque
        });
        try {
            consecutivo.save();
            res.status(200).json({
                ok: true,
                consecutivo
            });
        } catch (error) {
            res.status(400).json({
                ok: false,
                error
            });
            console.log(error);
        }
    } else {
        res.status(400).json({
            ok: false,
            msg: 'El folio ya esta registrado'
        });
    }



}
const consecutivoPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - controlador',
        id
    });
}
const consecutivoDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}



module.exports = {
    consecutivoallGet,
    consecutivoGet,
    consecutivoPost,
    consecutivoPut,
    consecutivoDelete
}