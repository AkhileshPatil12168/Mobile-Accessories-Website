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

    advertisementId: {
      type: ObjectId,
      ref: "Advertisement",
    },

    orderId: {
      type: ObjectId,
      ref: "Order",
    },

    refundAmont: {
      type: Number,
    },

    refundStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
    requestCreatedDate: {
      type: Date,
    },
    requestCompletedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment_Refunds", paymentRefundSchema);
