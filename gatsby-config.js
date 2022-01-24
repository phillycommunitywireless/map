require("dotenv").config({
  path: `.env`,
})

module.exports = {
    siteMetadata: {
      title: `PCW Map`,
      siteUrl: `https://phillycommunitywireless.org/map`,
    },
    plugins: [
      {
        resolve: 'gatsby-plugin-react-leaflet',
        options: {
          linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
        }
      },
      {
        resolve: 'gatsby-source-google-spreadsheet',
        options: {
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            credentials: {
              client_email: process.env.GOOGLE_CLIENT_EMAIL,
              private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }
        }
    },
    ]
}