const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Post = require("../../model/Post");
const should = require("should");

describe("GET /category/:title", () => {
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
        .get("/category/javascript")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.posts.should.be.instanceof(Array);
          done();
        });
    });

    it("skip 및 limit 만큼 반환한다.", done => {
      request(app)
        .get("/category/javascript?skip=1&limit=2")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.posts.should.be.instanceof(Array);
          done();
        });
    });
  });
});