const mysql = require('mysql2');
const KEYS = require('../config');

/**
 * Amazon Web Services - RDS - MySQL
 */
const connection = mysql.createConnection({
  host: KEYS.MYSQL_HOST,
  database: KEYS.MYSQL_DB_NAME,
  user: KEYS.MYSQL_USER,
  password: KEYS.MYSQL_PASSWORD,
});
module.exports = connection;
