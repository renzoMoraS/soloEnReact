////////////////IMPORTS////////////////
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

////////////////GLOBAL VARIABLES////////////////
var categories = []
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
var data
var year = []
var yearmonth = {}
var conty = 0
var showdate = '2019'

////////////////FUNCTIONS////////////////
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

////////////////CLASS////////////////
class CatTime extends Component {

    constructor(props){
        super(props);
        this.state = {termino:false,boton:false};
        this.handleInputSubmit = this.handleSubmit.bind(this)
        this.handleInputSubmit2 = this.handleSubmit2.bind(this)
    }   
    
    ////////////////BUTTON FUNCTIONS////////////////
    handleSubmit(e){
        e.preventDefault();
        if (conty > 0) {
            console.log("Atras")
            conty--
            console.log(conty)
            showdate = year[conty]
            console.log('showdate ', showdate)
            speedData = {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: yearmonth[showdate.toString()]
            }
            this.setState({boton:true})
            this.setState({boton:false})
        }else{
            console.log("No se puede ir Atras") 
        }
    } 
    
    handleSubmit2(e){
        e.preventDefault();
        if (conty < year.length - 1) {
            console.log("Adelante")
            console.log(year)
            conty++
            console.log(conty)
            showdate = year[conty]
            console.log('showdate ', showdate)
            speedData = {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: yearmonth[showdate.toString()]
            }
            this.setState({boton:true})
            this.setState({boton:false})
        }else{
            console.log("No se puede ir Adelante") 
        }
    }
    ////////////////END OF BUTTON FUNCTIONS////////////////

    componentWillMount(){
        let currentComponent = this;

        fetch('/sasara', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            }
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
        
            localStorage.setItem('clientsOrders', JSON.stringify(data));

            month = [0,0,0,0,0,0,0,0,0,0,0,0]

            for (var i = 0; i < data.results.length; i++) {
            
                catBoolean = false

                if (year.length === 0) {
                    year.push(data.results[i].date_closed.substr(0,4))
                }else{
                    if (year.includes(data.results[i].date_closed.substr(0,4)) === false) {
                        year.push(data.results[i].date_closed.substr(0,4))
                    }
                }
    
                if (data.results[i].status === "paid") {
                    var category = data.results[i].order_items[0].item.category_id
    
                    for (var x = 0; x < categories.length; x++) {
                        if (category === categories[x]) {
                            catBoolean = true
                        }
                    }
    
                    if (catBoolean === false) {
                    
                        categories.push(category)

                    
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
                        })
                        .then(function(data) {
                            arrayNombres.push(data)
                            currentComponent.setState({termino:true})
                            currentComponent.setState({termino:false})
                        })
                    }
                }
            }
        });
    }
    ////////////////END OF WILL MOUNT////////////////
    ////////////////START OF RENDER////////////////  
    render() {
        data = JSON.parse(localStorage.getItem('clientsOrders'));

        if (data !== undefined) {
            for (var y = 0; y < year.length; y++) {
                month = [0,0,0,0,0,0,0,0,0,0,0,0]

                for (var j = 0; j < categories.length; j++) {
                    for (var p = 0; p < data.results.length; p++) {
                        if (data.results[p].order_items[0].item.category_id === categories[j] && data.results[p].status === "paid") {
                            switch (data.results[p].date_closed.substr(5,2)) {
                                case '01':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[0] = month[0] + 1
                                    }
                                    break;
                                case '02':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[1] = month[1] + 1
                                    }
                                    break;
                                case '03':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[2] = month[2] + 1
                                    }
                                    break;
                                case '04':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[3] = month[3] + 1
                                    }
                                    break;
                                case '05':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[4] = month[4] + 1
                                    }
                                    break;
                                case '06':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[5] = month[5] + 1
                                    }
                                    break;
                                case '07':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[6] = month[6] + 1
                                    }
                                    break;
                                case '08':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[7] = month[7] + 1
                                    }
                                    break;
                                case '09':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[8] = month[8] + 1
                                    }
                                    break;
                                case '10':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[9] = month[9] + 1
                                    }
                                    break;
                                case '11':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[10] = month[10] + 1
                                    }
                                    break;  
                                case '12':
                                    if (data.results[p].date_closed.substr(0,4)===year[y]) {
                                        month[11] = month[11] + 1
                                    }
                                    break;  
                                default:
                                    break;
                            }
                        }
                    }
    
                    if (j===0){
                        showCats=[];
                    }
                    
                    showCats.push({
                        label: arrayNombres[j],
                        data: month,
                        fill: true,
                        color: dame_color_aleatorio(),
                        borderColor: dame_color_aleatorio(),
                        borderWidth: 2
                    })
    
                    month = [0,0,0,0,0,0,0,0,0,0,0,0]
    
                }

                yearmonth[year[y]] = showCats
            }
        }
        
        var options = {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };
        
        speedData = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: yearmonth[showdate]
        }

        ////////////////RETURN////////////////
        return (
            <div className="CatTime">
                <div>
                <h1>{showdate}</h1>
                <form onSubmit= {this.handleInputSubmit}>
                    <button>Anterior</button> 
                </form>  
                <form onSubmit= {this.handleInputSubmit2}>
                    <button>Siguiente</button>
                </form>
                <Line
                    data={speedData}
                    options = {options}
                    height = {175}
                    width = {200}
                />
                </div>
            </div>
        );
    }
}
////////////////CLASS ENDS////////////////

export default (CatTime);