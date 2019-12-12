const mongoose = require("mongoose");
const Post = require("./Post");
const Category = require("./Category");

const dummyCategories = [
  {
    title: "javascript",
    posts: []
  },
  {
    title: "html",
    posts: []
  },
  {
    title: "css",
    posts: []
  }
];

const dummyJavascript = [
  {
    title: "test1",
    content: "javascript test1",
    author: "test",
    category: "javascript"
  },
  {
    title: "test2",
    content: "javascript test2",
    author: "test",
    category: "javascript"
  },
  {
    title: "test3",
    content: "javascript test3",
    author: "test",
    category: "javascript"
  },
  {
    title: "test4",
    content: "javascript test4",
    author: "test",
    category: "javascript"
  },
  {
    title: "test5",
    content: "javascript test5",
    author: "test",
    category: "javascript"
  },
  {
    title: "test6",
    content: "javascript test6",
    author: "test",
    category: "javascript"
  },
  {
    title: "test7",
    content: "javascript test7",
    author: "test",
    category: "javascript"
  },
  {
    title: "test8",
    content: "javascript test8",
    author: "test",
    category: "javascript"
  }
];

const dummyhtml = [
  {
    title: "test1",
    content: "html test1",
    author: "test",
    category: "html"
  },
  {
    title: "test2",
    content: "html test2",
    author: "test",
    category: "html"
  },
  {
    title: "test3",
    content: "html test3",
    author: "test",
    category: "html"
  },
  {
    title: "test4",
    content: "html test4",
    author: "test",
    category: "html"
  },
  {
    title: "test5",
    content: "html test5",
    author: "test",
    category: "html"
  },
  {
    title: "test6",
    content: "html test6",
    author: "test",
    category: "html"
  },
  {
    title: "test7",
    content: "html test7",
    author: "test",
    category: "html"
  },
  {
    title: "test8",
    content: "html test8",
    author: "test",
    category: "html"
  }
];

const dummycss = [
  {
    title: "test1",
    content: "css test1",
    author: "test",
    category: "css"
  },
  {
    title: "test2",
    content: "css test2",
    author: "test",
    category: "css"
  },
  {
    title: "test3",
    content: "css test3",
    author: "test",
    category: "css"
  },
  {
    title: "test4",
    content: "css test4",
    author: "test",
    category: "css"
  },
  {
    title: "test5",
    content: "css test5",
    author: "test",
    category: "css"
  },
  {
    title: "test6",
    content: "css test6",
    author: "test",
    category: "css"
  },
  {
    title: "test7",
    content: "css test7",
    author: "test",
    category: "css"
  },
  {
    title: "test8",
    content: "css test8",
    author: "test",
    category: "css"
  }
];

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://rasgo.iptime.org:27017/express_api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    dummyCategories.forEach(item => {
      const c = new Category(item);
      c.save(err => {
        if (err) throw err;
      });
    });

    dummyJavascript.forEach(item => {
      const p = new Post(item);
      p.save(err => {
        if (err) throw err;
        Category.updateOne(
          {
            title: "javascript"
          },
          { $push: { posts: p.id } }
        )
          .then(result => {})
          .catch(err => {
            throw err;
          });
      });
    });

    dummyhtml.forEach(item => {
      const p = new Post(item);
      p.save(err => {
        if (err) throw err;
        Category.updateOne(
          {
            title: "html"
          },
          { $push: { posts: p.id } }
        )
          .then(result => {})
          .catch(err => {
            throw err;
          });
      });
    });

    dummycss.forEach(item => {
      const p = new Post(item);
      p.save(err => {
        if (err) throw err;
        Category.updateOne(
          {
            title: "css"
          },
          { $push: { posts: p.id } }
        )
          .then(result => {})
          .catch(err => {
            throw err;
          });
      });
    });
  })
  .catch(err => {});
