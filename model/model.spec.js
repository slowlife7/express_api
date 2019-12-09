
const request = require("supertest");
const mongoose = require("mongoose");
const Post = require("./Post");
const Category = require("./Category");
const should = require("should");

describe("MODEL TEST", () => {
  before(done => {
    mongoose.Promise = global.Promise;

    const db = mongoose.connect(`mongodb://rasgo.iptime.org:27017/test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const category = new Category({
      title: "javascript",
      posts: []
    });

    category.save(err => {
      if (err) {
        return done(err);
      }

      done();
    });
  });

  after(done => {
    Category.deleteOne({ title: "javascript" })
      .then(result => {
        mongoose.connection.close();
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  describe("Create Post ", () => {
    describe("성공", () => {
      let post_id = "";
      afterEach(done => {
        Post.deleteOne({ _id: post_id })
          .then(result => {
            done();
          })
          .catch(err => {
            done(err);
          });
      });
      it("Category에 정상적으로 업데이트 된다.", done => {
        const post = new Post({
          title: "haha",
          content: "hoho",
          author: "ttt",
          category: "javascript"
        });

        post.save(err => {
          if (err) {
            return done(err);
          }
          post_id = post.id;
          Category.updateOne(
            { title: "javascript" },
            { $push: { posts: post.id } }
          )
            .then(result => {
              result.should.have.property("n", 1);
              result.should.have.property("nModified", 1);
              result.should.have.property("ok", 1);
              done();
            })
            .catch(err => {
              done(err);
            });
        });
      });
    });
  });

  describe("Delete Post ", () => {
    describe("성공", () => {
      let post_id = "";
      beforeEach(done => {
        const post = new Post({
          title: "haha1",
          content: "hoho",
          author: "ttt",
          category: "javascript"
        });

        post.save(err => {
          if (err) {
            return done(err);
          }
          post_id = post.id;
          Category.updateOne(
            { title: "javascript" },
            { $push: { posts: post.id } }
          )
            .then(result => {
              done();
            })
            .catch(err => {
              done(err);
            });
        });
      });

      it("Category에 post_id가 존재하지 않는다..", done => {
        Post.deleteOne({ _id: post_id })
          .then(result => {
            Category.findOne({ title: "javascript" })
              .then(doc => {
                should.not.exist(doc.posts.find(id => id === post_id));
                done();
              })
              .catch(err => {
                done(err);
              });
          })
          .catch(err => {
            done(err);
          });
      });
    });
  });
});
