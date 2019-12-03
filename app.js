const express = require('express');
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const passport = require('passport');
const auth  = require('./api/authentication');
const app = express();
require('dotenv').config();

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
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use('/', auth);

const User = require('./model/User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;