const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const advertisementSchema = new mongoose.Schema(
  {
    vendorId: {
      type: ObjectId,
      ref: "Vendor",
      required: true,
      trim: true,
    },

    productId: {
      type: ObjectId,
      ref: "product",
      required: true,
    },

    advertisementImage: {
      type: String,
      required: true,
      trim: true,
    },

    advertisementType: {
      type: String,
      enum: [
        "top banner",
        "left side box",
        "right side box",
        "1st priority",
        "2nd priority",
        "3rd priority",
      ],
      required: true,
      trim: true,
    },
    startDate: { type: Date, required: true },

    endDate: { type: Date, required: true },

    isApproved: { type: Boolean, default: false },

    price: {
      type: Number,
      defalut: 0,
    },

    paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },

    razorpayId: {
      razorpay_payment_id: {
        type: String,
      },
      razorpay_order_id: {
        type: String,
      },
      razorpay_signature: {
        type: String,
      },
    },

    isLive: { type: Boolean, default: false },

    isCancled: { type: Boolean, default: false },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advertisement", advertisementSchema);
