const Voucher = require("../../model/voucher");
const { errorResponse, successResponse } = require("../../utility/Common");
const {
  ID_NOT_FOUND,
  SOME_WENT_WRONG,
  BRANDNAME_CODE_EXPIRYDATE_COUNT_PRICE_REDEEMED_ITEM_REQUIRED,
  CODE_UNIQUE_REQUIRED,
  VOUCHER_CREATED,
  VOUCHER_FETCHED,
  VOUCHER_NOT_FOUND,
  VOUCHER_DELETED,
  VOUCHER_UPDATED,
  NO_FILE_UPLOADED,
  VOUCHER_CREATED_BY_EXCEL_SHEET,
} = require("../../utility/constant");
const xlsx = require("xlsx");
const voucherController = {
  createVoucher: async (req, res) => {
    try {
      const {
        brandName,
        code,
        codeType,
        expiryDate,
        count,
        price,
        reedemedItem,
      } = req.body;

      if (
        !brandName ||
        !code ||
        !expiryDate ||
        !count ||
        !price ||
        !reedemedItem
      ) {
        return errorResponse(
          res,
          false,
          BRANDNAME_CODE_EXPIRYDATE_COUNT_PRICE_REDEEMED_ITEM_REQUIRED,
          null
        );
      }
      const codeLength = code.length;
      if (code.length > 1 && codeType == "unique") {
        let newCodeLength = new Set(code);
        if (newCodeLength.size != codeLength) {
          return errorResponse(res, false, CODE_UNIQUE_REQUIRED, null);
        }
      }
      const voucher = await Voucher.create({
        brandName,
        code,
        codeType,
        expiryDate,
        count,
        price,
        reedemedItem,
      });
      return successResponse(res, true, VOUCHER_CREATED, voucher);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },

  getVoucher: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const vouchers = await Voucher.findOne({ isDeleted: false, _id: id });
      return successResponse(res, true, VOUCHER_FETCHED, vouchers);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
  getAllVoucher: async (req, res) => {
    try {
      const vouchers = await Voucher.find({ isDeleted: false });
      return successResponse(res, true, VOUCHER_FETCHED, vouchers);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
  deleteVoucher: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const voucher = await Voucher.findOne({ _id: id, isDeleted: false });
      if (!voucher) {
        return errorResponse(res, false, VOUCHER_NOT_FOUND, voucher);
      }
      const deletedVoucher = await Voucher.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      return successResponse(res, true, VOUCHER_DELETED, deletedVoucher);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },

  updateVoucher: async (req, res) => {
    try {
      const {
        brandName,
        code,
        codeType,
        expiryDate,
        count,
        price,
        reedemedItem,
        id,
      } = req.body;
      if (!id) {
        return errorResponse(res, false, ID_NOT_FOUND, null);
      }
      const voucher = await Voucher.findOne({ _id: id, isDeleted: false });
      if (!voucher) {
        return errorResponse(res, false, VOUCHER_NOT_FOUND, voucher);
      }
      const updateFields = {};
      if (req.body.brandName) {
        updateFields.brandName = brandName;
      }
      if (req.body.code) {
        updateFields.code = code;
      }
      if (req.body.codeType) {
        updateFields.codeType = codeType;
      }
      if (req.body.expiryDate) {
        updateFields.expiryDate = expiryDate;
      }
      if (req.body.count) {
        updateFields.count = count;
      }
      if (req.body.price) {
        updateFields.price = price;
      }
      if (req.body.reedemedItem) {
        updateFields.reedemedItem = reedemedItem;
      }
      const updatedVoucher = await Voucher.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updateFields,
        { new: true }
      );
      return successResponse(res, true, VOUCHER_UPDATED, updatedVoucher);
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
  createVoucherByExcelSheet: async (req, res) => {
    try {
      if (!req.file) {
        return errorResponse(res, false, NO_FILE_UPLOADED, null);
      }
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      const response = await Voucher.insertMany(
        data.map((item) => ({
          brandName: item.brandName,
          code: item.code,
          expiryDate: item.expiryDate,
          count: item.count,
          price: item.price,
          reedemedItem: item.reedemedItem,
        }))
      );

      return successResponse(
        res,
        true,
        VOUCHER_CREATED_BY_EXCEL_SHEET,
        response
      );
    } catch (error) {
      errorResponse(res, false, error.message, null);
    }
  },
};

module.exports = voucherController;
