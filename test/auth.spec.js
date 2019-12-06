const mocha = require("mocha");
const should = require("should");
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../model/User");
const app = require("../app");

describe("POST /auth/login", () => {
  before(done => {
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

  describe("성공시", () => {
    beforeEach(done => {
      User.register(
        new User({ username: "billy" }),
        "billy123",
        (err, user) => {
          if (err) {
            return done(err);
          }
          done();
        }
      );
    });

    it("로그인한 username을 반환한다.", done => {
      request(app)
        .post("/auth/login")
        .send({
          username: "billy",
          password: "billy123"
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.have.property("username", "billy");
          done();
        });
    });

    afterEach(done => {
      User.deleteOne({ username: "billy" }, () => {
        done();
      });
    });
  });

  describe("실패시", () => {
    beforeEach(done => {
      User.register(
        new User({ username: "billy" }),
        "billy123",
        (err, user) => {
          if (err) {
            return res.status(401).end(done);
          }
          done();
        }
      );
    });

    it("username 및 password 누락시 400을 반환한다.", done => {
      request(app)
        .post("/auth/login")
        .send({})
        .expect(400)
        .end(done);
    });

    it("username 또는 password 틀릴시 401을 반환한다.", done => {
      request(app)
        .post("/auth/login")
        .send({
          username: "billy",
          password: "billy12"
        })
        .expect(401)
        .end(done);
    });

    afterEach(done => {
      User.deleteOne({ username: "billy" }, () => {
        done();
      });
    });
  });
});

describe("POST /auth/register", () => {
  before(done => {
    const db = mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    done();
  });

  after(done => {
    User.deleteOne({ username: "billy" }, () => {
      mongoose.connection.close();
      done();
    });
  });
  describe("성공시", () => {
    it("등록된 username을 반환한다.", done => {
      request(app)
        .post("/auth/register")
        .send({
          username: "billy",
          password: "billy123"
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.have.property("username", "billy");
          done();
        });
    });
  });

  describe("실패시", () => {
    it("username 및 password 누락시 400을 반환한다.", done => {
      request(app)
        .post("/auth/register")
        .send({})
        .expect(400)
        .end(done);
    });

    it("username이 존재하면 409를 반환한다.", done => {
      request(app)
        .post("/auth/register")
        .send({
          username: "billy",
          password: "billy123"
        })
        .expect(409)
        .end(done);
    });
  });
});
