import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

var cats = { rpg: {ventasPorMes : {
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
}}
, otros :{ ventasPorMes : {
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
}}
}

var dateLabels = ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01", "10/01", "11/01", "12/01", "13/01", "14/01", "15/01", "16/01", "17/01", "18/01", "19/01", "20/01", "21/01", "22/01", "23/01", "24/01", "25/01", "26/01", "27/01", "28/01", "29/01", "30/01", "31/01", "01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02", "08/02", "09/02", "10/02", "11/02", "12/02", "13/02", "14/02", "15/02", "16/02", "17/02", "18/02", "19/02", "20/02", "21/02", "22/02", "23/02", "24/02", "25/02", "26/02", "27/02", "28/02", "29/06", "01/03", "02/03", "03/03", "04/03", "05/03", "06/03", "07/03", "08/03", "09/03", "10/03", "11/03", "12/03", "13/03", "14/03", "15/03", "16/03", "17/03", "18/03", "19/03", "20/03", "21/03", "22/03", "23/03", "24/03", "25/03", "26/03", "27/03", "28/03", "29/03", "30/03", "31/03", "01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04", "08/04", "09/04", "10/04", "11/04", "12/04", "13/04", "14/04", "15/04", "16/04", "17/04", "18/04", "19/04", "20/04", "21/04", "22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04", "29/04", "30/04", "01/05", "02/05", "03/05", "04/05", "05/05", "06/05", "07/05", "08/05", "09/05", "10/05", "11/05", "12/05", "13/05", "14/05", "15/05", "16/05", "17/05", "18/05", "19/05", "20/05", "21/05", "22/05", "23/05", "24/05", "25/05", "26/05", "27/05", "28/05", "29/05", "30/05", "31/05", "01/06", "02/06", "03/06", "04/06", "05/06", "06/06", "07/06", "08/06", "09/06", "10/06", "11/06", "12/06", "13/06", "14/06", "15/06", "16/06", "17/06", "18/06", "19/06", "20/06", "21/06", "22/06", "23/06", "24/06", "25/06", "26/06", "27/06", "28/06", "29/06", "30/06", "01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07", "10/07", "11/07", "12/07", "13/07", "14/07", "15/07", "16/07", "17/07", "18/07", "19/07", "20/07", "21/07", "22/07", "23/07", "24/07", "25/07", "26/07", "27/07", "28/07", "29/07", "30/07", "31/07", "01/08", "02/08", "03/08", "04/08", "05/08", "06/08", "07/08", "08/08", "09/08", "10/08", "11/08", "12/08", "13/08", "14/08", "15/08", "16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08", "24/08", "25/08", "26/08", "27/08", "28/08", "29/08", "30/08", "31/08", "01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09", "08/09", "09/09", "10/09", "11/09", "12/09", "13/09", "14/09", "15/09", "16/09", "17/09", "18/09", "19/09", "20/09", "21/09", "22/09", "23/09", "24/09", "25/09", "26/09", "27/09", "28/09", "29/09", "30/09", "01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10", "08/10", "09/10", "10/10", "11/10", "12/10", "13/10", "14/10", "15/10", "16/10", "17/10", "18/10", "19/10", "20/10", "21/10", "22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10", "29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11", "25/11", "26/11", "27/11", "28/11", "29/11", "30/11", "01/12", "02/12", "03/12", "04/12", "05/12", "06/12", "07/12", "08/12", "09/12", "10/12", "11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "17/12", "18/12", "19/12", "20/12", "21/12", "22/12", "23/12", "24/12", "25/12", "26/12", "27/12", "28/12", "29/12", "30/12", "31/12"]

var categories = ["inicio"]

var arrfec = []

var feb = 27

function calcDay(dia,mes,ano){
    if (ano%4 === 0 && ano%100 !== 100){
        feb ++
    }
    switch (mes) {
        case '01':
        arrfec[dia - 1] ++
        break;
    case '02':
        arrfec[dia + 30] ++
        break;
    case '03':
        arrfec[dia + feb + 30] ++
        break;
    case '04':
        arrfec[dia + feb + 61] ++
        break;
    case '05':
        arrfec[dia + feb + 91] ++
        break;
    case '06':
        arrfec[dia + feb + 122] ++
        break;
    case '07':
        arrfec[dia + feb + 152] ++
        break;
    case '08':
        arrfec[dia + feb + 183] ++
        break;
    case '09':
        arrfec[dia + feb + 214] ++
        break;
    case '10':
        arrfec[dia + feb + 244] ++
        break;
    case '11':
        arrfec[dia + feb + 275] ++
        break;  
    case '12':
        arrfec[dia + feb + 305] ++
        break;  
    default:
        break;
}

var boolCat = false

class CatTime extends Component {

    componentWillMount(){
  
        var data = JSON.parse(localStorage.getItem('datosMapa'));

        cats.rpg.ventasPorMes = {
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

        cats.otros.ventasPorMes = {
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

        for (var i = 0; i < 356; i++){
            arrfec[i] = 0
        }
        console.log(arrfec)

        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].status === "paid") {
                if (data.results[i].shipping.receiver_address !== undefined) {
                    if (data.results[i].shipping.receiver_address.latitude !== null) {
                        /////////////////////////////////////////////////////
                        boolCat = false
                        for (var x = 0; x < categories.length; x++) {
                            if (data.results[i].order_items[0].item.category_id === categories[x]) {
                                boolCat = true
                            }
                        }
                        if (boolCat === false) {
                            categories[categories.length] = data.results[i].order_items[0].item.category_id
                        }
                        //////////////////////////////////////////////////////
                        if (data.results[i].order_items[0].item.category_id === 'MLA3390') {
                            switch (data.results[i].date_closed.substr(5,2)) {
                                case '01':
                                    cats.rpg.ventasPorMes.enero ++
                                    break;
                                case '02':
                                    cats.rpg.ventasPorMes.febrero ++
                                    break;
                                case '03':
                                    cats.rpg.ventasPorMes.marzo ++
                                    break;
                                case '04':
                                    cats.rpg.ventasPorMes.abril ++
                                    break;
                                case '05':
                                    cats.rpg.ventasPorMes.mayo ++
                                    break;
                                case '06':
                                    cats.rpg.ventasPorMes.junio ++
                                    break;
                                case '07':
                                    cats.rpg.ventasPorMes.julio ++
                                    break;
                                case '08':
                                    cats.rpg.ventasPorMes.agosto ++
                                    break;
                                case '09':
                                    cats.rpg.ventasPorMes.septiembre ++
                                    break;
                                case '10':
                                    cats.rpg.ventasPorMes.octubre ++
                                    break;
                                case '11':
                                    cats.rpg.ventasPorMes.noviembre ++
                                    break;  
                                case '12':
                                    cats.rpg.ventasPorMes.diciembre ++
                                    break;  
                                default:
                                    break;
                            }
                            
                        } else {
                            switch (data.results[i].date_closed.substr(5,2)) {
                                case '01':
                                    cats.otros.ventasPorMes.enero ++
                                    break;
                                case '02':
                                    cats.otros.ventasPorMes.febrero ++
                                    break;
                                case '03':
                                    cats.otros.ventasPorMes.marzo ++
                                    break;
                                case '04':
                                    cats.otros.ventasPorMes.abril ++
                                    break;
                                case '05':
                                    cats.otros.ventasPorMes.mayo ++
                                    break;
                                case '06':
                                    cats.otros.ventasPorMes.junio ++
                                    break;
                                case '07':
                                    cats.otros.ventasPorMes.julio ++
                                    break;
                                case '08':
                                    cats.otros.ventasPorMes.agosto ++
                                    break;
                                case '09':
                                    cats.otros.ventasPorMes.septiembre ++
                                    break;
                                case '10':
                                    cats.otros.ventasPorMes.octubre ++
                                    break;
                                case '11':
                                    cats.otros.ventasPorMes.noviembre ++
                                    break;  
                                case '12':
                                    cats.otros.ventasPorMes.diciembre ++
                                    break;  
                                default:
                                    break;
                            }
                            
                        }
                    }
                }
            } 
        }
        console.log(categories)
    }
  
    render() {
        
        var data={
            labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01", "10/01", "11/01", "12/01", "13/01", "14/01", "15/01", "16/01", "17/01", "18/01", "19/01", "20/01", "21/01", "22/01", "23/01", "24/01", "25/01", "26/01", "27/01", "28/01", "29/01", "30/01", "31/01", "01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02", "08/02", "09/02", "10/02", "11/02", "12/02", "13/02", "14/02", "15/02", "16/02", "17/02", "18/02", "19/02", "20/02", "21/02", "22/02", "23/02", "24/02", "25/02", "26/02", "27/02", "28/02", "29/06", "01/03", "02/03", "03/03", "04/03", "05/03", "06/03", "07/03", "08/03", "09/03", "10/03", "11/03", "12/03", "13/03", "14/03", "15/03", "16/03", "17/03", "18/03", "19/03", "20/03", "21/03", "22/03", "23/03", "24/03", "25/03", "26/03", "27/03", "28/03", "29/03", "30/03", "31/03", "01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04", "08/04", "09/04", "10/04", "11/04", "12/04", "13/04", "14/04", "15/04", "16/04", "17/04", "18/04", "19/04", "20/04", "21/04", "22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04", "29/04", "30/04", "01/05", "02/05", "03/05", "04/05", "05/05", "06/05", "07/05", "08/05", "09/05", "10/05", "11/05", "12/05", "13/05", "14/05", "15/05", "16/05", "17/05", "18/05", "19/05", "20/05", "21/05", "22/05", "23/05", "24/05", "25/05", "26/05", "27/05", "28/05", "29/05", "30/05", "31/05", "01/06", "02/06", "03/06", "04/06", "05/06", "06/06", "07/06", "08/06", "09/06", "10/06", "11/06", "12/06", "13/06", "14/06", "15/06", "16/06", "17/06", "18/06", "19/06", "20/06", "21/06", "22/06", "23/06", "24/06", "25/06", "26/06", "27/06", "28/06", "29/06", "30/06", "01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07", "10/07", "11/07", "12/07", "13/07", "14/07", "15/07", "16/07", "17/07", "18/07", "19/07", "20/07", "21/07", "22/07", "23/07", "24/07", "25/07", "26/07", "27/07", "28/07", "29/07", "30/07", "31/07", "01/08", "02/08", "03/08", "04/08", "05/08", "06/08", "07/08", "08/08", "09/08", "10/08", "11/08", "12/08", "13/08", "14/08", "15/08", "16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08", "24/08", "25/08", "26/08", "27/08", "28/08", "29/08", "30/08", "31/08", "01/09", "02/09", "03/09", "04/09", "05/09", "06/09", "07/09", "08/09", "09/09", "10/09", "11/09", "12/09", "13/09", "14/09", "15/09", "16/09", "17/09", "18/09", "19/09", "20/09", "21/09", "22/09", "23/09", "24/09", "25/09", "26/09", "27/09", "28/09", "29/09", "30/09", "01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10", "08/10", "09/10", "10/10", "11/10", "12/10", "13/10", "14/10", "15/10", "16/10", "17/10", "18/10", "19/10", "20/10", "21/10", "22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10", "29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11", "25/11", "26/11", "27/11", "28/11", "29/11", "30/11", "01/12", "02/12", "03/12", "04/12", "05/12", "06/12", "07/12", "08/12", "09/12", "10/12", "11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "17/12", "18/12", "19/12", "20/12", "21/12", "22/12", "23/12", "24/12", "25/12", "26/12", "27/12", "28/12", "29/12", "30/12", "31/12"],
            datasets: [{
                label: 'Cartas Coleccionables R.P.G.',
                data: [cats.rpg.ventasPorMes.enero,cats.rpg.ventasPorMes.febrero,cats.rpg.ventasPorMes.marzo,cats.rpg.ventasPorMes.abril,cats.rpg.ventasPorMes.mayo,cats.rpg.ventasPorMes.junio,cats.rpg.ventasPorMes.julio,cats.rpg.ventasPorMes.agosto,cats.rpg.ventasPorMes.septiembre,cats.rpg.ventasPorMes.octubre,cats.rpg.ventasPorMes.noviembre,cats.rpg.ventasPorMes.diciembre],
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
                label: 'Otros',
                data: [cats.otros.ventasPorMes.enero,cats.otros.ventasPorMes.febrero,cats.otros.ventasPorMes.marzo,cats.otros.ventasPorMes.abril,cats.otros.ventasPorMes.mayo,cats.otros.ventasPorMes.junio,cats.otros.ventasPorMes.julio,cats.otros.ventasPorMes.agosto,cats.otros.ventasPorMes.septiembre,cats.otros.ventasPorMes.octubre,cats.otros.ventasPorMes.noviembre,cats.otros.ventasPorMes.diciembre],
                backgroundColor: [
                    'rgba(60, 159, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(60, 159, 132, 1)',
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