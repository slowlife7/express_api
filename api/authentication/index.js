const express = require('express');
const auth = require('./auth.ctrl');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), auth.login);

module.exports = router;
