const Post = require("../../model/Post");

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

module.exports = {
  show,
  showSpecific
};
