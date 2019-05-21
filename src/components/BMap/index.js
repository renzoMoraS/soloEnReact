// Dependencies
import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class BMap extends Component {

  componentDidMount(){
    var token = JSON.parse(localStorage.getItem('token'));

    var url = "https://api.mercadolibre.com/orders/search?seller="+ token.user_id +"&order.status=paid&access_token="+ token.access_token;

    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].shipping.receiver_address !== undefined) {
            if (data.results[i].shipping.receiver_address.latitude !== null) {
              console.log(data.results[i].shipping.receiver_address.latitude);
              console.log(data.results[i].shipping.receiver_address.longitude);
              console.log('--------------------')  
            }
          }
        }
      })
  }

  render() {
    return (
      <div className="BMap">
        <h1 style={{textAlign: 'center'}}>MAP PAGE</h1>
        
        <div>
          <Map style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto',height: '500px', width: '700px' }} center={[51.505, -0.09]} zoom={13} maxZoom={17}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup maxClusterRadius={120}>
              <Marker position={[51.505, -0.09]}>
                <Popup>Marker 1</Popup>
              </Marker>
              <Marker position={[51.300, -0.04]}>
                <Popup>Marker 2</Popup>
              </Marker>
              <Marker position={[51.700, -0.13]}>
                <Popup>Marker 3</Popup>
              </Marker>
              <Marker position={[51.505, 0.2]}>
                <Popup>Marker 4</Popup>
              </Marker>
              <Marker position={[51.390, -0.04]}>
                <Popup>Marker 5</Popup>
              </Marker>
              <Marker position={[51.760, -0.13]}>
                <Popup>Marker 6</Popup>
              </Marker>
              <Marker position={[51.540, 0.2]}>
                <Popup>Marker 7</Popup>
              </Marker>
              <Marker position={[51.540, 0.3]}>
                <Popup>Marker 8</Popup>
              </Marker>
            </MarkerClusterGroup>
          </Map>
        </div>
      </div>
    );
  }
}

export default (BMap);