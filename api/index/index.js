const express = require("express");
const index = require("./index.ctrl");
const router = express.Router();

router.get("/", index.show);
module.exports = router;
