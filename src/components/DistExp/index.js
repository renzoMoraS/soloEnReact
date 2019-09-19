import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

var contgs = 0
var contgpro = 0
var contgp = 0
var contsil = 0
var contbr = 0
var contfree = 0
var contgold = 0
var exps = []
var speedData

function aleatorio(inferior,superior){
    var numPosibilidades = superior - inferior
    var aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
 }

function dame_color_aleatorio(){
    var hexadecimal = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    var color_aleatorio = "#";
    for (var i=0;i<6;i++){
       var posarray = aleatorio(0,hexadecimal.length)
       color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
 }

class DistExp extends Component{
    constructor(props){
        super(props);
        this.state = {termino:false};
    }

    componentWillMount(){
        let thisComponent = this

        fetch('/sasara', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            }
        })
        .then(function(res){
            return res.json()
        })
        .then(function(userdata){
            //localStorage.setItem('clientsOrders', JSON.stringify(datas));
            contgs = 0
        contgpro = 0
        contgp = 0
        contsil = 0
        contbr = 0
        contfree = 0
        contgold = 0

        for (var i = 0; i < userdata.results.length; i++) {
            var expo = userdata.results[i].order_items[0].listing_type_id;
            switch(expo){
                case 'gold_premium':
                    console.log('gold_premium');
                    contgp ++;
                    exps[0] = contgp
                    console.log(contgp);
                    break;
                case 'gold_pro':
                    console.log('gold_pro');
                    contgpro ++;
                    exps[1] = contgpro;
                    console.log(contgpro);
                    break;
                case 'gold_special':
                    console.log('gold_special');
                    contgs ++;
                    exps[2] = contgs
                    console.log(contgs);
                    break;
                case 'gold':
                    console.log('gold');
                    contgold ++;
                    exps[3] = contgold
                    console.log(contgold);
                    break;
                case 'silver':
                    console.log('silver');
                    contsil ++;
                    exps[4] = contsil
                    console.log(contsil);
                    break;
                case 'bronze':
                    console.log('bronze');
                    contbr ++;
                    exps[5] = contbr
                    console.log(contbr);
                    break;
                case 'free':
                    console.log('free');
                    contfree ++;
                    exps[6] = contfree
                    console.log(contfree);
                    break;
                default:
                    break;
            }
        }

        console.log(exps)

        speedData = {
            labels: ["Gold Premium", "Gold Pro", "Gold Special", "Gold", "Silver", "Bronze", "Free"],
            datasets:[{
                label: "Exposiciones",
                data: exps,
                fill: true,
                color: dame_color_aleatorio(),
                borderColor: dame_color_aleatorio(),
                borderWidth: 2
            }]
        }
            thisComponent.setState({termino:true});
            thisComponent.setState({termino:false});
        })

    }
    
    render(){

        //var userdata = JSON.parse(localStorage.getItem('clientsOrders'));

        speedData = {
            labels: ["Gold Premium", "Gold Pro", "Gold Special", "Gold", "Silver", "Bronze", "Free"],
            datasets:[{
                label: "Exposiciones",
                data: exps,
                fill: true,
                color: dame_color_aleatorio(),
                borderColor: dame_color_aleatorio(),
                borderWidth: 2
            }]
        }
        
        var options = {
            
        };

        return (
            <div className="DistExp">
                <h1 style={{textAlign: 'center'}}>Distribucion por exposición</h1>
                <div className="patient-container">
                </div>
                <div>
                    <Bar
                        data={speedData}
                        options = {options}
                        height = {25}
                        width = {75}
                    />
                </div>
            </div>
        );
    }
}
export default (DistExp);