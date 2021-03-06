const passport = require('passport');
const jwt = require('jsonwebtoken');
const controller = require('../controller');
const { generateToken, sendToken } = require('../services/token');
const KEYS = require('../config');

module.exports = ({ app, db, logger }) => {
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
      logger.info('/auth/google OAuth 2.0 Authentication');

      if (!req.user) {
        logger.log({
          level: 'error',
          message: 'User Not Authenticated',
        });
        return res.send(401, 'User Not Authenticated');
      }

      logger.log({
        level: 'info',
        message: `/auth/google response for JSON.stringy(${req.user})`,
      });

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
  app.post('/api/signup', (req, res) => {
    const { email, first_name, last_name, password } = req.body;

    const user = {
      email,
      first_name,
      last_name,
      password,
    };

    res.status(200).json({ data: 'success', user: user });
  });
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    logger.log({
      level: 'info',
      message: `/api/login for ${email}`,
    });

    const user = {
      first_name: 'Test',
      last_name: 'User',
    };

    /**
     * PSEUDOCODE
     */
    // Check if username, password exists in DB
    // IF exists
    // return user, with SUCCESS
    // Store JWT
    // ELSE
    // return error, status 200
    // res.status(200).send('User does not exist');

    res.status(200).json({ data: user });
  });
  app.post('/auth/verify', (req, res) => {
    let token = req.body.token;

    logger.log({
      level: 'info',
      message: `/auth/verify response for: ${token}`,
    });

    if (token) {
      jwt.verify(token, KEYS.AUTH_TOKEN_KEY, (err, decoded) => {
        if (err) {
          logger.log({
            level: 'error',
            message: `/auth/verify error: 'Error verifying token. ${err}`,
          });

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
          logger.log({
            level: 'error',
            message: `/auth/verify error: 'Error decoding token.'`,
          });

          res.status(403).json({ message: 'Error decoding token.' });
        }
      });
    } else {
      logger.log({
        level: 'error',
        message: `/auth/verify error: Missing parameter 'token'`,
      });

      res.status(403).send("Missing parameter 'token'");
    }
  });
};
