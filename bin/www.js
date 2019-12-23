const app = require("../app");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connect(`mongodb://rasgo.iptime.org:27017/express_api`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.listen(3001, () => {
  console.log("running on port 3001.");
});
