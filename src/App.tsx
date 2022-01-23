import { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

function App () {

  // Read credentials and API params from .env
  const env: { [varName: string]: string|undefined } = {
    // Mapbox API
    mapboxToken: process.env.REACT_APP_MAPBOX_TOKEN,
    mapboxUsername: process.env.REACT_APP_MAPBOX_USERNAME || "mapbox",
    mapboxStyle: process.env.REACT_APP_MAPBOX_STYLE || "streets-v11",
    // Google Sheets API
    // googleEmail: process.env.REACT_APP_GOOGLE_EMAIL, // If using a Google Service Account
    googleKey: process.env.REACT_APP_GOOGLE_KEY, // ?.replace(/\\n/g, '\n'), // If using PGP key
    googleSpreadsheetID: process.env.REACT_APP_GOOGLE_SPREADSHEET_ID,
    googleSheetName: process.env.REACT_APP_GOOGLE_SHEET_NAME,
  }

  const [markerPositions, setMarkerPositions]: any[] = useState([])
  
  // Fetch data on component mount
  useEffect(() => {
    // Async IIFE to allow await syntax
    (async () => {
      try {
        const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${env.googleSpreadsheetID}/values/${env.googleSheetName}!A:B?key=${env.googleKey}`);
        const data = await res.json();
        const values = data.values.slice(1); // Remove header row
        setMarkerPositions([...markerPositions, ...values]);
      } catch (err: any) {
        console.error(err);
        console.error('Request to Google Sheets API failed. You may need to add an API key, spreadsheet id, and sheet id to your .env and re-run. See https://github.com/phillycommunitywireless/map#readme.')
      }
    })();
  }, []);

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
      { // Loop through markers fetched from the spreadsheet
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

export default App;
