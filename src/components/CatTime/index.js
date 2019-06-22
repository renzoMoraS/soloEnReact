import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

var ventasPorMes = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0
}

var cats = { rpg: 0, otro: 0}

var contCats = 0

//var catList = [30]

class CatTime extends Component {

    componentWillMount(){
  
        var data = JSON.parse(localStorage.getItem('datosMapa'));

        ventasPorMes = {
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril: 0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0
        }

        cats = { rpg: [], otro: []}

        contCats = 0

        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].status === "paid") {
                if (data.results[i].shipping.receiver_address !== undefined) {
                    if (data.results[i].shipping.receiver_address.latitude !== null) {
                        if (data.results[i].order_items[0].item.category_id === 'MLA3390') {
                            cats.rpg[contCats] = data.results[i].date_closed.substr(5,2)
                            console.log(cats.rpg[contCats])
                            contCats++
                        }
                    }
                }
            }
            
        }

        for (var x = 0; x < cats.rpg.length ; x++) {
            switch (cats.rpg[x]) {
                case '01':
                    ventasPorMes.enero ++
                    break;
                case '02':
                    ventasPorMes.febrero ++
                    break;
                case '03':
                    ventasPorMes.marzo ++
                    break;
                case '04':
                    ventasPorMes.abril ++
                    break;
                case '05':
                    ventasPorMes.mayo ++
                    break;
                case '06':
                    ventasPorMes.junio ++
                    break;
                case '07':
                    ventasPorMes.julio ++
                    break;
                case '08':
                    ventasPorMes.agosto ++
                    break;
                case '09':
                    ventasPorMes.septiembre ++
                    break;
                case '10':
                    ventasPorMes.octubre ++
                    break;
                case '11':
                    ventasPorMes.noviembre ++
                    break;  
                case '12':
                    ventasPorMes.diciembre ++
                    break;  
                default:
                    break;
            }
        }

    }
  
    render() {
        
        var data={
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Cartas Coleccionables R.P.G.',
                data: [ventasPorMes.enero,ventasPorMes.febrero,ventasPorMes.marzo,ventasPorMes.abril,ventasPorMes.mayo,ventasPorMes.junio,ventasPorMes.julio,ventasPorMes.agosto,ventasPorMes.septiembre,ventasPorMes.octubre,ventasPorMes.noviembre,ventasPorMes.diciembre],
                backgroundColor: [
                    'rgba(255, 98, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Ropa',
                data: [ventasPorMes.enero,ventasPorMes.febrero,ventasPorMes.marzo,ventasPorMes.abril,ventasPorMes.mayo,ventasPorMes.junio,ventasPorMes.julio,ventasPorMes.agosto,ventasPorMes.septiembre,ventasPorMes.octubre,ventasPorMes.noviembre,ventasPorMes.diciembre],
                backgroundColor: [
                    'rgba(255, 98, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        }

        var options = {
            maintainAspectRtio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

      return (
        <div className="CatTime">
          <div>  
            <Line
                data={data}
                options = {options}
                height = {200}
                width = {400}
            />
          </div>
        </div>
      );
    }
  }
  
  export default (CatTime);