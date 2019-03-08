const googleService = require('../services/google');

module.exports = ({ app, logger }) => {
  app.post('/google/places/autocomplete', (req, res) => {
    googleService.fetchGoogleAutoCompleteAPI(req, res, logger);
  });
  app.get('/google/places', (req, res) =>
    googleService.fetchGoogleAPI(req, res, logger)
  );
};
