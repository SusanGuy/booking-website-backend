const passport = require('passport');
const jwt = require('jsonwebtoken');
const controller = require('../controller');
const { generateToken, sendToken } = require('../services/token');
const KEYS = require('../config');

module.exports = (app, db) => {
  /**
   * PASSPORT SETUP
   * This section we pass in the website's
   * configuration to Google OAuth 2.0 API (Google+ API).
   *
   * This is all done in "console.developers.google.com"
   *
   */
  app.post(
    '/auth/google',
    passport.authenticate('google-token', {
      session: false,
    }),
    (req, res, next) => {
      if (!req.user) {
        return res.send(401, 'User Not Authenticated');
      }

      req.auth = {
        user_id: req.user.user_id,
      };

      next();
    },
    generateToken,
    sendToken
  );
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.post('/auth/verify', (req, res) => {
    let token = req.body.token;

    if (token) {
      jwt.verify(token, KEYS.AUTH_TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.status(403).send('Error verifying token. ' + err);
        }

        if (decoded) {
          let params = {
            path: {
              section: 'user',
              id_clause: `user_id=${decoded.user_id}`,
            },
          };
          controller.get(params, res, db);
        } else {
          res.status(403).json({ message: 'Error decoding token.' });
        }
      });
    } else {
      res.status(403).send("Missing parameter 'token'");
    }
  });
};
