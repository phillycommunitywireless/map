import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {
  norrisSquareCenter,
  startingMapZoom,
  maxZoom,
  tileSize,
  zoomOffset,
  defaultMapboxUsername,
  defaultMapboxStyle,
} from "../util/constants";
import "./Map.css";

function Map(): JSX.Element {
  // Read credentials and API params from .env
  const env: { [varName: string]: string | undefined } = {
    // Mapbox API
    mapboxToken: process.env.GATSBY_MAPBOX_TOKEN,
    mapboxUsername: process.env.GATSBY_MAPBOX_USERNAME ?? defaultMapboxUsername,
    mapboxStyle: process.env.GATSBY_MAPBOX_STYLE ?? defaultMapboxStyle,
  };

  let {
    allGoogleSpreadsheetNodes: { edges: nodes },
    allGoogleSpreadsheetDevices: { edges: devices },
  } = useStaticQuery(graphql`
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
  `);

  nodes = nodes.map((node) => node.node);
  devices = devices.map((device) => device.node);

  console.log({ nodes });
  console.log(devices.find((d) => d.name == "UAP-AC-M"));

  return (
    <MapContainer
      center={norrisSquareCenter}
      zoom={startingMapZoom}
      scrollWheelZoom={true}
    >
      {
        // Use Mapbox if a token is found in .env, otherwise use OpenStreetMap
        !!env.mapboxToken ? (
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            maxZoom={maxZoom}
            id={`${env.mapboxUsername}/${env.mapboxStyle}`}
            tileSize={tileSize}
            zoomOffset={zoomOffset}
            accessToken={env.mapboxToken}
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        )
      }
      {
        // Render all markers
        nodes.map((node) => {
          const pos: LatLngTuple = [node.lat, node.long];
          const device = devices.find((device) => device.name == node.device);
          return (
            <Marker key={node.nodeId} position={pos}>
              <Popup>
                <h1>
                  Node {node.nodeId} ({node.nodeType.toLowerCase()} node)
                </h1>
                <h2>Device</h2>
                <p>
                  Name: {device.name} <br />
                  Range (distance): {device.signalRangeDistance}ft <br />
                  Range (angle): {device.signalRangeAngle}° <br />
                </p>
              </Popup>
            </Marker>
          );
        })
      }
    </MapContainer>
  );
}

export default Map;
