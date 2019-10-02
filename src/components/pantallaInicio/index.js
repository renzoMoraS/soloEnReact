//import React from 'react';
import React, { Component } from 'react';
import {parse} from "query-string";

var valoracionesObtenidas = '';

var options = {
  form: {
   "grant_type":"authorization_code",
   "client_id": '4069477448135367',
   "client_secret": 'eqaPB8Ot1neu4JVVGyqDu5tPorwvmlh2',
   "redirect_uri": "http://localhost:3000/",
   "code": ""
  },
  method: "POST", 
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded',
   'Accept': 'application/json' 
  }
};


var url = 'https://api.mercadolibre.com/oauth/token?';
//var unavariablequemeindicaquetodoanduvomal = "";

class valoracionesApp extends Component {
  constructor(props) {
      super(props)
      this.state = { termino: 'no', valoraciones: [], text: '', userok: ''}
  }
  

  componentWillMount(){
    if (this.props.location.search !== null) {
      return;
    }
    const URLSearchParams = window.URLSearchParams;
    
    var burl = new URLSearchParams();

    burl.append("grant_type","authorization_code")
    burl.append("client_id", '4069477448135367')
    burl.append("client_secret", 'eqaPB8Ot1neu4JVVGyqDu5tPorwvmlh2',)
    burl.append("code",parse(this.props.location.search).code);
    burl.append("redirect_uri",options.form.redirect_uri)

    var aurl = url + burl

    console.log(aurl)

    fetch('/token', {
      method: 'POST',
      body: JSON.stringify({
        "url": aurl
      }),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(function(response){ 
      return response.text()
        .then(function(data) {
          console.log(data)
        })
    });
  }

  componentDidMount() {
    fetch('/pantallaInicio',{
      method: 'POST',
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

      return (
        
        <div>

          <div className = "datos">
            <div>

              <a href="https://auth.mercadolibre.com/authorization?client_id=4069477448135367&response_type=code&state=5ca75bd30" >Loguearse con Mercadolibre</a>
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