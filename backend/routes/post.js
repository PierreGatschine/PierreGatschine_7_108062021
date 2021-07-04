/** @format */
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/posts");

router.get("/", postsCtrl.getAllPosts);
router.post("/", postsCtrl.createPost);
router.put("/:id", auth, multer, postsCtrl.updatePost);
router.delete("/:id", auth, postsCtrl.deletePost);

router.get("/likes", postsCtrl.getAllLikes);
router.post("/:id/like", postsCtrl.postLike);

router.get("/:id/comments", postsCtrl.getComments);
router.post("/:id/comments", postsCtrl.createComment);
router.put("/comments/:id", auth, postsCtrl.updateComment);
router.delete("/comments/:id", auth, postsCtrl.deleteComment);

module.exports = router;
