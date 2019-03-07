const jwt = require('jsonwebtoken');
const KEYS = require('../config');

let createToken = auth => {
  return jwt.sign(
    {
      user_id: auth.user_id,
    },
    KEYS.AUTH_TOKEN_KEY,
    {
      expiresIn: 60 * 120,
    }
  );
};

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
};
