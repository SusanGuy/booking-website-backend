const googleService = require('../services/google');

module.exports = app => {
  app.get('/places', (req, res) => googleService.fetchGoogleAPI(req, res));
};
