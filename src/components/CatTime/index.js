import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

//data.results[i].order_items[0].item.category_id
//data.results[i].date_closed.substr(8,2),data.results[i].date_closed.substr(5,2),data.results[i].date_closed.substr(0,4)

var categories = [0]
var catBoolean = false
var showCats = [{
        label:"No funca",
        data: [0,1,2,3,4,5,6,7,8,9,10,11],
        fill: true,
        color:"#04B404",
        borderColor: "#04B404",
        borderWidth: 2
    }]
var arrayNombres = []
var speedData
var month = [12]
var data = JSON.parse(localStorage.getItem('clientsOrders'));


class CatTime extends Component {
    constructor(props){
        super(props);
        this.state = {termino:false};
    }

    componentWillMount(){
        let currentComponent = this;

        month = [0,0,0,0,0,0,0,0,0,0,0,0]

        for (var i = 0; i < data.results.length; i++) {
            
            catBoolean = false
    
            if (data.results[i].status === "paid" && data.results[i].shipping.receiver_address !== undefined && data.results[i].shipping.receiver_address.latitude !== null) {
                var category = data.results[i].order_items[0].item.category_id
    
                for (var x = 0; x < categories.length; x++) {
                    if (category === categories[x]) {
                        catBoolean = true
                    }
                }
    
                if (catBoolean === false) {
                    if (categories[0] === 0) {
                        categories[0] = category
                    }else{
                        categories[categories.length] = category
                    }
                    
                        fetch('/categories', {
                            method: 'POST',
                            body: JSON.stringify({
                              "category": category
                            }),
                            headers:{
                              'Content-Type': 'application/json',
                            }
                        })
                        .then(function(response){
                            return response.text()
                            .then(function(data) {
                                console.log('esto es data')
                                console.log(data)
                                arrayNombres.push(data)
                                console.log(arrayNombres)
                                currentComponent.setState({termino:true})
                                currentComponent.setState({termino:false})
                            })
                        })
                }
            }
        }
    }
  
    render() {
        for (var j = 0; j < categories.length; j++) {
            for (var p = 0; p < data.results.length; p++) {
                if (data.results[p].order_items[0].item.category_id === categories[j] && data.results[p].status === "paid" && data.results[p].shipping.receiver_address !== undefined && data.results[p].shipping.receiver_address.latitude !== null) {
                    switch (data.results[p].date_closed.substr(5,2)) {
                        case '01':
                            month[0] = month[0] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '02':
                            month[1] = month[1] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '03':
                            month[2] = month[2] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '04':
                            month[3] = month[3] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '05':
                            month[4] = month[4] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '06':
                            month[5] = month[5] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '07':
                            month[6] = month[6] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '08':
                            month[7] = month[7] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '09':
                            month[8] = month[8] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '10':
                            month[9] = month[9] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;
                        case '11':
                            month[10] = month[10] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;  
                        case '12':
                            month[11] = month[11] + 1
                            console.log(data.results[p].date_closed.substr(5,2))
                            console.log(categories[j])  
                            break;  
                        default:
                            break;
                    }
                }
            }

            console.log(arrayNombres)
            if (j===0){
                showCats=[];
            }
            showCats.push({
                label: arrayNombres[j],
                data: month,
                fill: true,
                color:"#04B404",
                borderColor: "#04B404",
                borderWidth: 2
            })
            console.log(arrayNombres)
            console.log(showCats)

            month = [0,0,0,0,0,0,0,0,0,0,0,0]
        }

        var options = {
            lineTension: 0,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        
        speedData = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: showCats
        }
        console.log(speedData)
        

        return (
            <div className="CatTime">
              <div> 
                <Line
                    data={speedData}
                    options = {options}
                    height = {600}
                    width = {500}
                />
              </div>
            </div>
          );
        }
}

export default (CatTime);