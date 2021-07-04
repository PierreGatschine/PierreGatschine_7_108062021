/** @format */
require("dotenv").config({ path: "./config/.env" });

const jwt = require("jsonwebtoken");
const Moderation = require("../models/Moderation.js");

const moderations = new Moderation();

const tokenRandom = process.env.TOKEN_RANDOM;

exports.getAllPosts = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const mod = decodedToken.moderation;
  if (mod == 1) {
    moderations.getAllPosts().then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const mod = decodedToken.moderation;
  console.log(mod);
  if (mod == 1) {
    const postId = req.params.id;
    let sqlInserts = [postId];
    moderations.deletePost(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.getAllComments = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const mod = decodedToken.moderation;
  if (mod == 1) {
    moderations.getAllComments().then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const mod = decodedToken.moderation;
  if (mod == 1) {
    const commentId = req.params.id;
    let sqlInserts = [commentId];
    moderations.deleteComment(sqlInserts).then((response) => {
      res.status(200).json(JSON.stringify(response));
    });
  } else {
    res.status(400).json({ error: "Requête non authorisée" });
  }
};
