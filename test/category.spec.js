const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../model/Post");
const Category = require("../model/Category");
const should = require("should");

describe("CATEGORY API TEST", () => {
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

  describe("GET /category", () => {
    describe("성공", () => {
      let categories_id = [];
      beforeEach(done => {
        const categories = [
          {
            title: "javascript"
          },
          {
            title: "html"
          },
          {
            title: "css"
          }
        ];

        Category.insertMany(categories).then(docs => {
          categories_id = docs.filter(doc => {
            return doc._id;
          });
          done();
        });
      });

      afterEach(done => {
        categories_id.forEach(id => {
          Category.deleteOne({ _id: id }).then(docs => {});
        });
        done();
      });

      it("배열을 반환한다.", done => {
        request(app)
          .get("/category")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
          });
      });
    });
  });

  describe("GET /category/:title", () => {
    describe("성공", () => {
      let category_id = "";
      beforeEach(done => {
        const category = new Category({
          title: "javascript"
        });
        category.save(err => {
          if (err) {
            return done(err);
          }
          category_id = category.id;
          done();
        });
      });

      afterEach(done => {
        Category.deleteOne({ _id: category_id }).then(doc => {
          done();
        });
      });

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
    describe("실패", () => {
      it("해당 카테고리가 존재하지 않는다. 404 반환", done => {
        request(app)
          .get("/category/herry")
          .expect(404)
          .end(done);
      });
    });
  });

  describe("POST /category", () => {
    describe("성공", () => {
      let category_id = "";

      afterEach(done => {
        Category.deleteOne({ _id: category_id })
          .then(result => {
            done();
          })
          .catch(err => {
            done(err);
          });
      });

      it("상태코드 201 및 추가된 category 정보를 반환한다.", done => {
        request(app)
          .post("/category")
          .expect(201)
          .send({
            title: "test123127"
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.body.should.have.property("title");
            res.body.should.have.property("id");
            category_id = res.body.id;
            done();
          });
      });
    });
    describe("실패", () => {
      let category_id = "";
      beforeEach(done => {
        const category = new Category({
          title: "test1231249",
          posts: []
        });
        category.save(err => {
          if (err) {
            return done(err);
          }
          category_id = category.id;
          done();
        });
      });
      afterEach(done => {
        Category.deleteOne({ _id: category_id })
          .then(result => {
            done();
          })
          .catch(err => {
            done(err);
          });
      });
      it("이미 존재하는 경우 409 반환한다.", done => {
        request(app)
          .post("/category")
          .expect(409)
          .send({
            title: "test1231249"
          })
          .end(done);
      });
    });
  });
});
