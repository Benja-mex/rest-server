
const { Schema, model } = require('mongoose');

const ConsecutivoSchema = Schema({
    dictamen: {
        type: String,
    },
    sello: {
        type: String,
    },
    fecha: {
        type: String,
    },
    destino: {
        type: String,
    },
    tef: {
        type: String,
    },
    empaque: {
        type: String,
    }

});



ConsecutivoSchema.methods.toJSON = function() {
    const { __v, password, ...consecutivo  } = this.toObject();
    return consecutivo;
}

module.exports = model( 'Consecutivo', ConsecutivoSchema );
