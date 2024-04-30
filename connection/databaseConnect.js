const mongoose = require("mongoose");
const { DATABASE_CONNECTED } = require("../utility/constant");
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log(DATABASE_CONNECTED);
  })
  .catch((err) => {
    console.log(err.message);
  });
module.exports = mongoose;
