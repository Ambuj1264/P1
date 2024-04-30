const PerchasesModel = require("../../model/perchases");
const User = require("../../model/user");
const Voucher = require("../../model/voucher");
const { errorResponse, successResponse } = require("../../utility/Common");
const {
  ID_NOT_FOUND,
  USERID_VOCHERID_AMOUNT_REQUIRED,
  PERCHASES_CREATED,
  PERCHASES_FETCHED,
  PERCHASES_UPDATED,
  PERCHASES_NOT_FOUND,
  PERCHASES_DELETED,
  PERCHASES_NOT_CREATED,
} = require("../../utility/constant");

const perchasesController = {
  createPerchases: async (req, res) => {
    try {
      const { userId, voucherId, amount } = req.body;
      if (!userId || !voucherId || !amount) {
        return errorResponse(res, false, USERID_VOCHERID_AMOUNT_REQUIRED, null);
      }

      const findVoucher = await Voucher.findOne({
        _id: voucherId,
        isDeleted: false,
      });

      if (!findVoucher) {
        return errorResponse(res, false, "Voucher Id is invaild", null);
      }
      if (findVoucher.count <= 0 || findVoucher.expiryDate < new Date()) {
        return errorResponse(res, false, "Voucher is Expired", null);
      }
      const findUser = await User.findOne({
        _id: userId,
        isDeleted: false,
      });

      if (!findUser) {
        return errorResponse(res, false, "User Id is not valid", null);
      }

      if (findUser.balance < findVoucher.price) {
        return errorResponse(res, false, "Insufficient balance", null);
      }
      const perchases = await PerchasesModel.create({
        userId,
        voucherId,
        amount: findVoucher.price,
      });

      if (!perchases) {
        return errorResponse(res, false, PERCHASES_NOT_CREATED, null);
      }

      if (perchases.userId) {
        await User.findOneAndUpdate(
          { _id: perchases.userId, isDeleted: false },
          { $inc: { balance: -perchases.amount } },
          { new: true }
        );
      }

      if (perchases.voucherId) {
        await Voucher.findOneAndUpdate(
          { _id: perchases.voucherId, isDeleted: false },
          { $inc: { count: -1 } },
          { new: true }
        );
      }

      return successResponse(res, true, PERCHASES_CREATED, perchases);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },

  getAllPerchases: async (req, res) => {
    try {
      const perchases = await PerchasesModel.aggregate([
        { $match: { isDeleted: false } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "vouchers",
            localField: "voucherId",
            foreignField: "_id",
            as: "voucher",
          },
        },
      ]);
      return successResponse(res, true, PERCHASES_FETCHED, perchases);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
  getPerchases: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const perchases = await PerchasesModel.findOne({ _id: id })
        .populate({
          path: "userId",
          select: "name email",
        })
        .populate({
          path: "voucherId",
          select: "brandName code codeType expiryDate price reedemedItem",
        });
      return successResponse(res, true, PERCHASES_FETCHED, perchases);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
  updatePerchases: async (req, res) => {
    try {
      const { id, userId, voucherId, amount } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const updateFields = {};
      if (req.body.userId) {
        updateFields.userId = userId;
      }
      if (req.body.voucherId) {
        updateFields.voucherId = voucherId;
      }
      if (req.body.amount) {
        updateFields.amount = amount;
      }

      const perchases = await PerchasesModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updateFields,
        { new: true }
      );

      if (!perchases) {
        return errorResponse(res, false, PERCHASES_NOT_FOUND, perchases);
      }

      // if (perchases.userId) {
      //   await User.findOneAndUpdate(
      //     { _id: perchases.userId, isDeleted: false },
      //     { $inc: { balance: -perchases.amount } },
      //     { new: true }
      //   );
      // }

      // if (perchases.voucherId) {
      //   await Voucher.findOneAndUpdate(
      //     { _id: perchases.voucherId, isDeleted: false },
      //     { $inc: { count: -1 } },
      //     { new: true }
      //   );
      // }
      return successResponse(res, true, PERCHASES_UPDATED, perchases);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },

  deletePerchases: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const perchases = await PerchasesModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (!perchases) {
        return errorResponse(res, false, PERCHASES_NOT_FOUND, perchases);
      }
      if (perchases.userId) {
        await User.findOneAndUpdate(
          { _id: perchases.userId, isDeleted: false },
          { $inc: { balance: perchases.amount } },
          { new: true }
        );
      }

      if (perchases.voucherId) {
        await Voucher.findOneAndUpdate(
          { _id: perchases.voucherId, isDeleted: false },
          { $inc: { count: 1 } },
          { new: true }
        );
      }

      return successResponse(res, true, PERCHASES_DELETED, perchases);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
};
module.exports = perchasesController;
