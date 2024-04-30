const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    code: {
      type: [String],
      required: true,
    },
    codeType: {
      type: String,
      enum: ["unique", "repeated"],
      default: "repeated",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      default: 10000000,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    reedemedItem: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
