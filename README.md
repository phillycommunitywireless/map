# PCW Map

This project uses [Leaflet](https://leafletjs.com/) and [react-leaflet](https://react-leaflet.js.org/) to render a map of our communtiy network.

## Running the development server

Make sure you have Docker and Docker Compose installed, then run:

```
docker-compose up
```

Navigate to http://localhost:3000 in your browser to view the app. Changes to local files in the `src` directory should cause the app to automatically reload.

To stop the server, run

```
docker-compose down
```

## Mapbox tiles

In order for the Mapbox tiles to display properly, you'll need to create a [Mapbox account](https://account.mapbox.com/auth/signup/) and generate an [access token](https://docs.mapbox.com/api/accounts/tokens/). The default token that comes with every new account should work. 

Create a `.env` file at the root of your project and add these contents:

```
REACT_APP_MAPBOX_TOKEN=<your token>
```

### Custom style

If you want to use a [Mapbox style](https://docs.mapbox.com/studio-manual/reference/styles/) you created in your account, then also add: 

```
REACT_APP_MAPBOX_USERNAME=<your username>
REACT_APP_MAPBOX_STYLE=<your style id>
```
