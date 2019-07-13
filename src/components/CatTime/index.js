import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

//data.results[i].order_items[0].item.category_id
//data.results[i].date_closed.substr(8,2),data.results[i].date_closed.substr(5,2),data.results[i].date_closed.substr(0,4)

var categories = [0]
var catBoolean = false
var showCats = {lines:[]}
var catReceived

class CatTime extends Component {

    componentWillMount(){
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
                                localStorage.setItem('category',data);
                                console.log(localStorage.getItem('category'))
                        })
                    });

                    if (catReceived !== localStorage.getItem('category')) {
                        catReceived = localStorage.getItem('category');
                    }
                    console.log(catReceived)

                    if (showCats.lines[showCats.lines.length] === undefined || showCats.lines[showCats.lines.length] === null) {
                        showCats.lines[0] = {
                            labels: ['enero','febrero'],
                            datasets: [{
                                label: catReceived,
                                data: [0,1],
                                fill: true,
                                color:"#04B404",
                                borderColor: "#04B404",
                                borderWidth: 2
                            }]
                        }
                    } else {
                        showCats.lines[showCats.lines.length] = {
                            labels: ['enero','febrero'],
                            datasets: [{
                                label: catReceived,
                                data: [0,1],
                                fill: true,
                                color:"#04B404",
                                borderColor: "#04B404",
                                borderWidth: 2
                            }]
                        }   
                    }
                }
            }
        }
        console.log(categories, showCats.lines)
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

      return (
        <div className="CatTime">
          <div>  
            <Line
                data={showCats.lines[0]}
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