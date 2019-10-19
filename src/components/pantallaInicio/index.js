//import React from 'react';

//HAY QUE VER SI valoracionesOBTENIDAS DE MI MISMO TRAE LOS MISMOS DATOS QUE COMO SI FUERA DE OTRO USUARIO
//PARECE QUE NO RECONOCE ADDCRESS

import React, { Component } from 'react';
import {parse} from "query-string";

var valoracionesObtenidas = '';
var Rivar;

var options = {
  form: {
   "grant_type":"authorization_code",
   "client_id": '6722315906287226',
   "client_secret": 'su5nxkJECtvTyYp5GGVlGcy8QicnzeAI',
   "redirect_uri": "http://localhost:3000/",
   "code": ""
  },
  method: "POST", 
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded',
   'Accept': 'application/json' 
  }
};

function miFuncion(textitoQueDevolvioToken) {
  if (this.state.termino) {
    if (this.state.termino == 'si') {
      return null
    }
  }
  var val;
  fetch('/pantallaInicio', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
    }
  })
  .then((response) => {

    if (response.ok) {
      var lasvaloraciones = response.json();

      lasvaloraciones.then(value => {
        valoracionesObtenidas = value
        console.log('vieja estoy por poner todo en true')
        console.log(textitoQueDevolvioToken)
        if (textitoQueDevolvioToken==='1') {
          this.setState({ termino: 'si', valoraciones: [], text: '', userok: 'true'});
          console.log('primerif')
          console.log(textitoQueDevolvioToken)
        } else {
          this.setState({ termino: 'no', valoraciones: [], text: '', userok: 'true'});
          console.log('segundoif')
          console.log(textitoQueDevolvioToken)
        //console.log('estado'+JSON.stringify(valoracionesObtenidas))
        }
      }
      )

    } else {
      this.setState({ termino: 'no', valoraciones: [], text: '', userok: 'false'});
      console.log('elseif')
      console.log(textitoQueDevolvioToken)
    }
  })
  /*.catch(function(error) {
    unavariablequemeindicaquetodoanduvomal=<p>No Existe tal usuario</p>
    this.setState({userok: 'false', termino:'si'});
  });*/
};



var url = 'https://api.mercadolibre.com/oauth/token?';
//var unavariablequemeindicaquetodoanduvomal = "";

class valoracionesApp extends Component {
  constructor(props) {
      super(props)
      this.state = { termino: 'no', valoraciones: [], text: '', userok: 'false'};
      miFuncion = miFuncion.bind(this);
    }

  componentDidMount(){

    const URLSearchParams = window.URLSearchParams;
    
    var burl = new URLSearchParams();

    burl.append("grant_type","authorization_code")
    burl.append("client_id", '6722315906287226')
    burl.append("client_secret", 'su5nxkJECtvTyYp5GGVlGcy8QicnzeAI',)
    burl.append("code",parse(this.props.location.search).code);
    burl.append("redirect_uri",options.form.redirect_uri)

    var aurl = url + burl

    console.log(aurl)
    if (this.state.termino==='no' && this.state.userok==='false'){
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
        miFuncion('1')
      });
    }
  }
  
  
 

  render() {
    //if (this.state.valoraciones.length > 0) {
      if (this.state.termino==='si' && this.state.userok==='false') {
        miFuncion('0');
      }

      if (this.state.termino==='si' && this.state.userok==='true') {
        console.log(this.state.termino)
        console.log(this.state.userok)

        var ciudad = valoracionesObtenidas.address.city
        var status = valoracionesObtenidas.status.site_status
        var level_id = valoracionesObtenidas.seller_reputation.level_id

        var seller_status = valoracionesObtenidas.seller_reputation.power_seller_status

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

          <div class="link">
            <a href="https://auth.mercadolibre.com/authorization?client_id=6722315906287226&response_type=code&state=5ca75bd30" >Loguearse con Mercadolibre</a>
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