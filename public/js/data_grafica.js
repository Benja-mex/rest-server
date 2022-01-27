class DataGrafica{

    constructor( payload, desde){
        this.payload = payload;
        this.labels = [];
        this.series = [];
        this.size = payload['empaques'].length;
        this.desde = desde;
        console.log(payload);
        
    }

    data(){
        for (var j = this.desde - 1; j < (this.desde + 5); j++) {
            if (j < size) {
                this.labels.push(this.payload['empaques'][j]);
                this.series.push(this.payload['countempaques'][j]);
            }
        }
    }


    graficaBar(id){

        var data = {
            labels: this.labels,
            series: [this.series]
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
            height:550
        };
        
        new Chartist.Bar(id, data,this.opcions());
    }

}

export default DataGrafica;