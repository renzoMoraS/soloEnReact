// Dependencies
import React, { Component } from 'react';
import './InterfazPreguntas.css';
import Cookies  from 'universal-cookie'; 

//var total = 0;
var cont = 0;
var cookie = new Cookies;
var click = false;
var resultados_busqueda = [];
var unavariable;

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
    this.state = { preg : null, cambio : true, resultadosBusqueda: false, layer : false};
    setearPreg = setearPreg.bind(this)
    this.handleChange = this.handleChange.bind(this);
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
      localStorage.setItem('preguntas', data)
      var preg = JSON.parse(localStorage.getItem('preguntas'))
      setearPreg(preg);
  })
  }

  ordenar_Usuario(){ 
    if (this.state.preg != null){
      if (click == false){
        click = true;
        this.state.preg.questions.sort(
          function (a, b) {return b.id - a.id;}
        );
      }else{
        click = false;
        this.state.preg.questions.sort(
          function (a, b) {return a.id - b.id;}
        );
      }
    }
    this.setState({cambio : false})
  }

  ordenar_Producto(){ 
    if (this.state.preg != null){
      if (click == false){  
        click = true;
        this.state.preg.questions.sort(function (a, b) {
          return b.item_id.localeCompare(a.item_id);
        }
        );
      }else{
        click = false;
        this.state.preg.questions.sort(
          function (a, b) {
            return a.item_id.localeCompare(b.item_id);
          }
        );
      }
    }
    this.setState({cambio : false})
  }

  ordenar_Pregunta(){
    if (this.state.preg != null){
      if(click == false){
        click = true;
        this.state.preg.questions.sort(function (a, b) {
          return b.id - a.id;
        }
      );
      }else{
          click = false;
          this.state.preg.questions.sort(
            function (a, b){
              return a.id - b.id
            }     
          );  
      }
    }
    this.setState({cambio : false})
  }


  ordenar_Estado(){ 
    if (this.state.preg != null){
      if(click == false){
        click = true;
        this.state.preg.questions.sort(function (a, b){
          return a.from.answered_questions - b.from.answered_questions
        }
      );
      }else{
        click = false;
        this.state.preg.questions.sort(function (a, b){
          return b.from.answered_questions - a.from.answered_questions
        }
        );
      }
    }
    this.setState({cambio : false})
  }

  ordenar_Fecha(){ 
    if (this.state.preg != null){
      if (click == false){
        click = true;
        this.state.preg.questions.sort(function (a, b) {
          return b.date_created.localeCompare(a.date_created);
        }
        );
      }else{
        click = false;
        this.state.preg.questions.sort(function (a, b){
          return a.date_created.localeCompare(b.date_created);
        }
        );
      }
    }
    this.setState({cambio : false})
  }

  itemList() {
    if(this.state.preg != null && !this.state.resultadosBusqueda) {
      this.state.layer = false;
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
    } else if(this.state.resultadosBusqueda) {
        
      this.state.resultadosBusqueda = false;
      this.state.layer = true;

      return resultados_busqueda.map(function(citem, i){
          
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
        
      <div style={{textAlign: 'center'}} class="input">  
        <form onSubmit={this.handleSubmit} >
          
          <label htmlFor="new-todo">
                Búsqueda por pregunta: &nbsp;
          </label>
          
          <input 
            class = "buscador"
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
        
        
        <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Visualizar y ordenar las preguntas recibidas.&nbsp;</p>
      
        <div>{unavariable}</div>
      
        </form>
      </div>

        <table className = "table table-striped" style={{ marginTop: 5 }}>
          <thead>
            <tr>

              <th>
                <button onClick = {this.ordenar_Usuario.bind(this)} type = "button" class = "btn btn-outline-success" > Ordenar por Usuario </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Producto.bind(this)} type = "button" class = "btn miColor" > Ordenar x Publicación </button>
              </th>

              <th>
                <button onClick = {this.ordenar_Pregunta.bind(this)} type = "button" class = "btn btn-outline-warning" > Ordenar por Pregunta  </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Estado.bind(this)} type = "button" class = "btn btn-outline-info" > Ordenar por Estado </button>
              </th>
              
              <th>
                <button onClick = {this.ordenar_Fecha.bind(this)} type = "button" class = "btn btn-outline-light" > Ordenar por Fecha </button>   
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

    resultados_busqueda = [];
    
    this.state.preg.questions.map(function(preguntaActual, i){
      if(preguntaActual.text.includes(e.target.value) || e.target.value == ''){ //
        resultados_busqueda.push(preguntaActual)
      }
    })
    this.setState({resultadosBusqueda: true})
  }

}

export default Preguntas;

/*     localStorage.setItem('seller', dato_ingresado)
    axios.get('http://localhost:8081/items/searchItems/' + dato_ingresado)
      .then(setTimeout(function () {
        window.location.reload()
      }.bind(this), 1000)); */