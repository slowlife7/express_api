const Post = require("../../model/Post");
const Category = require("../../model/Category");

const show = (req, res) => {
  console.log("show");
  console.log(req.isAuthenticated);
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

const createComment = (req, res) => {
  const { post_id } = req.params;
  Post.updateOne({ _id: post_id }, { $push: { comments: req.body } })
    .then(result => {
      if (!result) {
        return result.status(404).end();
      }
      return res.status(201).json(req.body);
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      return res.status(500).end();
    });
};

const modify = (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;

  Post.updateOne({ _id: post_id }, { title, content })
    .then(result => {
      res.json({
        title,
        content
      });
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      res.status(500).end();
    });
};

const modifyComment = (req, res) => {
  const { post_id, comment_id } = req.params;
  const { content } = req.body;

  Post.updateOne({ _id: post_id }, { $pull: { comments: comment_id } })
    .then(result => {
      res.json({
        content
      });
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      res.status(500).end();
    });
};

const destroy = (req, res) => {
  const { post_id } = req.params;
  Post.deleteOne({ _id: post_id })
    .then(result => {
      res.json({ id: post_id });
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(404).end();
      }
      res.status(500).end();
    });
};

const destroyComment = (req, res) => {
  const { post_id, comment_id } = req.params;
  Post.updateOne({ _id: post_id }, { $pull: { comments: comment_id } })
    .then(result => {
      res.json({
        id: comment_id
      });
    })
    .catch(err => {
      res.status(500).end();
    });
};

module.exports = {
  show,
  showSpecific,
  showCommentById,
  create,
  createComment,
  modify,
  modifyComment,
  destroy,
  destroyComment
};
