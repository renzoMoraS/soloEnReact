// Dependencies
import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';


var complete_marker_list = {lat: {}, long: {}};
var marker_list = {lat: {0:0}, long: {0:0}};


class BMap extends Component {

  componentDidMount(){
    var token = JSON.parse(localStorage.getItem('token'));

    var url = "https://api.mercadolibre.com/orders/search?seller="+ token.user_id +"&order.status=paid&access_token="+ token.access_token;

    var cont = 0;
    var cont2 = 0;

    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].shipping.receiver_address !== undefined) {
            if (data.results[i].shipping.receiver_address.latitude !== null) {

              complete_marker_list.lat[cont] = data.results[i].shipping.receiver_address.latitude;
              complete_marker_list.long[cont] = data.results[i].shipping.receiver_address.longitude;
              cont++;
            }
          }
        }

        for (var x = 0; x < Object.keys(complete_marker_list.lat).length; x++) {

          for (var y = 0; y < Object.keys(marker_list.lat).length; y++) {

            if(complete_marker_list.lat[x] === marker_list.lat[y] && complete_marker_list.long[x] === marker_list.long[y]){
              break;

            }else if(y === Object.keys(marker_list.lat).length - 1){

              marker_list.lat[cont2] = complete_marker_list.lat[x];
              marker_list.long[cont2] = complete_marker_list.long[x];
              cont2++;
            }

          }
        }

        localStorage.setItem('markerList',JSON.stringify(marker_list));
      });
  }

  render() {
    var ml = JSON.parse(localStorage.getItem('markerList'));
    
    var makers = [];

    function makeMarkers(){
      for (var i = 0;i<Object.keys(ml.lat).length;i++){
        makers.push(<Marker position={[ml.lat[i], ml.long[i]]}><Popup>Marker</Popup></Marker>);
      }

      return makers;
    }

    return (
      <div className="BMap">
        <h1 style={{textAlign: 'center'}}>MAP PAGE</h1>
        
        <div>
          <Map style={{ display: 'block',marginLeft: 'auto',marginRight: 'auto',height: '500px', width: '700px' }} center={[-34.304573, -64.76381]} zoom={3} maxZoom={17}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup maxClusterRadius={120}>
              {makeMarkers()}
            </MarkerClusterGroup>
          </Map>
        </div>
      </div>
    );
  }
}

export default (BMap);