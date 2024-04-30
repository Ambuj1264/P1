const express = require("express");
const router = express.Router();
const unauth = require("./unauth");
const verifyToken = require("../middleware/verifyToken");
const auth = require("./auth");
router.use("/", unauth);
router.use("/auth", verifyToken, auth);
module.exports = router;
