/** @format */
require("dotenv").config();
const mysql = require("mysql2");

console.log("Connexion à la base de données...");

/* const connection = mysql.createConnection({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
 */

const connection = mysql.createConnection({
  host: "localhost", // address of the server
  port: "3306", // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: "root",
  password: "T6c1-2O9t",
  database: "groupomania",
});



connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

module.exports = connection;
