require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnect = require("./connection/databaseConnect");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = {
  origin: [process.env.ORIGIN],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
