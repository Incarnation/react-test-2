const express = require("express");
const router = express.Router();
const User = require("../controllers/user");

//get router
router.post("/auth", User.auth);

//user Registration router
router.post("/register", User.register);

module.exports = router;
