import DataGrafica from "./data_grafica.js";
import LocalStorage from "./localstorage.js";
import Notificaciones from "./noficaciones.js";

class Conexion {
    constructor() {
        this.io = io("http://localhost:3000");
        //this.io = io("https://agronomichserver.herokuapp.com/");
    }
    conectar() {
        this.io.on('connect', () => {
            LocalStorage.setLocalStorage("socket-id", this.io.id)
            Notificaciones.comprobarNavegador();
            if (Notificaciones.verificaAutorizacionNotificacion()) {
                Notificaciones.notificacionConectado();
            }
            const engine = this.io.io.engine;
            console.log(engine.transport.name);
        });
    }
    desconectar() {
        this.io.on('disconnect', (reason) => {
            LocalStorage.deleteLocalStorage("socket-id");
            if (Notificaciones.verificaAutorizacionNotificacion()) {
                Notificaciones.notificacionDesconectado();
            }
            if (reason === "transport close") {
                if (Notificaciones.verificaAutorizacionNotificacion()) {
                    Notificaciones.notificacionDesconectadoErrorServer();
                }
            }
        });
    }

    consecutivos() {
        this.io.on('consecutivos', (payload) => {
            var data = [];

            payload.forEach(conse => {
                data.push([conse['semana'],conse['dictamen'], conse['sello'], conse['fecha'], conse['destino'], conse['tef'], conse['empaque']]);
            });


            $(document).ready(function () {

                var table = $('#example').DataTable({
                    data: data,
                    destroy: true,
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    columns: [
                        { title: "semana"},
                        { title: "Dictamen" },
                        { title: "Fleje" },
                        { title: "Fecha" },
                        { title: "Destino" },
                        { title: "TEF" },
                        { title: "Empaque" },
                        
                    ],
                    language: {
                        url: "./js/lenguaje.json"
                    }
                });
            });
        });
    }
    grafica(valor) {
        this.io.on('data', (payload) => {   

            const size = payload['empaques'].length;
            var labels = [];
            var series = [];

            for (var j = valor - 1; j < (valor + 5); j++) {
                if (j < size) {
                    labels.push(payload['empaques'][j]);
                    series.push(payload['countempaques'][j]);
                }

            }

            var data = {
                labels: labels,
                series: [series]
            };

            var opcions ={
                showPoint: true,
                lineSmooth: true,
                axisX: {
                  showGrid: true,
                  showLabel: true
                },
                axisY: {
                  labelInterpolationFnc: function(value) {
                    return  value;
                  }
                },
                width:1000,
                height:500
            };

            new Chartist.Bar('#chart1', data,opcions);
        });
    }


}

export default Conexion;