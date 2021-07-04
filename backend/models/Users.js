/** @format */
require("dotenv").config({ path: "./config/.env" });

const mysql = require("mysql2");
const connection = require("./db-config");
const bcrypt = require("bcrypt"); // A library to help you hash passwords
const jwt = require("jsonwebtoken"); // An implementation of JSON Web Tokens

const tokenRandom = process.env.TOKEN_RANDOM;

class Users {
  constructor() {}

  signup(sqlInserts) {
    let sql =
      "INSERT INTO users VALUES (NULL, ?, ?, ?, ?, NULL)";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) reject({ error: "Erreur dans l'inscription" });
        resolve({ message: "Compte créé !" });
      });
    });
  }

  login(sqlInserts, password) {
    let sql = "SELECT * FROM users WHERE email = ?";
    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) reject({ err });
        if (!result[0]) {
          reject({ error: "Utilisateur introuvable !" });
        } else {
          bcrypt
            .compare(password, result[0].password)
            .then((valid) => {
              if (!valid) return reject({ error: "Mot de passe incorrect !" });
              resolve({
                userId: result[0].id,
                token: jwt.sign(
                  { userId: result[0].id, role: result[0].role },
                  tokenRandom,
                  { expiresIn: "24h" }
                ),
                role: result[0].role,
              });
            })
            .catch((error) => reject({ error }));
        }
      });
    });
  }

  seeMyProfile(sqlInserts) {
    let sql = "SELECT firstname, lastname, email FROM users WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) return reject({ error: "page indisponible" });
        resolve(result);
      });
    });
  }

  updateUser(sqlInserts) {
    let sql =
      "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) return reject({ error: "fonction indisponible" });
        resolve({ message: "Informations mises à jour !" });
      });
    });
  }

  deleteUser(sqlInserts) {
    let sql = "DELETE FROM users WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve, reject) => {
      connection.query(sql, function (err, result) {
        if (err) return reject({ error: "fonction indisponible" });
        resolve({ message: "Utilisateur supprimé" });
      });
    });
  }
}

module.exports = Users;
