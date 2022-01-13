/*{
nombre:'',
correo:'',
"password":'',
"rol:''",
estado:''
}*/

const {Schema, model }= require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String
    },
    correo:{
        type:String
    },
    password:{
        type:String
    },
    rol:{
        type:String
    },
    img:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);