import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem } from 'react-light-accordion';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies  from 'universal-cookie'; 
import 'react-light-accordion/demo/css/index.css';

var cookie = new Cookies;
var url = 'https://api.mercadolibre.com/sites/MLA/search?';

function isEmptyObject(obj){
  return !Object.keys(obj).length;
}

const Item = props => (

    <tr>

        {props.user._name}

    </tr>

)

class FollowingSellers extends Component {

    constructor(props) {
        super(props);
        this.state = {
    
          empty: true,
          items: [],
    
        };

    }
      
    componentDidMount(){    

        fetch('http://localhost:4000/MLHuergo/FollSell/searchForMe', { 
      
            method: 'POST',
            body: cookie,
            body: JSON.stringify({

                token: JSON.stringify(cookie.get("cookieQueGuardaElToken"))

            }),
            headers:{
            'Content-Type': 'application/json',
            }
    
        })
        .then(res => {
            console.log(res.body);
            if(!isEmptyObject(res.data)) this.setState({ items: res.data });
        })
        .catch(function (err){
            console.log(err);
        })
        axios.post('http://localhost:4000/MLHuergo/items/delete')

    }

    itemList() {

        return this.state.items.map(function(citem, i){
            return <Item user={citem} key={i} />
        })
    
    }

    render(){
        
        return(

            <div className="FollowingSellers">

                <p style={{color:"#7c7d7e",backgroundColor:"#ebebeb"}}>&nbsp;Vendedores seguidos por el usuario.&nbsp;</p>
                <table className="table" style={{ marginTop: 20 }}>

                    <tbody>
                        {this.itemList()}
                    </tbody>

                </table>

            </div>

        );

    }

}

export default FollowingSellers;