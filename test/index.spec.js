
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../model/Post");
const should = require("should");

describe("INDEX API TEST", () => {
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

  describe.only("GET /", () => {
    describe("성공", () => {
      it("배열을 반환한다.", done => {
        request(app)
          .get("/")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
          });
      });
    });
  });
});