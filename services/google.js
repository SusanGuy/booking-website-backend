const https = require('https');
const KEYS = require('../config');

const googleMapsClient = require('@google/maps').createClient({
  key: KEYS.GOOGLE_API_KEY,
});

module.exports = {
  fetchGoogleAutoCompleteAPI: (req, res, logger) => {
    const input = req.body.place;

    logger.log({
      level: 'info',
      message: `fetchGoogleAutoCompleteAPI. Start fetching for: ${input}`,
    });

    https
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
          KEYS.GOOGLE_API_KEY
        }&input=${input}`,
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
        logger.log({
          level: 'error',
          message: err.message,
        });
        res.json(err.message);
      });
  },
  fetchGoogleAPI: (req, res) => {
    const location = req.body.location;

    // Geocode an address.
    googleMapsClient.places(
      {
        location: location,
      },
      (err, response) => {
        if (!err) {
          const googleRes = response.json.results;
          res.json(googleRes);
        }
      }
    );
  },
};
