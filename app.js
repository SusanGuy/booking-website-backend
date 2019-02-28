const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * DATABASE CONNECTION
 */
const connection = mysql.createConnection({
  host: 'myapp.chzzw5vv4mkw.us-east-2.rds.amazonaws.com',
  database: 'APP',
  user: 'ssubedi1',
  password: 'MYAPP123',
});
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting:' + err.stack);
    return;
  }
  console.log('Connected');
});

/**
 * ROUTES
 */
require('./routes')(app, connection);

/**
 * START THE SERVER
 */
app.listen(PORT, () => {
  console.log('SERVER STARTED at port 3000');
});
