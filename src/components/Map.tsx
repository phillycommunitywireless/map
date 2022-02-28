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
    mapboxToken: process.env.GATSBY_MAPBOX_TOKEN,
    mapboxUsername: process.env.GATSBY_MAPBOX_USERNAME ?? defaultMapboxUsername,
    mapboxStyle: process.env.GATSBY_MAPBOX_STYLE ?? defaultMapboxStyle,
  }
  
  const data = useStaticQuery(graphql`
  {
    allGoogleSpreadsheetNodes {
      edges {
        node {
          nodeId
          label
          nodeType
          lat
          long
          direction
          device
        }
      }
    }
    allGoogleSpreadsheetDevices {
      edges {
        node {
          name
          signalRangeAngle
          signalRangeDistance
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

  console.log(env);

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
