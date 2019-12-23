const Category = require("../../model/Category");
const Post = require("../../model/Post");

const show = (req, res) => {
  Category.find({}, { __v: false, posts: false })
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => {});
};

const showByTitle = (req, res) => {
  const { title } = req.params;
  if (!title) {
    return res.status(400).end();
  }

  let { skip = 0, limit = 10, sort } = req.query;
  skip = Number(skip);
  limit = Number(limit);

  skip *= limit;

  if (Number.isNaN(skip) || Number.isNaN(limit)) {
    return res.status(400).end();
  }

  Promise.all([
    Post.countDocuments({ category: title }),
    Category.findOne({ title }, { __v: false, __id: false }).populate({
      path: "posts",
      select: "-__v -comments -category -content",
      options: { skip, limit, sort: { created_at: -1 } }
    })
  ])
    .then(values => {
      if (!values) {
        return res.status(404).end();
      }
      const [total, posts] = values;
      res.json({ total, ...posts._doc });
    })
    .catch(err => {});
};

const create = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).end();
  }

  Category.exists({ title }).then(result => {
    if (result) {
      return res.status(409).end();
    }
    const category = new Category({
      title,
      posts: []
    });
    category.save(err => {
      if (err) {
        return res.status(500).end();
      }
      return res.status(201).json({
        title: category.title,
        id: category.id
      });
    });
  });
};

const createPost = (req, res, next) => {
  const { category } = req.params;
  console.log("category:", category);
  console.log(req.body);

  req.flash("message", {
    category,
    ...req.body
  });
  console.log("createpost");
  res.redirect(307, "/post");
};

module.exports = {
  show,
  showByTitle,
  create,
  createPost
};
