// import React from 'react';
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

function App() {
  // Center of Norris Square Park
  const position: LatLngTuple = [39.98265, -75.1347];

  return (
    <MapContainer center={position} zoom={16.5} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
