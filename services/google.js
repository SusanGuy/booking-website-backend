const https = require('https');
const KEYS = require('../config');

const googleMapsClient = require('@google/maps').createClient({
  key: KEYS.GOOGLE_API_KEY,
});

module.exports = {
  fetchGoogleAutoCompleteAPI: (req, res) => {
    https
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
          KEYS.GOOGLE_API_KEY
        }&input=Oxford`,
        response => {
          let body = '';
          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', function() {
            let places = JSON.parse(body);

            res.json(places);
          });
        }
      )
      .on('error', err => {
        console.log('err', err);
      });
  },
  fetchGoogleAPI: (req, res) => {
    // Geocode an address.
    googleMapsClient.places(
      {
        location: '1600 Amphitheatre Parkway, Mountain View, CA',
      },
      function(err, response) {
        if (!err) {
          const googleRes = response.json.results;
          res.json(googleRes);
        }
      }
    );
  },
};
