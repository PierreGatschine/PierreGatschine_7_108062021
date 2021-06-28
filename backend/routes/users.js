/** @format */

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const limiter = require("../middleware/limiter");
const usersCtrl = require("../controllers/users");

router.post("/signup", limiter, usersCtrl.signup);
router.post("/login", limiter, usersCtrl.login);
router.get("/", auth, usersCtrl.seeMyProfile);
router.delete("/", auth, usersCtrl.deleteUser);
router.put("/", auth, usersCtrl.updateUser);

module.exports = router;

