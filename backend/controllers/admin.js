/** @format */
require("dotenv").config({ path: "./config/.env" });

const jwt = require("jsonwebtoken");
const Moderation = require("../models/Admin.js");

const admins = new Moderation();

const tokenRandom = process.env.TOKEN_RANDOM;

exports.getAllPosts = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const role = decodedToken.role;
  if (role == 1) {
    admins.getAllPosts().then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const role = decodedToken.role;
  console.log(role);
  if (role == 1) {
    const postId = req.params.id;
    let sqlInserts = [postId];
    admins.deletePost(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.getAllComments = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const role = decodedToken.role;
  if (role == 1) {
    admins.getAllComments().then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const role = decodedToken.role;
  if (role == 1) {
    const commentId = req.params.id;
    let sqlInserts = [commentId];
    admins.deleteComment(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
