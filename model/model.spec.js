const request = require("supertest");
const mongoose = require("mongoose");
const Post = require("./Post");
const Category = require("./Category");

describe("MODEL TEST", () => {
  describe("Create Post ", () => {
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
      mongoose.connection.close();
      done();
    });
    describe("성공", () => {
      it("생성된 POST를 반환한다.", done => {
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

          done();
        });
      });
    });
  });

  describe("Delete Post ", () => {
    before(done => {
      mongoose.Promise = global.Promise;

      const db = mongoose.connect(`mongodb://rasgo.iptime.org:27017/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      done();
    });

    after(done => {
      mongoose.connection.close();
      done();
    });
    describe("성공", () => {
      let post_id = "";
      beforeEach(done => {
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
          done();
        });
      });

      it("삭제된 POST를 반환한다.", done => {
        Post.deleteOne({ _id: post_id }).then(doc => {
          done();
        });
        /*console.log(post_id);
        Post.removePostById(post_id, function(err, res) {
          if (err) {
            return done(err);
          }
          console.log(res);
          done();
        });*/

        /*Post.findById(post_id).then(doc => {
          doc.remove(err => {
            if (err) {
              return done(err);
            }
            done();
          });
        }); */
      });
    });
  });
});
