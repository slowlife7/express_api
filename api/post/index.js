const express = require("express");
const post = require("./post.ctrl");
const router = express.Router();

router.get("/", post.show);
router.get("/:post_id", post.showSpecific);
router.get("/:post_id/comment", post.showCommentById);
router.post("/", post.create);
router.post("/:post_id/comment", post.createComment);
router.put("/:post_id", post.modify);
router.put("/:post_id/comment/:comment_id", post.modifyComment);
router.delete("/:post_id", post.destroy);
router.delete("/:post_id/comment/:comment_id", post.destroyComment);
module.exports = router;
