class Notificaciones{

    static comprobarNavegador(){
        if(Notification !=="undefined"){
            if(Notification.permission !=="granted"){
                Notification.requestPermission();
            }
        }else{
            console.log("El navegador  no es compatible con las notificaciones");
        }
    }
    static verificaAutorizacionNotificacion(){
        if(Notification.permission !=="granted"){
            return false;
        }else{
            return true;
        }
    }
    static notificacionConectado(){
        
        const opciones ={
            body:'Conectado',
            icon:"./img/logo.png"
        };

        const noti = new Notification('Estado de la conexion', opciones);
    }
    static notificacionDesconectado(){
        
        const opciones ={
            body:'Desconectado',
            icon:"./img/logo.png"
        };

        const noti = new Notification('Estado de la conexion', opciones);
    }
    static notificacionDesconectadoErrorServer(){
        
        const opciones ={
            body:'Se perdio la conxion con el servidor',
            icon:"./img/logo.png"
        };

        const noti = new Notification('Estado de la conexion', opciones);
    }
}

export default Notificaciones;