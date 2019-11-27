// Dependencies
import React, { Component } from 'react';
import './InterfazVenCat.css';
import Cookies  from 'universal-cookie'; 

var cookie = new Cookies;
class VenCat extends Component {

  componentDidMount() {      

    fetch('https://pruebaenreact.azurewebsites.net/VenCat')
      .then(function (res) { 
        
        console.log(res);

      })

  }
  render() {

    return (

      <div className="VenCat">

        <h1 style={{textAlign: 'center'}} class = "titulo" >Vendedores x Categoría</h1>
        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Proporcion de vendedores con respecto a las categorias.&nbsp;</p>

      </div>

    );

  }

}

export default VenCat;