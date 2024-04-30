const bcrypt = require("bcrypt");
const User = require("../../model/user");
const { errorResponse, successResponse } = require("../../utility/Common");
const jwt = require("jsonwebtoken");
const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  SOME_WENT_WRONG,
  USER_LOGIN_SUCCESS,
  USER_UPDATED,
  USER_CREATED,
  EMAIL_OR_PASSWORD_INCORRECT,
  ID_NOT_FOUND,
  EMAIL_AND_PASSWORD_REQUIRED,
  USER_DELETED,
  USER_NOT_DELETED,
  ALL_FIELDS_REQUIRED,
} = require("../../utility/constant");
const UserController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return errorResponse(res, false, ALL_FIELDS_REQUIRED, null);
      }
      const findUser = await User.findOne({
        email: email.toLowerCase(),
        isDeleted: false,
      });
      if (findUser) {
        return errorResponse(res, false, USER_ALREADY_EXISTS, findUser);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      return successResponse(res, true, USER_CREATED, user);
    } catch (error) {
      return errorResponse(res, false, SOME_WENT_WRONG, error.message);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return errorResponse(res, false, EMAIL_AND_PASSWORD_REQUIRED, null);
      }
      const findUser = await User.findOne({
        email: email.toLowerCase(),
        isDeleted: false,
      });
      if (!findUser) {
        return errorResponse(res, false, USER_NOT_FOUND, findUser);
      }
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return errorResponse(res, false, EMAIL_OR_PASSWORD_INCORRECT, isMatch);
      }
      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SEC, {
        expiresIn: "30d",
      });
      return res
        .status(200)
        .json({
          success: true,
          message: USER_LOGIN_SUCCESS,
          data: findUser,
          token: token,
        });
    } catch (error) {
      return errorResponse(res, false, SOME_WENT_WRONG, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }

      const findUser = await User.findOne({ _id: id, isDeleted: false });
      if (!findUser) {
        return errorResponse(res, false, USER_NOT_FOUND, findUser);
      }

      const updateFields = {};
      if (req.body.name) {
        updateFields.name = req.body.name;
      }
      if (req.body.email) {
        updateFields.email = req.body.email.toLowerCase();
      }
      if (req.body.password) {
        updateFields.password = await bcrypt.hash(req.body.password, 10);
      }
      if (req.body.balance !== undefined) {
        updateFields.balance = req.body.balance;
      }

      const user = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updateFields,
        { new: true }
      );

      if (!user) {
        return errorResponse(res, false, USER_NOT_FOUND, user);
      }

      return successResponse(res, true, USER_UPDATED, user);
    } catch (error) {
      return errorResponse(res, false, SOME_WENT_WRONG, error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const findUser = await User.findOne({ _id: id, isDeleted: false });
      if (!findUser) {
        return errorResponse(res, false, USER_NOT_DELETED, findUser);
      }
      const user = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      return successResponse(res, true, USER_DELETED, user);
    } catch (error) {
      return errorResponse(res, false, SOME_WENT_WRONG, error.message);
    }
  },
};

module.exports = UserController;
