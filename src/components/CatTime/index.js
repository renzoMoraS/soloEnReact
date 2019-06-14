import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class CatTime extends Component {

    componentWillMount(){
  
        var data = JSON.parse(localStorage.getItem('datosMapa'));
        
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].status === "paid") {
                if (data.results[i].shipping.receiver_address !== undefined) {
                    if (data.results[i].shipping.receiver_address.latitude !== null) {
                        console.log(data.results[i].order_items[0].item.category_id) 
                    }
                } 
            }
            
        }

    }
  
    render() {
        
        var data={
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [1,7,3,4,2,6,7,8],
                backgroundColor: [
                    'rgba(255, 98, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
                height = '100px'
                width = '300px'
            />
          </div>
        </div>
      );
    }
  }
  
  export default (CatTime);