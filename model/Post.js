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

Post.pre("save", function(next) {
  const { category } = this;
  Category.updateOne({ title: category }, { $push: { posts: this._id } })
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

Post.pre("remove", function(next) {
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

Post.pre("deleteOne", function(next) {
  const { category } = this;
  console.log("deleteOne!!!");
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

Post.statics.removePostById = function(post_id, cb) {
  return this.findById(post_id).then(doc => {
    doc.remove(err => {
      if (err) {
        return cb(err, null);
      }
      return cb(null, "success");
    });
  });
};

module.exports = mongoose.model("Post", Post);
