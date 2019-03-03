const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const KEYS = require('./config');
const PORT = process.env.PORT || 5000;

const app = express();

// EXPRESS APP SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  // Last 30 days before it expires
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [KEYS.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// DATABASE CONNECTION SETUP
const db = require('./services/database');
db.connect(function(err) {
  // If connection to DB returns error
  // then prevent server from starting
  if (err) {
    console.error('Error connecting:' + err.stack);
    return;
  }

  // OAUTH 2.0 SETUP
  require('./services/passport')(db);

  // ROUTES
  require('./routes')(app, db);

  // START THE SERVER
  app.listen(PORT, () => {
    console.log('Server start at Port: ' + PORT);
  });
});
