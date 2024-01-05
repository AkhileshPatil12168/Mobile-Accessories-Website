const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const walletTransactionsSchema = new mongoose.Schema(
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
    transactions: [
      {
        amount: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet_Transactions", walletTransactionsSchema);
