// Dependencies
import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import './InterfazTenCat.css';
import Cookies  from 'universal-cookie';

var cookie = new Cookies;

var respuesta;

var data = {
  labels:[],
  datasets:[
      {
          label:[],
          data:[],
          backgroundColor:["rgb(0, 152, 70)","rgb(230, 0, 38)","rgb(255, 233, 0)","rgb(125, 33, 129)", "rgb(13, 29, 162)", "rgb(162, 65, 13)", "rgb(23, 215, 212)", "rgb(241, 111, 254)", "rgb(255, 129, 35)", "rgb(0,0,0)", "rgb(99, 225, 79)"],
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

function otrafuncion(thisComponent) {
  fetch('https://api.github.com/orgs/nodejs')
    .then(function (res) {
      console.log(res)}
    )

  fetch('https://pruebaenreact.azurewebsites.net/TenCat', {
    method: 'POST',
    body: JSON.stringify({
      "token": JSON.stringify(cookie.get("cookieQueGuardaElToken"))
    }),
    headers:{
        'Content-Type': 'application/json',
    }
  })
    .then(function (res) { 
      res.json().then(function(resp){

        //console.log(resp);
        respuesta = resp; 
        console.log(respuesta)
        data.datasets[0].data = respuesta[0]
        data.labels = respuesta[1]
        console.log('la de arriba es la respuesta')

        thisComponent.setState({cambio: true})
        thisComponent.setState({cambio: false})
      })

    }).then(function (res) { 
      console.log(res);
      respuesta = JSON.stringify(res)
      console.log(respuesta)
    })
}


class TenCat extends Component {
  constructor(props) {
    super(props)
    this.state = { cambio: false};
    //this.componentDidMount = this.componentDidMount.bind(this);
    otrafuncion = otrafuncion.bind(this);
  }


  componentDidMount() {
    let thisComponent = this
    otrafuncion(thisComponent)

  }
  
  render() {

    return (

      <div className = "TenCat">

        <h1 style={{textAlign: 'center'}} class = "titulo" >Tendencias x Categoría</h1>

        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Ventas realizadas en el tiempo.&nbsp;</p>

        <Pie
          data={data}
          options= {options}
          height = {20}
          width = {50}
          redraw    
        />
        
      </div>
      
    );

  } 

}

export default TenCat;