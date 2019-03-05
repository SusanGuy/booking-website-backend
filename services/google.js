const KEYS = require('../config');

const googleMapsClient = require('@google/maps').createClient({
  key: KEYS.GOOGLE_API_KEY,
});

module.exports = {
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
