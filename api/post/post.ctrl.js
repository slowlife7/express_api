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

const create = (req, res) => {
  const post = new Post(req.body);
  post.save(err => {
    if (err) {
      return res.status(500).end();
    }
    
    Category.findOne({title: req.body.category})
      .then(category => {
        if (!category) {
          const category = new Category({
            title: req.body.category,
            posts: [post.id]
          });
          category.save(err => {
            if (err) {
              return res.status(500).end();
            }
          })
          return res.json({
              title: post.title,
              content: post.content,
              author: post.author,
              category: post.category
            })
        } else {
          category.posts.push(post.id);
          category.save(err => {
            if (err) {
              return res.status(500).end();
            }
            return res.json({
              title: post.title,
              content: post.content,
              author: post.author,
              category: post.category
            })
          })
        }
      })
  })
}

module.exports = {
  show,
  showSpecific,
  create
};
