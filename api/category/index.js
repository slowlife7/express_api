const express = require("express");
const category = require("./category.ctrl");
const router = express.Router();

router.get("/:title", category.show);

module.exports = router;