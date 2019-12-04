const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Post = require("../../model/Post");
require("should");

describe("GET /post", () => {
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

  describe("성공", () => {
    let post_id = "";
    beforeEach(done => {
      const post = new Post({
        title: "test 입니다",
        content: "테스트에요",
        author: "tester"
      });

      post.save(err => {
        if (err) return done(err);
        post_id = post.id;
        done();
      });
    });

    afterEach(done => {
      Post.deleteOne({ _id: post_id.id }).then(result => {
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
