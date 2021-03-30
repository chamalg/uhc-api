const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "uhc_db"
});

connection.connect(error => {
  if (!!error) {
    console.log("Error connecting to mysql db");
  } else {
    console.log("Connected to mysql db");
  }
});

module.exports = connection;
