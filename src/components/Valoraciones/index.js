//import React from 'react';
import React, { Component } from 'react';
//import { Alert } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';  
//import axios from 'axios'
//import valoracionesDeUsuarios from '../valoraciones'
//var xhr = new XMLHttpRequest();

//xhr.open('GET', 'localhost:8081/valoraciones', true);
//xhr.send();

var valoracionesObtenidas = '';
//var unavariablequemeindicaquetodoanduvomal = "";

class valoracionesApp extends Component {
  constructor(props) {
      super(props)
      this.state = { termino: 'no', valoraciones: [], text: '', userok: ''}
      this.handleInputChange = this.handleChange.bind(this)
      this.handleInputSubmit = this.handleSubmit.bind(this)
  }

  onClick(e){
    e.preventDefault();
  }
  handleChange(e){
    this.setState({text:e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)

    var username = this.state.text;
    localStorage.setItem('seller',username)

    if (username.length!==0) {
      fetch('/valoraciones',{
            method: 'POST',
            body: JSON.stringify({
                "username": username
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        })
      .then((response) => {
        if (response.ok) {
          var lasvaloraciones = response.json();
          lasvaloraciones.then(value => {
            console.log(value)
            valoracionesObtenidas = value
            console.log(valoracionesObtenidas)
            this.setState({termino: 'si', userok: 'true'});
            console.log('estado'+JSON.stringify(valoracionesObtenidas))
          })
          
        } else {
          this.setState({userok: 'false', termino: 'si'});
        }
      })
      /*.catch(function(error) {
        unavariablequemeindicaquetodoanduvomal=<p>No Existe tal usuario</p>
        this.setState({userok: 'false', termino:'si'});
      });*/
    }

  }


  render() {
    //if (this.state.valoraciones.length > 0) {
    console.log(this.state.termino)
    console.log(this.state.userok)
    if (this.state.termino==='si' && this.state.userok==='true') {
      
      var ciudad = valoracionesObtenidas.address.city
      console.log('esto es un console log')
      console.log(ciudad)

      var status = valoracionesObtenidas.status.site_status
      console.log(valoracionesObtenidas)
      console.log(valoracionesObtenidas.status)
      var level_id = valoracionesObtenidas.seller_reputation.level_id

      var seller_status = valoracionesObtenidas.seller_reputation.power_seller_status
      console.log(seller_status)

      var transacciones_canceladas = valoracionesObtenidas.seller_reputation.transactions.canceled

      var transacciones_completadas = valoracionesObtenidas.seller_reputation.transactions.completed

      var transacciones_periodo = valoracionesObtenidas.seller_reputation.transactions.period

      var transacciones_total = valoracionesObtenidas.seller_reputation.transactions.total

      //var transacciones_rating = valoracionesObtenidas.seller_reputation.transactions.ratings

      var nombreDelUsuario = valoracionesObtenidas.nickname

      var fechaDeRegistro = valoracionesObtenidas.registration_date

      var pais = valoracionesObtenidas.country_id

      var tipoDeUsuario = valoracionesObtenidas.user_type

      var puntos = valoracionesObtenidas.points

      var idDelSitio = valoracionesObtenidas.site_id
    }
    /*if (unavariablequemeindicaquetodoanduvomal = 1) {
      var elMensajeDeError = <p>Se rompió todo</p>;
    } else {
      var elMensajeDeError = <p>funca</p>
    }*/
    if (this.state.userok === ''){
      var unavariable = <div>...</div>
    }else if(this.state.userok === 'false') {
      unavariable = <Alert variant='warning'>NO HAY UN USUARIO CON ESE NOMBRE!</Alert>
    }else{
      unavariable = <Alert variant='success'>USUARIO ENCONTRADO CORRECTAMENTE</Alert>
    }
    return (
      
      <div>

        <div style={{textAlign: 'center', padding:'10px'}}>
          <form onSubmit= {this.handleInputSubmit}>
            <label htmlFor="new-todo">
              Vendedor:
            </label>
            <input
              id="new-todo"
              onChange={this.handleInputChange}
              value={this.state.text}>
            </input>
            <button>
              Buscar
            </button>
          </form>
        </div>

        <div>
          {unavariable}
        </div>

        <table class="tabla">
          <tr>
            <th>Datos de la Empresa</th>
            <th></th>
          </tr>
          <tr>
            <td>Nombre de la empresa</td>
            <td>{nombreDelUsuario}</td>
          </tr>
          <tr>
            <td>Fecha de registro</td>
            <td>{fechaDeRegistro}</td>
          </tr>
          <tr>
            <td>País</td>
            <td>{pais}</td>
          </tr>
          <tr>
            <td>Ciudad</td>
            <td>{ciudad}</td>
          </tr>
          <tr>
            <td>Tipo de usuario</td>
            <td>{tipoDeUsuario}</td>
          </tr>
          <tr>
            <td>Puntos</td>
            <td>{puntos}</td>
          </tr>
          <tr>
            <td>ID del sitio</td>
            <td>{idDelSitio}</td>
          </tr>
          <tr>
            <td>Estado del sitio</td>
            <td>{status}</td>
          </tr>
        </table>

        <table class="tabla">
          <tr>
            <th>Reputación del usuario</th>
            <th></th>
          </tr>
          <tr>
            <td>Nivel</td>
            <td>{level_id}</td>
          </tr>
          <tr>
            <td>Estado del vendedor</td>
            <td>{seller_status}</td>
          </tr>
        </table>

        <table class="tabla">
          <tr>
            <th>Ventas</th>
            <th></th>
          </tr>
            <td>Canceladas</td>
            <td>{transacciones_canceladas}</td>
          <tr>
            <td>Completadas</td>
            <td>{transacciones_completadas}</td>
          </tr>
          <tr>
            <td>Periodo</td>
            <td>{transacciones_periodo}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{transacciones_total}</td>
          </tr>
        </table>
      </div>
    );    
  }
}

export default valoracionesApp;