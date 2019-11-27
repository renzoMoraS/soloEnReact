// Dependencies
import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import './InterfazTenCat.css';
import Cookies  from 'universal-cookie'; 

var cookie = new Cookies;
var data = {
  labels:[/*CREAR VARIABLE QUE DEFINE LA CANTIDAD DE CAMPOS DEL GRÁFICO*/],
  datasets:[
      {
          label:"AA",
          data:[/*ENLAZAR CON LABELS (ANTERIOR)*/],
          backgroundColor:["rgb(0, 152, 70)","rgb(230, 0, 38)","rgb(255, 233, 0)"],
          borderColor:"rgb(255,255,255)"
      }
  ]
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
class TenCat extends Component {
  componentDidMount() {
    fetch('https://api.github.com/orgs/nodejs')
      .then(function (res) {
        console.log(res)}
      )

    fetch('https://pruebaenreact.azurewebsites.net/TenCat')
      .then(function (res) { 
        console.log(res);
      })
  }
  render() {

    return (

      <div className = "TenCat">

        <h1 style={{textAlign: 'center'}} class = "titulo" >Tendencias x Categoría</h1>

        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Ventas realizadas en el tiempo.&nbsp;</p>
        <form onSubmit={this.handleSubmit}>

          <div algo = "alinear">
            <div class = "inner">
              <button class =  "dia" >
                Último día
              </button>
            </div>
  
            <div class = "inner">
              <button class =  "semana" >
                Última semana
              </button>
            </div>

            <div class = "inner">
              <button class =  "mes" >
                Último mes
              </button>
            </div>

            <div class = "inner">
              <button class =  "año" >
                Último año
              </button>
            </div>
        
          </div>

          </form>

        <Pie
               data={data}
               options= {options}
               height = {20}
               width = {50}
                />   
      </div>
      
    );

  } 

}

export default TenCat;