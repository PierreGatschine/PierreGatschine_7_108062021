/** @format */
require("dotenv").config({ path: "./config/.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
 
const Users = require("../models/Users.js");

const users = new Users();

const tokenRandom = process.env.TOKEN_RANDOM;



exports.signup = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      let sqlInserts = [firstname, lastname, email, hash];
      users
        .signup(sqlInserts)
        .then((response) => {
          res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json(error));
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  let sqlInserts = [email];
  users
    .login(sqlInserts, password)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.seeMyProfile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  users
    .seeMyProfile(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
exports.updateUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  const { firstname, lastname, email } = req.body;
  let sqlInserts = [firstname, lastname, email, userId];
  users
    .updateUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.deleteUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  users
    .deleteUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
}; 

