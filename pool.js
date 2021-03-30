'use strict';

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "uhc_db",
  charset: 'utf8mb4',
  debug: false
});


module.exports = pool;