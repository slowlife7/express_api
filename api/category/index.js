const express = require("express");
const category = require("./category.ctrl");
const router = express.Router();
router.get("/", category.show);
router.get("/:title", category.showByTitle);
router.post("/", category.create);
module.exports = router;
