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
          done();
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
          done();
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

  describe("POST /post/:post_id/comment", () => {
    describe("성공", () => {
      let post_id = "";
      beforeEach(done => {
        const post = new Post({
          title: 'comment test',
          content: 'this is test',
          author: 'billy',
          category: 'javascript',
          comments: []
        });
        post.save(err => {
          if (err) {
            return done(err);
          }
          post_id = post.id;
          done();
        })
      })

      afterEach(done => {
        Post.deleteOne({_id: post_id})
          .then(result => {
            done();
          })
          .catch(err => {
            done(err);
          })
      })

      it("상태코드 201 및 생성된 comment를 반환한다.", done => {
        request(app)
          .post(`/post/${post_id}/comment`)
          .send({
            author: 'herry',
            content: 'this is test comment'
          })
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('author');
            res.body.should.have.property('content');
            done();
          })
      })
    })

    describe("실패", () => {
      it("존재하지 않는 post_id의 경우 404를 반환한다.", done => {
        request(app)
        .post(`/post/1/comment`)
        .send({
          author: 'herry',
          content: 'this is test comment'
        })
        .expect(404)
        .end(done)
      })
    })
  });

  describe("PUT /post/:post_id", () => {
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
          done();
        });
      });

      it("변경된 post 객체를 반환한다.", done => {
        request(app)
          .put(`/post/${post_id}`)
          .send({
            title: "test1",
            content: "this is test2"
          })
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('title');
            res.body.should.have.property('content');
            done();
          });
      });
    })
    describe("실패", () => {
      it("post_id가 존재하지 않으면 404를 반환한다.", done => {
        request(app)
        .put(`/post/123`)
        .send({
          title: "test1",
          content: "this is test2"
        })
        .expect(404)
        .end(done);
      })
    })
  });

  describe("PUT /post/:post_id/comment/:comment_id", () => {
    describe("성공", () => {

      let post_id = "";
      let comment_id = "";
      beforeEach(done => {
        const post = new Post({
          title: "herry",
          content: "this is herry",
          author: "herry",
          category: 'javascript',
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
          comment_id = post.comments[0].id;
          post_id = post.id;
          done();
        });
      });

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(result => {
          done();
        });
      });

      it("변경된 Comment 객체를 반환한다.", done => {
        request(app)
          .put(`/post/${post_id}/comment/${comment_id}`)
          .send({
            content: "this is test3"
          })
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('content');
            done();
          });
      });
    })
    describe("실패", () => {
      let post_id = "";
      let comment_id = "";
      beforeEach(done => {
        const post = new Post({
          title: "herry",
          content: "this is herry",
          author: "herry",
          category: 'javascript',
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
          comment_id = post.comments[0].id;
          post_id = post.id;
          done();
        });
      });

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(result => {
          done();
        });
      });

      it("post_id가 존재하지 않으면 404를 반환한다.", done => {
        request(app)
        .put(`/post/123/comment/${comment_id}`)
        .send({
          title: "test1",
          content: "this is test2"
        })
        .expect(404)
        .end(done);
      })

      it("comment_id가 존재하지 않으면 404를 반환한다.", done => {
        request(app)
        .put(`/post/123/comment/1234`)
        .send({
          title: "test1",
          content: "this is test2"
        })
        .expect(404)
        .end(done);
      })
    })
  });

  describe("DELETE /post/:post_id", () => {
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

      it("삭제된 post_id를 반환한다.", done => {
        request(app)
          .delete(`/post/${post_id}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.have.property('id');
            done();
          })
      });
    });
  });

  describe("DELETE /post/:post_id/comment/:comment_id", () => {
    describe("성공", () => {
      let post_id = "";
      let comment_id = "";
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
          comment_id = post.comments[0].id;
          post_id = post.id;
          done();
        });
      });

      afterEach(done => {
        Post.deleteOne({ _id: post_id }).then(result => {
          done();
        });
      });

      it("삭제된 comment_id를 반환한다.", done => {
        request(app)
        .delete(`/post/${post_id}/comment/${comment_id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.have.property('id');
          done();
        })
      })
    })
  });
});
