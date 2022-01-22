class Socket{
    constructor(){
        this.io = io();
    }
    
    conectado(){
        this.io.on("connect", () => {
            console.log(this.io.id); // ojIckSD2jqNzOqIrAGzL
          });
    }
    desconectado(){
        this.io('disconnect',()=>{
            console.log('Desconectado');           
        });
    }
}