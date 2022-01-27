const xslFile = require('read-excel-file/node');

const Consecutivo = require('../models/consecutivo');
class ConsecutivoRPV {

    agregarconsecutivoRPV  () {
      
        
        xslFile('./sokets/consecutivos/concentrado de rpv.xlsx').then((rows) => {
            rows.forEach(async (col) => {
                //Verifica si el folio del dictamen se encuentra registrado
                const existedictamen = await Consecutivo.findOne({ dictamen: col[0] });

                //En caso de no este registrado lo registra de lo contrario omite su registro
                if (!existedictamen) {
                    let consecutivo = new Consecutivo({
                        dictamen: col[0],
                        sello: col[1],
                        fecha: col[6],
                        destino: col[3],
                        tef: col[4],
                        empaque: col[5],
                        semana: col[7]
                    });
                    try {
                        consecutivo.save();

                    } catch (error) {
                        console.log(error);
                    }
                }

            });
        });
    }
    todoslosconsecutivosRPV() {
        const allrpvs = async () => await Consecutivo.find();
        return allrpvs;
    }
}

module.exports = ConsecutivoRPV;