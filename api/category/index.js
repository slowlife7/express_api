const express = require("express");
const category = require("./category.ctrl");
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}

router.get("/", category.show);
router.get("/:title", isAuthenticated, category.showByTitle);
router.post("/", category.create);
module.exports = router;
