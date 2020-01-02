const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
