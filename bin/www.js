const app = require("../app");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connect(`mongodb://rasgo.iptime.org:27017/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3001, () => {
  console.log("running on port 3000.");
});
