// Dependencies
import React, { Component } from 'react';
import photo from './Home.jpg'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1 style={{textAlign: 'center'}}>HOME PAGE</h1>
        <img src={photo} alt="Fede Luna" style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto',height: '50%', width: '50%' }}></img>
      </div>
    );
  }
}

export default Home;