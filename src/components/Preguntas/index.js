// Dependencies
import React, { Component } from 'react';
import './InterfazPreguntas.css';
import Cookies  from 'universal-cookie'; 

//var total = 0;
var cont = 0;
var cookie = new Cookies;

const Item = props => (
  <tr>
      <td>{props.data.nombre_de_usuario}</td>
      <td>{props.data.producto_nombre}</td>
      <td>{props.data.text}</td> 
      <td>{props.data.status}</td>
      <td>{props.data.date_created.substring(0,10)}</td>
  </tr>
);

function setearPreg(preg) {
  this.setState({preg: preg});
}

class Preguntas extends Component {

  constructor(props) {
    super(props)
    this.state = { preg : null, cambio : true};
    setearPreg = setearPreg.bind(this)
  }

  componentDidMount() {


    fetch('https://pruebaenreact.azurewebsites.net/preguntas',{

      method: 'POST',
      body: JSON.stringify({
          token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))

      }),
      headers:{
          'Content-Type': 'application/json',
      }

    })
    .then(function (res) { // res es un json
      return res.json()
    })
      .then(function (data) {
        data = JSON.stringify(data);// acá podes hacer cosas con res, que es la respuesta en forma de json que de dio eze}
        localStorage.setItem('preguntas',data)
        var preg = JSON.parse(localStorage.getItem('preguntas'))
        setearPreg(preg);
    })
  }

  ordenar_Usuario(){ 
    cont = cont + 1;
    
    this.state.preg.questions.sort(
      function (a, b) {
        return b.id - a.id;
      }
    );
    
    if (cont == 1){
      this.setState({cambio : false})
    }else{
      window.location.reload()
    }
  }

  ordenar_Producto(){ 
    cont = cont + 1;

    this.state.preg.questions.sort(
      function (a, b) {
        return b.item_id.localeCompare(a.item_id);
      }
    );
    
    if (cont == 1){
      this.setState({cambio : false})
    }else{
      window.location.reload()
    }
  }

  ordenar_Pregunta(){ 
    cont = cont + 1;

    this.state.preg.questions.sort(
      function (a, b) {
        return b.id - a.id;
      }
    );
    
    if (cont == 1){
      this.setState({cambio : false})
    }else{
      window.location.reload()
    }
  }


  ordenar_Estado(){ 
    cont = cont + 1;

    this.state.preg.questions.sort(
      function (a, b) {
        return a.from.answered_questions - b.from.answered_questions
      }
    );
    
    if (cont == 1){
      this.setState({cambio : false})
    }else{
      window.location.reload()
    }
  }

  ordenar_Fecha(){ 
    cont = cont + 1;

    this.state.preg.questions.sort(
      function (a, b) {
        return b.date_created.localeCompare(a.date_created);
      }
    );
    
    if (cont == 1){
      this.setState({cambio : false})
    }else{
      window.location.reload()
    }
  }

  itemList() {
    if(this.state.preg!=null) {
      return this.state.preg.questions.map(function(citem, i){
      
        console.log();
        if (citem.status == "ANSWERED" || citem.status == "Respondida"){
          citem.status = "Respondida";
          } else {
          citem.status = "Sin responder";
        }      
      
        console.log(citem)
        
        return <Item data={citem} key={i} />;
      
      })
    }
  }

  render() {

/*     if (this.state.preg != null){
     var total = this.state.preg.questions.length
    } */ 

    return (

      <div className = "Preguntas">

        <h1 style = {{textAlign: 'center'}} class = "titulo" > Preguntas </h1>
        
        
        <form onSubmit={this.handleSubmit}>

        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Visualizar y ordenar las preguntas recibidas.&nbsp;</p>

        </form>

       

        <table className = "table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>

              <th>
                <button onClick = {this.ordenar_Usuario.bind(this)} class = "Button User" > Ordenar por Usuario </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Producto.bind(this)} class = "Button Producto" > Ordenar por Publicación </button>
              </th>

              <th>
                <button onClick = {this.ordenar_Pregunta.bind(this)} class = "Button Pregunta" > Ordenar por Pregunta  </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Estado.bind(this)} class = "Button Estado" > Ordenar por Estado </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Fecha.bind(this)} class = "Button Fecha" > Ordenar por Fecha </button>   
              </th>

            </tr>
          </thead>  
          { <tbody class = "lista" > 
            {this.itemList()}
          </tbody> }
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
    var dato_ingresado = this.state.text;
    
/*     localStorage.setItem('seller', dato_ingresado)
    axios.get('http://localhost:8081/items/searchItems/' + dato_ingresado)
      .then(setTimeout(function () {
        window.location.reload()
      }.bind(this), 1000)); */

  }

}

export default Preguntas;