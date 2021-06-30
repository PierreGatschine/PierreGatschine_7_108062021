/** @format */

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const postsCtrl = require("../controllers/posts");

router.get("/", postsCtrl.getAllPosts);
router.post("/", postsCtrl.createPost);
router.put("/:id", auth, postsCtrl.updatePost);
router.delete("/:id", auth, postsCtrl.deletePost);

router.get("/likes", auth, postsCtrl.getAllLikes);
router.post("/:id/like", auth, postsCtrl.postLike);

router.get("/:id/comments", auth, postsCtrl.getComments);
router.post("/:id/comments", auth, postsCtrl.createComment);
router.put("/comments/:id", auth, postsCtrl.updateComment);
router.delete("/comments/:id", auth, postsCtrl.deleteComment);

module.exports = router;
