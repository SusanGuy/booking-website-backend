const mysql = require('mysql');
const KEYS = require('../config');

/**
 * Amazon Web Services - RDS - MySQL
 */
const connection = mysql.createConnection({
  host: KEYS.DATABASE.HOST,
  database: KEYS.DATABASE.NAME,
  user: KEYS.DATABASE.USER,
  password: KEYS.DATABASE.PASSWORD,
});
module.exports = connection;
