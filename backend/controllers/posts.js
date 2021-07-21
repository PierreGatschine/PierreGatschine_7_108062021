/** @format */
require("dotenv").config({ path: "./config/.env" });

const jwt = require("jsonwebtoken");
const Posts = require("../models/Posts.js");
const fs = require("fs");

const posts = new Posts();

const tokenRandom = process.env.TOKEN_RANDOM;



exports.getAllPosts = (req, res) => {
  posts.getAllPosts().then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};

exports.createPost = (req, res) => {
  /* let fileImage = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;  */
  let fileImage = req.file ? req.file.filename : null; 
  console.log("media:", fileImage);
  const { title, userId, content, media_url } = req.body;
  let sqlInserts = [userId, title, content, media_url, fileImage];
  console.log("sqlInserts:", sqlInserts);
  /* sqlInserts.file = req.file ? req.file.filename : null; */
  console.log("images: ", sqlInserts[4]);
  posts.createPost(sqlInserts).then((response) => {
    res.status(201).json(JSON.stringify(response));
  });
};

exports.updatePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  const { title, content, media_url } = req.body;
  const postId = req.params.id;
  let sqlInserts1 = [postId];
  let sqlInserts2 = [title, content, media_url, postId, userId];
  posts
    .updatePost(sqlInserts1, sqlInserts2)
    .then((response) => {
      res.status(201).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(JSON.stringify(error));
    });
};
exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  const postId = req.params.id;
  let sqlInserts1 = [postId];
  let sqlInserts2 = [postId, userId];
  posts
    .deletePost(sqlInserts1, sqlInserts2)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(JSON.stringify(error));
    });
};

exports.getComments = (req, res) => {
  const postId = req.params.id;
  let sqlInserts = [postId];
  posts.getComments(sqlInserts).then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.createComment = (req, res) => {
  const { userId, content } = req.body;
  const postId = req.params.id;
  let sqlInserts = [userId, postId, content];
  posts.createComment(sqlInserts).then((response) => {
    res.status(201).json(JSON.stringify(response));
  });
};

exports.updateComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  const content = req.body.content;
  const commentId = req.params.id;
  let sqlInserts1 = [commentId];
  let sqlInserts2 = [content, commentId, userId];
  posts
    .updatePost(sqlInserts1, sqlInserts2)
    .then((response) => {
      res.status(201).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(JSON.stringify(error));
    });
};
exports.deleteComment = (req, res) => {
  const commentId = req.params.id;
  let sqlInserts = [commentId];
  posts.deleteComment(sqlInserts).then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.deleteComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  const commentId = req.params.id;
  let sqlInserts1 = [commentId];
  let sqlInserts2 = [commentId, userId];
  posts
    .deletePost(sqlInserts1, sqlInserts2)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(JSON.stringify(error));
    });
};

exports.getAllLikes = (req, res) => {
  posts.getAllLikes().then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.postLike = (req, res) => {
  const { userId, nbLikes, postId } = req.body;
  let sqlInserts1 = [postId, userId];
  let sqlInserts2 = [nbLikes, postId];
  posts
    .postLike(sqlInserts1, sqlInserts2, req.body.liked)
    .then((response) => {
      res.status(201).json(JSON.stringify(response));
    });
};
