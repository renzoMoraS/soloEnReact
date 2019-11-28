import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem } from 'react-light-accordion';
import Cookies  from 'universal-cookie'; 
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-light-accordion/demo/css/index.css';

var cookie = new Cookies;
var changes = false;

const Change = props => (
    <tr>
        <td>{props.item._field}</td>
        <td>{props.item._prevValue}</td>
        <td>{props.item._nextValue}</td>
    </tr>
  )
  

function getChanges(chan){

    return chan.map(function(item, i){

        if(item._field == null) 
            return <tr key={i}><td>Este producto no tiene cambios registrados</td></tr>;
        return <Change item={item} key={i}/>;

    })

}

const Item = props => (

    <AccordionItem title={"Nombre: " + props.item._name + " Vendedor: " + props.item._seller}>

        <table className="table table-striped" style={{ marginTop: 20 }}>

            <thead>

                <tr>

                    <th>Campo</th>
                    <th>Valor Anterior</th>
                    <th>Valor Actual</th>

                </tr>

            </thead>  
            <tbody>{getChanges(props.change)}</tbody>

        </table>
            
    </AccordionItem>

)

function isEmptyObject(obj){
  return !Object.keys(obj).length;
}

function lookForItems(seller){

    localStorage.setItem('seller', seller);
    fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/items/searchSeller/' + seller, { 
        
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        }

    })  
    .then(res => res.json().then(rest => {
        
        localStorage.setItem('items', JSON.stringify(rest));
        window.location.reload();

    }))

}

const Seller = props => (

    <tr>

        <th>{props.user._name}</th>
        <td className="btnw">
            
            <Link to="/FollowingSellers">
                <span className="btn btn-warning" onClick={() => lookForItems(props.user._name)}>
                    Ver Publicaciones
                </span>
            </Link>

        </td>

    </tr>

)

class FollowingSellers extends Component {

    constructor(props) {

        super(props);
        this.state = {
    
          empty: true,
          items: [],
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
      
    componentWillMount(){    

        if(localStorage.getItem('seller') == 'null' || localStorage.getItem('seller') == null){

            fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/FollSell/searchForMe', { 
        
                method: 'POST',
                body: JSON.stringify({
                token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
                }),
                headers:{
                    'Content-Type': 'application/json',
                }

            })
            .then(res => {

                res.json().then(data => {

                    console.log(data);
                    if(!isEmptyObject(data)) this.setState({ items: data });    

                })
        
            })
            .catch(function (err){
                console.log(err);
            })
            changes = false;

        }else{

            var items = JSON.parse(localStorage.getItem('items'))
            var itemId = [];
            items.map(function(data){

                itemId.push(data._itemId);

            })
            fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/changes/getMine', { 
          
                method: 'POST',
                body: JSON.stringify({
                    itemId: itemId,
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            
            })
            .then(resp => {
                
                resp.json().then(datap => {

                    console.log(datap);
                    localStorage.setItem('changes', JSON.stringify(datap));
                    this.setState({items: items});
                    if(localStorage.getItem('first') == undefined){

                        localStorage.setItem('first', 'false');
                        window.location.reload();

                    }

                })

            }).catch(function (err){console.log(err)})
            changes = true;
            localStorage.setItem('seller', null)

        }

    }

    itemList() {

        console.log('algo');
        console.log(JSON.parse(localStorage.getItem('changes')));
        var changes = JSON.parse(localStorage.getItem('changes'));
        var aux = [];
        var first = [];
        var idAux;
        if(changes == '') changes = [];
        changes.map(function(chen, i){
            
            if(i == 0) idAux = chen._itemId;
            if(chen._itemId != idAux){
        
                aux.push(first);
                idAux = chen._itemId;
                first = [chen];

            }else first.push(chen)
        
        })
        aux.push(first);
        console.log(aux);
        var chang;
        return this.state.items.map(function(citem, i){

            console.log(aux[i])
            if(citem._itemId == aux[i][0]._itemId) chang = aux[i]; else chang = ['aux'];
            return <Item item={citem} change={chang} key={i} />;

        })
    
    }

    sellerList(){

        console.log('algo');
        return this.state.items.map(function(citem, i){
            return <Seller user={citem} key={i} />
        })

    }

    render(){

        if(changes){
        
            return(

                <div className="FollowingItems">

                    <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Productos del vendedor seguido por el usuario.&nbsp;</p>
                    <div align="center">
                        <form  onSubmit={this.handleSubmit}>
                            <button className="Acordeon" >
                                Buscar cambios 
                            </button>
                        </form>
                    </div>
                    <Accordion atomic={true}>
                        {this.itemList()}
                    </Accordion>

                </div>
    
            )

        }else{

            return(

                <div className="FollowingSellers">
    
                    <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Vendedores seguidos por el usuario.&nbsp;</p>
                    <table className="table" style={{ marginTop: 20 }}>

                        <tbody>
                            {this.sellerList()}
                        </tbody>

                    </table>

                </div>

            )

        }
        

    }

    handleSubmit(e) {

        e.preventDefault();
        var self = this;
        this.state.items.map(function(citem, i){

            citem = JSON.stringify(citem);
            fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/items/getChanges', { 
      
                method: 'POST',
                body: JSON.stringify({
                  citem: citem,
                  token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
                }),
                headers:{
                  'Content-Type': 'application/json',
                }
            
              })
            .then(res => {

                self.handlePage();


            });

        })

    }

}

export default FollowingSellers;