const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");

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

Post.pre("deleteOne", function(next) {
  const { category } = this;
  Category.updateOne({ title: category }, { $pull: { posts: this._id } })
    .then(doc => {
      if (!doc) {
        return next(err);
      }
      next();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = mongoose.model("Post", Post);
