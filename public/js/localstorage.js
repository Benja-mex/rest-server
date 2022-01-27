//Comprueba si el navegador es compatible con localstoreg

class LocalStorage {

    static comprobarNavegador() {
        if (typeof (Storage) == "undefined") {
            console.log("LocalStorage:No valido");
            return false;
        }
        console.log("LocalStorage: Valido");
        return true;
    }
    static setLocalStorage(clave,valor){
        try {
            localStorage.setItem(clave, valor);
            return true;
        } catch (error) {
                      
            return false;
        }
    }
    static getLocalStorage(clave){
        return localStorage.getItem(clave);
    }
    static deleteLocalStorage(clave){
        return localStorage.removeItem(clave);
    }
}

export default  LocalStorage;

