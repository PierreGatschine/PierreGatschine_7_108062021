/** @format */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Posts = require("../models/Posts.js");

const posts = new Posts();

const tokenRandom = process.env.TOKEN_RANDOM;

exports.getAllPosts = (req, res, next) => {
  posts.getAllPosts().then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.createPost = (req, res, next) => {
  let title = req.body.title;
  let userId = req.body.userId;
  let content = req.body.content;
  let sqlInserts = [userId, title, content];
  posts.createPost(sqlInserts).then((response) => {
    res.status(201).json(JSON.stringify(response));
  });
};
exports.updatePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let title = req.body.title;
  let content = req.body.content;
  let postId = req.params.id;
  let sqlInserts1 = [postId];
  let sqlInserts2 = [title, content, postId, userId];
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
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let postId = req.params.id;
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

exports.getComments = (req, res, next) => {
  let postId = req.params.id;
  let sqlInserts = [postId];
  posts.getComments(sqlInserts).then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.createComment = (req, res) => {
  let postId = req.params.id;
  let userId = req.body.userId;
  let content = req.body.content;
  let sqlInserts = [userId, postId, content];
  posts.createComment(sqlInserts).then((response) => {
    res.status(201).json(JSON.stringify(response));
  });
};

exports.updateComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let content = req.body.content;
  let commentId = req.params.id;
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
  let commentId = req.params.id;
  let sqlInserts = [commentId];
  posts.deleteComment(sqlInserts).then((response) => {
    res.status(200).json(JSON.stringify(response));
  });
};
exports.deleteComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, tokenRandom);
  const userId = decodedToken.userId;
  let commentId = req.params.id;
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
  let userId = req.body.userId;
  let nbLikes = req.body.nbLikes;
  let postId = req.body.postId;
  let sqlInserts1 = [postId, userId];
  let sqlInserts2 = [nbLikes, postId];
  posts
    .postLike(sqlInserts1, sqlInserts2, req.body.liked)
    .then((response) => {
      res.status(201).json(JSON.stringify(response));
    });
};
