
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    title: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: { createdAt: "created_at" },
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);

module.exports = mongoose.model("Category", Category);
