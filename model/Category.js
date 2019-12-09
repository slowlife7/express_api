const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    title: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

module.exports = mongoose.model("Category", Category);
