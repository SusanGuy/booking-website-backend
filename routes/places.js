const googleService = require('../services/google');

module.exports = app => {
  app.get('/google/places/autocomplete', (req, res) =>
    googleService.fetchGoogleAutoCompleteAPI(req, res)
  );
  app.get('/google/places', (req, res) =>
    googleService.fetchGoogleAPI(req, res)
  );
};
