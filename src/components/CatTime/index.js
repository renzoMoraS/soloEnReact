import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

//data.results[i].order_items[0].item.category_id
//data.results[i].date_closed.substr(8,2),data.results[i].date_closed.substr(5,2),data.results[i].date_closed.substr(0,4)

var categories = [0]
var catBoolean = false
var showCats = []
var arrayNormie = []
var speedData

class CatTime extends Component {
    constructor(props){
        super(props);
        this.state = {termino:false};
    }

    componentWillMount(){
        let currentComponent = this;

        var data = JSON.parse(localStorage.getItem('clientsOrders'));

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
                            arrayNormie.push(data)
                        })
                    })
                    .then(function() {
                        console.log(arrayNormie.length)
                        
                        showCats.push({
                                label: arrayNormie[arrayNormie.length - 1],
                                data: [0,1,2,3,4,5,6,7,8,9,10,11],
                                fill: true,
                                color:"#04B404",
                                borderColor: "#04B404",
                                borderWidth: 2
                        })
                        
                        currentComponent.setState({termino:true})
                        
                        console.log(showCats)
                    });
                }
            }
        }
    }
  
    render() {
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

        // hace un if para que mire si termino y si termino que ponga lo que está acá abajo.
        speedData = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sepriembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: [{
                label:"No funca",
                data: [0,1,2,3,4,5,6,7,8,9,10,11],
                fill: true,
                color:"#04B404",
                borderColor: "#04B404",
                borderWidth: 2
            }]
        }
        if (this.state.termino) {
            speedData = {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sepriembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: showCats
            }
        }

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