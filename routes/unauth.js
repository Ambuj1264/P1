const express = require("express");
const UserController = require("../controller/users");
const router = express.Router();

router.post("/user/create", UserController.createUser );
router.post("/user/login", UserController.loginUser );
router.post("/user/update", UserController.updateUser);
router.post("/user/delete", UserController.deleteUser);
module.exports = router;