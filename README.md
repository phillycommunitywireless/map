# PCW Map

This project uses [Gatsby](https://www.gatsbyjs.com/) and [React](https://reactjs.org) alongside [Leaflet](https://leafletjs.com/) and [react-leaflet](https://react-leaflet.js.org/) to render a map of our community network.

## Running the app

First, install project dependencies with 
```
npm install
```

To start the development server, run 
```
npm start
```

View the app at http://localhost:8000 in your browser.

To build the app into a static site in the `/public` folder, run
```
npm run build
```

Restart the development server in order to re-run any data sourcing queries. 

## Google Sheets data

We store geolocation data in a private Google Sheet and use [gatsby-source-google-spreadsheet](https://github.com/sondrele/gatsby-source-google-spreadsheet) to query the Sheets API at build-time. The received data is loaded into Gatsby's "data layer" and can be queried in React using GraphQL. A GUI interface for exploring the GraphQL layer can be visited on the development server at https://localhost:8000/__graphiql.

### Credentials

In order for this data sourcing to work, you need three environment variables set in a `.env` file at the root of the project:

```bash
# /.env

GOOGLE_SPREADSHEET_ID=<Google sheet id>
GOOGLE_PRIVATE_KEY=<Google PGP private key>
GOOGLE_CLIENT_EMAIL=<Google client email>
```

* `GOOGLE_SPREADSHEET_ID` 
  
  Can be found in the URL of the Google sheet in question. You can use the ID from [this public spreadsheet](https://docs.google.com/spreadsheets/d/1icwadnhT-_PWiO-RDCoHOnmVrFjRhRDTd0HZNx-JqK8/edit#gid=0) for testing: `1icwadnhT-_PWiO-RDCoHOnmVrFjRhRDTd0HZNx-JqK8`


* `GOOGLE_PRIVATE_KEY` and `GOOGLE_CLIENT_EMAIL`

  Provided as credentials for a [Google Service Account](https://support.google.com/a/answer/7378726?hl=en). To source private PCW data, you'll need to get these credentials from someone on the project. 

## Mapbox API

To use Mapbox tiles instead of the default (OpenStreetMap), you'll need to create a [Mapbox account](https://account.mapbox.com/auth/signup/) and generate an [access token](https://docs.mapbox.com/api/accounts/tokens/). The default token that comes with every new account should work. 

Add the following variable to your `.env`:

```
GATSBY_MAPBOX_TOKEN=<your token>
```

The `GATSBY_` prefix is required to use environment variables in client-side code.

### Custom style

If you want to use a [Mapbox style](https://docs.mapbox.com/studio-manual/reference/styles/) you created in Mapbox Studio, then also add: 

```
GATSBY_MAPBOX_USERNAME=<your username>
GATSBY_MAPBOX_STYLE=<your style id>
```
