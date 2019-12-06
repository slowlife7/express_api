const Post = require("../../model/Post");
const Category = require("../../model/Category");

const show = (req, res) => {
  let { skip = 0, limit = 10, sort } = req.query;
  skip = Number(skip);
  limit = Number(limit);

  if (Number.isNaN(skip) || Number.isNaN(limit)) {
    return res.status(400).end();
  }

  Post.find({}, { comments: false, __v: false })
    .skip(skip * limit)
    .limit(limit)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      return res.status(500).end();
    });
};

const showSpecific = (req, res) => {
  const { post_id } = req.params;
  if (!post_id) {
    return res.status(404).end();
  }

  Post.findById(post_id)
    .then(post => {
      if (!post) {
        return res.status(404).end();
      }
      return res.json(post);
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      return res.status(500).end();
    });
};

const showCommentById = (req, res) => {
  const { post_id } = req.params;
  Post.findById(post_id)
    .then(docs => {
      if (!docs) {
        return res.status(404).end();
      }
      return res.json(docs.comments);
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      return res.status(500).end();
    });
};

const create = (req, res) => {
  const { category } = req.body;
  Category.exists({ title: category }).then(result => {
    if (!result) {
      return res.status(404).end();
    }

    const post = new Post(req.body);
    post.save(err => {
      if (err) {
        return res.status(500).end();
      }
      return res.status(201).json({
        _id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        category
      });
    });
  });
};
module.exports = {
  show,
  showSpecific,
  showCommentById,
  create
};
