import LocalStorage from './js/localstorage.js';

class DataLocal {
    constructor() {
        this.ls = new LocalStorage();
    }

    setdata(clave, valor) {
        if (this.ls.comprobarNavegador() != false) {
           return this.ls.setLocalStorage(clave, valor);
        }
    }
    getdata(clave) {
        if (this.ls.comprobarNavegador() != false) {
           return this.ls.setLocalStorage(clave, valor);
        }
    }
    deletedata(clave) {
        if (this.ls.comprobarNavegador() != false) {
           return this.ls.deletedata(clave, valor);
        }
    }
 

    

}

export default DataLocal;