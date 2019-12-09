const Post = require("../../model/Post");

const show = (req, res) => {
  Post.aggregate([
    {$sort: {created_at: -1}},
    {$group: {_id: "$category", posts: {$push: {
      _id: "$_id",
      title: "$title",
      author: "$author",
      created_at: "$created_at"
    } }}},
    {$project: { posts: {$slice: ["$posts", 10]}}}
  ])
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(500).end();
  })
}

module.exports = {
  show
}