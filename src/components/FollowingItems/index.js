import React, { Component } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-light-accordion/demo/css/index.css';
import Cookies  from 'universal-cookie'; 


var cookie = new Cookies;

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

class FollowingItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
    
          empty: true,
          items: []
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }
      
    componentWillMount(){    

        this.handlePage();

    }

    componentDidMount(){

        var i = 0;
        while(i<10) {console.log('Wait for handlePage');i++;}

    }

    handlePage(){

        fetch('https://pruebaenreact.azurewebsites.net/MLHuergo/items/getFollowed', { 
      
            method: 'POST',
            body: JSON.stringify({
              token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))
            }),
            headers:{
              'Content-Type': 'application/json',
            }
        
        })
        .then(res => {

            var itemId = [];
            res.json().then(data => {
                
                console.log(data);
                data.map(function(citem, i){
    
                    itemId.push(citem._itemId);
    
                });
                console.log(itemId);
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
                        this.setState({items: data});
                        if(localStorage.getItem('first') == undefined){

                            localStorage.setItem('first', 'false');
                            window.location.reload();

                        }

                    })
    
                }).catch(function (err){console.log(err)})
                
            });

        })
        .catch(function (err){
            console.log(err);
        })

    }

    itemList() {

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

    render(){
        
        return(

            <div className="FollowingItems">

                <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Productos seguidos por el usuario.&nbsp;</p>
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

        );

    }

    onClick(e){
        e.preventDefault();
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

export default FollowingItems;