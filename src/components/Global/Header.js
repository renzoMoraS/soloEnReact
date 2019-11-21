// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import logo from './images/logo.png';
import './css/Header.css';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  render(){

    //const { title, items} = this.props;
    return (

      <div className="Header">

        <div className="Logo">

          <img src={logo} className="App-logo" alt="logo" />
          <ul className="Menu">

            <li><a href="/">Home</a></li>
            <li><button>Mi Negocio ></button>

              <ul className="dropdown">

                <li><a href="/BMap">Mapa de Compradores</a></li>
                <li><a href="/cattime">Ventas X Categoria</a></li>
                <li><a href="/distexp">Ventas X Exposición</a></li>
                <li><a href="/Ventas">Ventas X Fecha</a></li>
                <li><a href="/Preguntas">Preguntas recibidas</a></li>
              </ul>

            </li>
            <li><button>Competencia ></button>

              <ul className="dropdown">
                <li><a href="/valoraciones">Valoraciones</a></li>
                <li><a href="/Buscador">Productos</a></li>
                <li><a href="/MisPublis">Comparacion</a></li>
                <li><button>Seguimiento ></button>

                  <ul className="dropdown">

                    <li><a href="/FollowingItems">Productos</a></li>
                    <li><a href="/FollowingSellers">Vendedores</a></li>

                  </ul>

                </li>

              </ul>

            </li>
            <li><button>Mercado ></button>

              <ul className="dropdown">

                <li><a href="/Tencat">Ventas X Categoria</a></li>
                <li><a href="/Vencat">Vendedores X Categoria</a></li>

              </ul>

            </li>

          </ul>

        </div>

      </div>

    );

  }

}
//{items && items.map((item, key) => <li key={key}><Link to={item.url}>{item.title}</Link></li>)}

export default Header;
