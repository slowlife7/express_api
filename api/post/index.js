const express = require("express");
const post = require("./post.ctrl");
const router = express.Router();

router.get("/", post.show);
router.get("/:post_id", post.showSpecific);

module.exports = router;
