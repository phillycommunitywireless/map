// import React from 'react';
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

function App() {
  // Center of Norris Square Park
  const center: LatLngTuple = [39.98265, -75.1347];

  const mapboxToken: string|undefined = process.env.REACT_APP_MAPBOX_TOKEN;
  const mapboxUsername: string|undefined = process.env.REACT_APP_MAPBOX_USERNAME;
  const mapboxStyle: string|undefined = process.env.REACT_APP_MAPBOX_STYLE;

  return (
    <MapContainer center={center} zoom={16.5} scrollWheelZoom={true}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        maxZoom={18}
        id={`${mapboxUsername}/${mapboxStyle}`}
        tileSize={512}
        zoomOffset={-1}
        accessToken={mapboxToken}
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
