//import React from 'react';
import React, { Component } from 'react';
//import { Alert } from 'reactstrap';
import {Alert} from 'react-bootstrap';  
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
  
  /*wrapperSetearEstado(valoracionesObtenidas) {
    this.setState((state) => {
      return {valoraciones: valoracionesObtenidas}
    })
  }*/

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
        unavariable = <div><Alert variant="warning">NO HAY UN USUARIO CON ESE NOMBRE!</Alert></div>
      }else{
        unavariable = <div><Alert variant="success">USUARIO ENCONTRADO CORRECTAMENTE</Alert></div>
      }
      return (
        
        <div>

          <div style={{textAlign: 'center', padding:'20px'}}>
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

          <div className = "datos">
            <div>
              <h4>Datos de la Empresa</h4>

              <ul>

                <li>Nombre de la empresa: {nombreDelUsuario}</li>
                <li>Fecha de registro: {fechaDeRegistro}</li>
                <li>País: {pais}</li>
                <li>Ciudad: {ciudad}</li>
                <li>Tipo de usuario: {tipoDeUsuario}</li>
                <li>Puntos: {puntos}</li>
                <li>ID del sitio: {idDelSitio}</li>
                <li>Estado del sitio: {status}</li>

              </ul>

          </div>

          <div className = "Reputacion">
            <h4>Reputación del usuario</h4>
            <ul>

              <li>Nivel: {level_id}</li>
              <li>Estado del Vendedor: {seller_status}</li>

              <h5>Transacciones</h5>
              <ul>
                
                <li>Canceladas: {transacciones_canceladas}</li>
                <li>Completadas: {transacciones_completadas}</li>
                <li>Periodo: {transacciones_periodo}</li>
                <li>Total: {transacciones_total}</li>

              </ul>

            </ul>

          </div>

        </div>
      </div>
    );    
  }
}

export default valoracionesApp;