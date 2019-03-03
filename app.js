const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// OAuth 2.0 setup
require('./services/passport');

/**
 * EXPRESS APP SETUP
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * DATABASE CONNECTION SETUP
 */
const connection = require('./services/database');
connection.connect(function(err) {
  // If connection to DB returns error
  // then prevent server from starting
  if (err) {
    console.error('Error connecting:' + err.stack);
    return;
  }

  /**
   * ROUTES
   */
  require('./routes')(app, connection);

  /**
   * START THE SERVER
   */
  app.listen(PORT, () => {
    console.log('Server start at Port: ' + PORT);
  });
});
