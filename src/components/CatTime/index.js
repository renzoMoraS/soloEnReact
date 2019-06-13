import React, { Component } from 'react';

class CatTime extends Component {

    componentWillMount(){
  
        var data = JSON.parse(localStorage.getItem('datosMapa'));
        
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].status = "paid") {
                if (data.results[i].shipping.receiver_address !== undefined) {
                    if (data.results[i].shipping.receiver_address.latitude !== null) {
                        console.log(data.results[i].order_items[0].item.category_id) 
                    }
                } 
            }
            
        }

    }
  
    render() {
  
      return (
        <div className="CatTime">

        </div>
      );
    }
  }
  
  export default (CatTime);