import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'; 
import Badge from 'react-bootstrap/Badge';
import Cookies  from 'universal-cookie'; 

var cookie = new Cookies();
var valoracionesObtenidas = '';

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

    var username = this.state.text;
    localStorage.setItem('seller',username)

    if (username.length!==0) {

      fetch('https://pruebaenreact.azurewebsites.net/valoraciones',{

        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "token": JSON.stringify(cookie.get("cookieQueGuardaElToken"))
        }),
        headers:{
            'Content-Type': 'application/json',
        }
      })
      .then((response) => {

        console.log(response);
        if (response.ok) {

          var lasvaloraciones = response.json();

          lasvaloraciones.then(value => {

            valoracionesObtenidas = value
            console.log(valoracionesObtenidas)
            this.setState({termino: 'si', userok: 'true'});
            console.log('estado'+JSON.stringify(valoracionesObtenidas))

          })
          
        } else {

          this.setState({userok: 'false', termino: 'si'});

        }
      })

    }

  }


  render() {
    if (this.state.termino==='si' && this.state.userok==='true') {
      
      var ciudad = valoracionesObtenidas.address.city
      var status = valoracionesObtenidas.status.site_status
      var level_id = valoracionesObtenidas.seller_reputation.level_id
      var seller_status = valoracionesObtenidas.seller_reputation.power_seller_status
      var transacciones_canceladas = valoracionesObtenidas.seller_reputation.transactions.canceled
      var transacciones_completadas = valoracionesObtenidas.seller_reputation.transactions.completed
      var transacciones_periodo = valoracionesObtenidas.seller_reputation.transactions.period
      var transacciones_total = valoracionesObtenidas.seller_reputation.transactions.total
      var nombreDelUsuario = valoracionesObtenidas.nickname
      var fechaDeRegistro = valoracionesObtenidas.registration_date
      var pais = valoracionesObtenidas.country_id
      var tipoDeUsuario = valoracionesObtenidas.user_type
      var puntos = valoracionesObtenidas.points
      var idDelSitio = valoracionesObtenidas.site_id


      fechaDeRegistro = (JSON.stringify(fechaDeRegistro)).substring(1, 11)

      if (pais === 'AR'){
        pais = 'Argentina'
      }

      if (level_id === '5_green'){
        level_id = <Badge variant="verdecito"> </Badge>//COMPUMAR
      }else if (level_id === '4_light_green' ){
        level_id = <Badge variant="verdecito_clarito"> </Badge> //ARIEL_SANDIN2008
      }else if (level_id === '2_orange'){
        level_id = <Badge variant="naranjita"> </Badge> //CAMILAASBORNORUS
      }else if (level_id === '3_yellow'){
        level_id = <Badge variant="amarillito"> </Badge> //CONO1971
      }else if (level_id === '1_red'){
        level_id = <Badge variant="rojito"> </Badge> //VEJU2313599
      }else if (level_id === 'null'){
        level_id = '-'
      }

      if (seller_status === 'null'){
        seller_status = '-'
      }

      if (status === 'active'){
        status = 'Activo'
      }else{
        status = 'Inactivo'
      }

      if (transacciones_periodo === 'historic'){
        transacciones_periodo = 'Histórico'
      }else{
        transacciones_periodo = 'Nuevo'
      }

    }

    if (this.state.userok === ''){

      var unavariable = <div class = "puntitos">...</div>

    }else if(this.state.userok === 'false') {

      unavariable = <Alert variant='warning'>NO HAY UN USUARIO CON ESE NOMBRE!</Alert>

    }else{

      unavariable = <Alert variant='success'>USUARIO ENCONTRADO CORRECTAMENTE</Alert>

    }
    return (
      
      <div>

        <div style={{textAlign: 'center'}} class="input">
          <form onSubmit= {this.handleInputSubmit}>
            <label htmlFor="new-todo">
              Vendedor:&nbsp;
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

        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Información de usuarios por busqueda.&nbsp;</p>

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