// Dependencies
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Cookies  from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './micss.css';
import './InterfazMP.css';


var cookie = new Cookies;



//let elcanvas=document.getElementById("Grafico").getContext("2d");

var listita = []
var cookie = new Cookies;
var ladata;
var usados = 0;
var nuevos = 0;
var precio = {

        labels:[], //mostrar acá las publicaciones
        datasets:[]
    }
var cantvendida = {

        labels:[], //mostrar acá las publicaciones
        datasets:[]
}
var estado = {

    labels:['hola','chau'], //mostrar acá las publicaciones
    datasets:[]
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
var optionspie = {
    maintainAspectRatio: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 10
      }
    }
}

class MisPublis extends Component {
    constructor(props) {
        super(props)
        this.state = { trajo_lista: 'no', nuevo_plot:'no'};
        //this.componentDidMount = this.componentDidMount.bind(this)
        //this.cosito = this.cosito.bind(this);
    }
    
    establecerEstado = (estado) => {
        this.setState({trajo_lista: estado})
    }
    clic_en_un_item_mio = (item, posicion) => {
        var BreakException = {};
        var contador = 0;
        precio.labels = [""]; // Borramos los datos anteriores
        precio.datasets = [];
        precio.label = []; 
        cantvendida.labels = [""]; // Borramos los datos anteriores
        cantvendida.datasets = [];
        cantvendida.label = [];
        estado.labels = [""]; // Borramos los datos anteriores
        estado.datasets = [];
        estado.label = [];
        ladata = JSON.parse(localStorage.getItem('listaprod.json'))
        try {
            ladata[posicion].results.forEach(item_competencia => {
                console.log(contador)
                if(contador > 10) {
                    console.log(contador)
                    throw BreakException;
                }
                console.log('despuesDatasetsVacios'+contador)
                if (contador == 0) {
                    precio.datasets.push({
                        label: item_competencia.title,
                        data: [item_competencia.price], // ESTO ES LO QUE HAY QUE TOCAR PARA ELEGIR QUE MEDIR.
                        fill: true,
                        backgroundColor:"rgb(255,255,0,1)",
                        borderColor:"rgb(9,56,8)",
                        borderWidth: 2
                    })
                    cantvendida.datasets.push({ 
                        label: item_competencia.title,
                        data: [item_competencia.sold_quantity], // ESTO ES LO QUE HAY QUE TOCAR PARA ELEGIR QUE MEDIR.
                        fill: true,
                        backgroundColor:"rgb(255,255,0,1)",
                        borderColor:"rgb(9,56,8)",
                        borderWidth: 2
                    })
                } else {
                    precio.datasets.push({
                        label: item_competencia.title,
                        data: [item_competencia.price], // Esto requiere un valor por cada label.
                        fill: true,
                        backgroundColor:"rgb(255,7,7,0.7)",
                        borderColor:"rgb(9,56,8)",
                        borderWidth: 2
                    })
                    cantvendida.datasets.push({
                        label: item_competencia.title,
                        data: [item_competencia.sold_quantity], // Esto requiere un valor por cada label.
                        fill: true,
                        backgroundColor:"rgb(255,7,7,0.7)",
                        borderColor:"rgb(9,56,8)",
                        borderWidth: 2
                    })
                    console.log(item_competencia.condition)
                    if (item_competencia.condition  == "used"){
                        usados=usados+1;
                    }
                    if (item_competencia.condition  == "new"){
                        nuevos=nuevos+1;
                    }
                }
                console.log('despuesDatasetsVacios'+contador)
                contador = contador+1;
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
        console.log(usados,'usados')
        console.log(nuevos,'nuevos')
        estado = {
            datasets: [{
                data: [usados, nuevos],
                backgroundColor:['#00ff00','#ff0000'],
                hoverBackgroundColor: ['#00ff00','#ff0000'],
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Usados',
                'Nuevos',
            ],

        };

        console.log(estado)

        this.setState({nuevo_plot : 'si'})
        this.setState({nuevo_plot : 'no'})
    } 
    
    cosito = () => {
        let currentComponent = this;

        fetch('https://pruebaenreact.azurewebsites.net/MPublis', {
            method: 'POST',
            body: JSON.stringify({
              token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
            }),
            headers:{
              'Content-Type': 'application/json',
            }
          })
            .then(function (data) {
                
                //var dataStringified = JSON.stringify(data);// acá podes hacer cosas con res, que es la respuesta en forma de json que de dio eze}
                return data.json()
            })
            .then(ladata => {
                console.log(ladata);
                //var da = JSON.parse(data)
                ladata.forEach( item => {
                    listita.push(item.query)
                })
                
                console.log(listita)
                //this.establecerEstado.bind(this)
                //this.establecerEstado('si')
                localStorage.setItem('listaprod.json',JSON.stringify(ladata))
                currentComponent.setState({trajo_lista: 'si'});                
                })
            
        };
            
    

    render() {
        if (this.state.trajo_lista == 'no') {
            this.cosito()
            var publis = JSON.parse(localStorage.getItem('listaprod.json'))
        }
        console.log('lo de abajo es publis')
        console.log(publis)
        //var producto = publis
        console.log('lo de abajo es producto')
        //console.log(producto)
        console.log(listita)
        //ARMAR OTRO BUTTON GROUP CON LAS COSAS A COMPARAR
        console.log(estado)
        return (
        <div id="publis">
            <h1 style={{textAlign: 'center'}} class = "titulo" >Publicaciones</h1>
                <div id="buton">
                    <ButtonGroup horizontal>
                        {listita.map((item, i) =>
                        //<Button }>{item}</Button>
                        <Button onClick={() => this.clic_en_un_item_mio(item, i)}>{item}</Button>)}
                    </ButtonGroup>
                </div>
            <div id="precio"> 
                <Bar
                    data={precio}
                    options= {options}
                    height = {20}
                    width = {50}
                />
            </div>
            <div id="cantvendida"> 
                    <Bar
                    data={cantvendida}
                    options= {options}
                    height = {20}
                    width = {50}
                />
            </div>
            <div id="estado"> 
                    <Pie
                    data={estado}
                    options= {optionspie}
                    height = {500}   
                    width = {500}    
                />
            </div>

        </div>
        );
  }
}
//precio barras
//descuento DE TORTAS
//estado del item DE TORTAS
export default (MisPublis);