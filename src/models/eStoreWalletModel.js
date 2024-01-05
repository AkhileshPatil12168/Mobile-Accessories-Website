const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const paymentRefundSchema = new mongoose.Schema(
  {
    vendorId: {
      type: ObjectId,
      ref: "Vendor",
      trim: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      trim: true,
    },

    walletBalance: {
      type: Number,
      default:0
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("eStore_Wallets", paymentRefundSchema);
