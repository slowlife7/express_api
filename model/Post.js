const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String },
    content: { type: String },
    author: { type: String },
    category: { type: String },
    comments: [
      {
        author: { type: String },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

module.exports = mongoose.model("Post", Post);
