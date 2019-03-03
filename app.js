const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// EXPRESS APP SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// DATABASE CONNECTION SETUP
const db = require('./services/database');
db.connect(function(err) {
  // If connection to DB returns error
  // then prevent server from starting
  if (err) {
    console.error('Error connecting:' + err.stack);
    return;
  }

  console.log('DB CONNECT');

  // OAUTH 2.0 SETUP
  require('./services/passport');

  // ROUTES
  require('./routes')(app, db);

  // START THE SERVER
  app.listen(PORT, () => {
    console.log('Server start at Port: ' + PORT);
  });
});
