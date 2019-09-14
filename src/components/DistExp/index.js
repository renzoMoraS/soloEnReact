import React, { Component } from 'react';

var contgs = 0
var contgpro = 0
var contgp = 0
var contsil = 0
var contbr = 0
var contfree = 0
var contgold = 0
class DistExp extends Component{
    constructor(props){
        super(props);
        this.state = {termino:false};
    }

    uData(){

        contgs = 0
        contgpro = 0
        contgp = 0
        contsil = 0
        contbr = 0
        contfree = 0
        contgold = 0

        fetch('/sasara', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            }
        })
        .then(function(res){
            return res.json()
        })
        .then(function(datas){
            localStorage.setItem('clientsOrders', JSON.stringify(datas));
        })

        var userdata = JSON.parse(localStorage.getItem('clientsOrders'));

        for (var i = 0; i < userdata.results.length; i++) {
            var expo = userdata.results[i].order_items[0].listing_type_id;
            switch(expo){
                case 'gold_pro':
                    console.log('gold_pro');
                    contgpro ++;
                    console.log(contgpro);
                    break;
                case 'gold_special':
                    console.log('gold_special');
                    contgs ++;
                    console.log(contgs);
                    break;
                case 'gold':
                    console.log('gold');
                    contgold ++;
                    console.log(contgold);
                    break;
                case 'silver':
                    console.log('silver');
                    contsil ++;
                    console.log(contsil);
                    break;
                case 'bronze':
                    console.log('bronze');
                    contbr ++;
                    console.log(contbr);
                    break;
                case 'free':
                    console.log('free');
                    contfree ++;
                    console.log(contfree);
                    break;
                case 'gold_premium':
                    console.log('gold_premium');
                    contgp ++;
                    console.log(contgp);
                    break;
                default:
                    break;
            }
        }
        this.setState({termino:true});
        this.setState({termino:false});
    }
    
    render(){
        return (
            <div className="DistExp">
                <h1 style={{textAlign: 'center'}}>Distribucion por exposición</h1>
                <div className="patient-container">
                    <button onClick={this.uData.bind(this)}>Tocame perro</button>
                    <p>Ventas de cada tipo de publicacion</p>
                    <p>gold_premium: {contgp}</p>
                    <p>gold_pro: {contgpro}</p>
                    <p>gold_special: {contgs}</p>
                    <p>gold: {contgold}</p>
                    <p>silver: {contsil}</p>
                    <p>bronze: {contbr}</p>
                    <p>free: {contfree}</p>
                </div>
            </div>
        );
    }
}
export default (DistExp);