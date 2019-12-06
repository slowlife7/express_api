const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../model/Post");
const Category = require("../model/Category");
require("should");

describe("POST API TEST", () => {
  before(done => {
    mongoose.Promise = global.Promise;
    const db = mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    done();
  });

  after(done => {
    mongoose.connection.close();
    done();
  });

  describe("GET /post", () => {
    describe("성공", () => {
      it("배열로 반환한다.", done => {
        request(app)
          .get("/post")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
          });
      });
    });

    describe("실패", () => {
      it("skip 또는 limit이 숫자가 아니면 400을 응답한다.", done => {
        request(app)
          .get("/post?skip=ab&limit=a")
          .expect(400)
          .end(done);
      });
    });
  });

  describe("GET /post/:post_id", () => {
    describe("성공", () => {
      let post_id = "";
      let category = "javascript";
      beforeEach(done => {
        const post = new Post({
          title: "test 입니다",
          content: "테스트에요",
          author: "tester",
          category
        });

        post.save(err => {
          if (err) return done(err);
          post_id = post.id;
          done();
        });
      });

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(result => {
          Category.findOne({ title: category }).then(doc => {
            if (!doc) {
              return done();
            }
            doc.posts = doc.posts.filter(id => id !== post_id);
            doc.save(err => {
              if (err) {
                return done(err);
              }
              done();
            });
          });
        });
      });

      it("post 객체를 반환한다.", done => {
        request(app)
          .get(`/post/${post_id}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property("title");
            res.body.should.have.property("content");
            res.body.should.have.property("author");
            done();
          });
      });
    });

    describe("실패", () => {
      it("id 가 존재하지 않는 경우 404를 반환한다.", done => {
        request(app)
          .get("/post/1")
          .expect(404)
          .end(done);
      });
    });
  });

  describe("GET /post/:post_id/comment", () => {
    describe("성공", () => {
      let post_id = "";
      let category = "javascript";
      beforeEach(done => {
        const post = new Post({
          title: "herry",
          content: "this is herry",
          author: "herry",
          category,
          comments: [
            {
              author: "billy",
              content: "nothing"
            },
            {
              author: "billy1",
              content: "nothing1"
            }
          ]
        });
        post.save(err => {
          if (err) {
            return done(err);
          }

          post_id = post.id;
          done();
        });
      });

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(result => {
          Category.findOne({ title: category }).then(doc => {
            if (!doc) {
              return done();
            }
            doc.posts = doc.posts.filter(id => id !== post_id);
            doc.save(err => {
              if (err) {
                return done(err);
              }
              done();
            });
          });
        });
      });

      it("comment 배열을 반환한다.", done => {
        request(app)
          .get(`/post/${post_id}/comment`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.be.instanceof(Array);
            done();
          });
      });
    });

    describe("실패", () => {
      it(":post_id 없으면 404 반환한다.", done => {
        request(app)
          .get("/post/3ad/comment")
          .expect(404)
          .end(done);
      });
    });
  });

  describe("POST /post", () => {
    describe("성공", () => {
      let post_id = "";
      let category = "";

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(docs => {
          Category.findOne({ title: category })
            .then(docs => {
              docs.posts = docs.posts.filter(doc => {
                return doc.toString() !== post_id;
              });

              docs.save(err => {
                if (err) {
                  return done(err);
                }
                done();
              });
            })
            .catch(err => {});
        });
      });

      it("201 상태코드 및 생성된 객체를 반환한다.", done => {
        request(app)
          .post("/post")
          .send({
            title: "test",
            content: "this is test",
            author: "herry",
            category: "javascript"
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property("title");
            res.body.should.have.property("content");
            res.body.should.have.property("author");
            res.body.should.have.property("category");
            post_id = res.body._id;
            category = res.body.category;
            done();
          });
      });
    });

    describe("실패", () => {
      it("category가 존재하지 않으면 404 반환한다.", done => {
        request(app)
          .post("/post")
          .send({
            title: "test",
            content: "this is test",
            author: "herry",
            category: "javascript2"
          })
          .expect(404)
          .end(done);
      });
    });
  });

  describe("POST /post/:post_id/comment", () => {});

  describe("PUT /post/:post_id", () => {});

  describe("PUT /post/:post_id/comment/:comment_id", () => {});

  describe("DELETE /post/:post_id", () => {});

  describe("DELETE /post/:post_id/comment/:comment_id", () => {});
});
