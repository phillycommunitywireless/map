import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { norrisSquareCenter, startingMapZoom, maxZoom, tileSize, zoomOffset, defaultMapboxUsername, defaultMapboxStyle } from '../util/constants';
import './Map.css';

function Map (): JSX.Element {

  // Read credentials and API params from .env
  const env: { [varName: string]: string|undefined } = {
    // Mapbox API
    mapboxToken: process.env.MAPBOX_TOKEN,
    mapboxUsername: process.env.MAPBOX_USERNAME ?? defaultMapboxUsername,
    mapboxStyle: process.env.MAPBOX_STYLE ?? defaultMapboxStyle,
  }
  
  const data = useStaticQuery(graphql`
  {
    allGoogleSpreadsheetCoordinates {
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
  const markerPositions: LatLngTuple[] = data.allGoogleSpreadsheetCoordinates.edges.map(edge => {
    if (edge.node.lat && edge.node.long) {
      return [edge.node.lat, edge.node.long];
    }
  }).filter(tuple => typeof tuple != 'undefined');

  return (
    <MapContainer center={norrisSquareCenter} zoom={startingMapZoom} scrollWheelZoom={true}>
      { // Use Mapbox if a token is found in .env, otherwise use OpenStreetMap
        !!env.mapboxToken
        ? <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            maxZoom={maxZoom}
            id={`${env.mapboxUsername}/${env.mapboxStyle}`}
            tileSize={tileSize}
            zoomOffset={zoomOffset}
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
