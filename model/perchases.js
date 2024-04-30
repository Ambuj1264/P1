const mongoose = require("mongoose");

const perchasesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
    },
    amount: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

     {
    timestamps: true,
  }
);

const PerchasesModel = mongoose.model("perchases", perchasesSchema);

module.exports = PerchasesModel;
