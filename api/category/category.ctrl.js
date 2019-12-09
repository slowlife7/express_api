const Category = require("../../model/Category");

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

  if (Number.isNaN(skip) || Number.isNaN(limit)) {
    return res.status(400).end();
  }

  Category.findOne({ title })
    .populate({
      path: "posts",
      select: "-__v -comments -category -content",
      options: { skip, limit }
    })
    .then(posts => {
      res.json(posts);
    });
};

module.exports = {
  show,
  showByTitle
};
