import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.css';
//import './leaflet.css';

function Map (): JSX.Element {

  // Read credentials and API params from .env
  const env: { [varName: string]: string|undefined } = {
    // Mapbox API
    mapboxToken: process.env.MAPBOX_TOKEN,
    mapboxUsername: process.env.MAPBOX_USERNAME || "mapbox",
    mapboxStyle: process.env.MAPBOX_STYLE || "streets-v11",
  }
  
  const data = useStaticQuery(graphql`
  {
    allGoogleSpreadsheetSheet1 {
      edges {
        node {
          lat
          long
        }
      }
    }
  }
  `)

  // Positions of markers
  const markerPositions: LatLngTuple[] = data.allGoogleSpreadsheetSheet1.edges.map(edge => {
    return [edge.node.lat, edge.node.long];
  });

  // Center of Norris Square Park
  const mapCenter: LatLngTuple = [39.98265, -75.1347];

  return (
    <MapContainer center={mapCenter} zoom={16.5} scrollWheelZoom={true}>
      { // Use Mapbox if a token is found in .env, otherwise use OpenStreetMap
        !!env.mapboxToken
        ? <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            maxZoom={18}
            id={`${env.mapboxUsername}/${env.mapboxStyle}`}
            tileSize={512}
            zoomOffset={-1}
            accessToken={env.mapboxToken}
          />
        : <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
      }
      { // Render all markers
        markerPositions.map((pos: LatLngTuple, i: number) => (
          <Marker key={i} position={pos}>
            <Popup>
              {pos.toString()}
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  );
}

export default Map;
