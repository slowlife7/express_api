const express = require("express");
const category = require("./category.ctrl");
const router = express.Router();
router.get("/", category.show);
router.get("/:title", category.showByTitle);

module.exports = router;
