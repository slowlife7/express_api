const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const flash = require("connect-flash");
const index = require("./api/index");
const auth = require("./api/authentication");
const post = require("./api/post");
const category = require("./api/category");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "herry@#$1",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

if (process.env.DEVELOPMENT !== "true") {
  app.use(express.static(path.join(__dirname, "front", "build")));
}

app.use("/auth", auth);
app.use("/post", post);
app.use("/category", category);
app.use("/index", index);

if (process.env.DEVELOPMENT !== "true") {
  app.use("*", function(req, res, next) {
    res.sendFile(path.join(__dirname, "front", "build", "index.html"));
  });
}

const User = require("./model/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;
