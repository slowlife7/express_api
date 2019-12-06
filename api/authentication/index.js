const express = require("express");
const auth = require("./auth.ctrl");
const router = express.Router();
const User = require("../../model/User");
const passport = require("passport");

router.post("/login", auth.login(passport));
router.post("/register", auth.register(passport, User));

module.exports = router;
