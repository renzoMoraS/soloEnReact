// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-light-accordion/demo/css/index.css';
import "bootstrap";
import { Card, CardImg, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import Cookies  from 'universal-cookie'; 

var cookie = new Cookies();

function startFollowing(item) {

  console.log(item);
  item = JSON.stringify(item);
  fetch('https://pruebaenreact.azurewebsites.net/items/startFollowing', { 
      
    method: 'POST',
    body: JSON.stringify({
      item: item,
      token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
    }),
    headers:{
      'Content-Type': 'application/json',
    }

  })

}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

const Item = props => (
  <tr>
    <td>      
      <a href={props.item.Link}>Ver</a>
    </td>
    <td >{props.item.Nombre}</td>
    <td>
      <Link to="/buscador">
        <span onClick={() => startFollowing(props.item)}>${props.item.Precio}</span>
      </Link>
    </td>
  </tr>
)


class Buscador extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {

      render: true,
      text: '',
      items: [],
      popoverOpen: false,
      first: false,
      userok: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFollow = this.handleFollow.bind(this);

  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  componentWillMount() {


    fetch('https://pruebaenreact.azurewebsites.net/items/searchItems/' + localStorage.getItem('seller'))
      .then(res => {

        res.json().then(data => {

          if (!isEmptyObject(data)) this.setState({ items: data, userok: 'true'});

        })
      
      })
      .catch(function (err) {
        console.log(err);
      })
      if(!this.state.first) this.setState({userok: 'false'}); else this.setState({first: false});

  }

  itemList() {

    return this.state.items.map(function (citem, i) {
      return <Item item={citem} key={i} />;
    })

  }

  render() {

    var alerta;
    if (this.state.userok === ''){
      alerta = <div className = "puntitos">...</div>
    }else if(this.state.userok === 'false') {
      alerta = <Alert variant='warning'>NO HAY UN USUARIO CON ESE NOMBRE!</Alert>
    }else{
      alerta = <Alert variant='success'>USUARIO ENCONTRADO CORRECTAMENTE</Alert>
    }
    return (

      <div className="Buscador">

        <div align = "center" >

          <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="new-todo">
              Usuarios:
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <Button id="Popover1" type="button">¿?</Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader>¿Cómo buscar tiendas oficiales?</PopoverHeader>
              <Card>
                  <CardImg top width="100%" src ="https://i.imgur.com/H3pRjHy.gif" alt="Carrrrs" />
            </Card>
              <PopoverBody><div class="media-body"><p></p><p>1. En la página del producto, diríjase hasta encontrar la información de la tienda. Cliquee en "Ver más datos de (Nombre de la tienda)". </p> <p> 2. Introduzca el nombre de la tienda que figura en la URL de la página (remarcado en celeste) dentro del cuadro de búsqueda.</p> </div></PopoverBody>
            </Popover>
            
          </form>
          <Link to="/buscador">
            <span className="btn btn-warning" onClick={this.handleSubmit}>
              Buscar productos
            </span>
          </Link>
          <Link to="/buscador">
            <span className="btn btn-warning" onClick={this.handleFollow}>
              Seguir vendedor
            </span>
          </Link>
        </div>
        <div className="alerta">
          {alerta}
        </div>
        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Productos de usuarios por busqueda.&nbsp;</p>
        <table className="table" style={{ marginTop: 20 }}>

          <thead>

            <tr>

              <th>Publicacion</th>
              <th>Nombre</th>
              <th>Seguir</th>

            </tr>

          </thead>
          <tbody>
            {this.itemList()}
          </tbody>

        </table>

      </div>

    );

  }

  onClick(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {

    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    var username = this.state.text;

    localStorage.setItem('seller', username);
    window.location.reload()

  }

  handleFollow(e) {

    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/FollSell/add', { 
      
      method: 'POST',
      body: JSON.stringify({
        name: this.state.text,
        token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
      }),
      headers:{
        'Content-Type': 'application/json',
      }
  
    }
    ).then(function () { window.location.reload(); })
    .catch(function(err){console.log(err)})

  }

}

export default Buscador;