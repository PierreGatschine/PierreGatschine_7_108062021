/** @format */
const mysql = require("mysql2");
const connection = require("./db-config");

class Admin {
  constructor() {}

  getAllPosts() {
    let sql =
      "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, users.lastname, users.firstname FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
    return new Promise((resolve) => {
      connection.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  deletePost(sqlInserts) {
    let sql = "DELETE FROM posts WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve) => {
      connection.query(sql, function (err, result) {
        if (err) throw err;
        resolve({ message: "Post supprimé !" });
      });
    });
  }
  getAllComments() {
    let sql =
      "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstname, users.lastname FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
    return new Promise((resolve) => {
      connection.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  deleteComment(sqlInserts) {
    let sql = "DELETE FROM comments WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve) => {
      connection.query(sql, function (err, result) {
        if (err) throw err;
        resolve({ message: "Commentaire supprimé !" });
      });
    });
  }
}

module.exports = Admin;
