// Dependencies
import React, { Component } from 'react';
import { parse } from 'query-string';

var url = 'https://api.mercadolibre.com/oauth/token?';


var options = {
   form: {
    "grant_type":"authorization_code",
    "client_id": '4069477448135367',
    "client_secret": 'eqaPB8Ot1neu4JVVGyqDu5tPorwvmlh2',
    "redirect_uri": "http://localhost:3000/logued_in",
    "code": ""
   },
   method: "POST", 
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' 
   }
};

class LoguedIn extends Component {

  componentDidMount(){

    const URLSearchParams = window.URLSearchParams;

    var burl = new URLSearchParams();

    burl.append("grant_type","authorization_code")
    burl.append("client_id", '4069477448135367')
    burl.append("client_secret", 'eqaPB8Ot1neu4JVVGyqDu5tPorwvmlh2',)
    burl.append("code",parse(this.props.location.search).code);
    burl.append("redirect_uri",options.form.redirect_uri)

    var aurl = url + burl

    fetch(aurl,options)
      .then(function(response){ 
        return response.json()
          .then(function(data) {
            var token = data;
            localStorage.setItem('token',JSON.stringify(token));
            console.log(token)    
          })
          .catch(function(error) {
          console.log('Fetch Error:', error);
        });
    });
  }

  render() {
    return (
      <div className="LoguedIn">
        <h1 style={{textAlign: 'center'}}>CONTACT PAGE</h1>
        <button style={{textAlign: 'center',display: 'block',marginLeft: 'auto',marginRight: 'auto',height: '10%', width: '10%'}}>Mapa</button>
      </div>
    );
  }
  
}

export default LoguedIn;