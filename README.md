# PCW Map

This project uses [Leaflet](https://leafletjs.com/) and [react-leaflet](https://react-leaflet.js.org/) to render a map of our communtiy network.

## Running the app

Make sure you have Docker and Docker Compose installed, then run
```
docker-compose up -d
```

View the app at http://localhost:3000 in your browser. Changes to local files in `src` should be reflected immediately. 

You'll need to rebuild the app if you change your `.env` or any of your Docker config:
```
docker-compose up --build -d
```

To kill the server, run
```
docker-compose down
```

## Google Sheets API

This demo currently calls the Google Sheets API using an [API key](https://support.google.com/googleapi/answer/6158862?hl=en), which allows reading publicly viewable sheets but not private ones. In the future we'll want to run this part server-side.

Create a `.env` file at the root of your project and add these contents:

```
REACT_APP_GOOGLE_KEY=<your Google API key>
REACT_APP_GOOGLE_SPREADSHEET_ID=<the spreadsheet ID>
REACT_APP_GOOGLE_SHEET_NAME=Sheet1 (or your sheet name)
```

You can use the ID from [this public spreadsheet](https://docs.google.com/spreadsheets/d/1icwadnhT-_PWiO-RDCoHOnmVrFjRhRDTd0HZNx-JqK8/edit#gid=0) for testing: `1icwadnhT-_PWiO-RDCoHOnmVrFjRhRDTd0HZNx-JqK8`

## Mapbox API

To use Mapbox tiles instead of the default (OpenStreetMap), you'll need to create a [Mapbox account](https://account.mapbox.com/auth/signup/) and generate an [access token](https://docs.mapbox.com/api/accounts/tokens/). The default token that comes with every new account should work. 

Add the following variable to your `.env`:

```
REACT_APP_MAPBOX_TOKEN=<your token>
```

### Custom style

If you want to use a [Mapbox style](https://docs.mapbox.com/studio-manual/reference/styles/) you created in your account, then also add: 

```
REACT_APP_MAPBOX_USERNAME=<your username>
REACT_APP_MAPBOX_STYLE=<your style id>
```
