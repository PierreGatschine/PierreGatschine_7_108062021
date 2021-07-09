/** @format */

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const adminCtrl = require("../controllers/admin");

router.get("/comments", auth, adminCtrl.getAllComments);
router.get("/posts", auth, adminCtrl.getAllPosts);
router.delete("/comment/:id", auth, adminCtrl.deleteComment);
router.delete("/post/:id", auth, adminCtrl.deletePost);

module.exports = router;
