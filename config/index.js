// Keys.js - Don't commit this
if (process.env.NODE_ENV === 'production') {
  // We are in production - return PROD set of keys
  module.exports = require('./keys/prod');
} else {
  // We are in development - return DEV set of keys
  module.exports = require('./keys/dev');
}
