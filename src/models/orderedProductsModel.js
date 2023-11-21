const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


const Ordered_productsSchema = new mongoose.Schema(
  {
    userId:{
      type: ObjectId,
      ref: "User",
    },
    orderId: {
      type: ObjectId,
      ref: "Order",
    },

    productId: {
      type: ObjectId,
      ref: "product",
    },

    vendorId: {
      type: ObjectId,
      ref: "Vendor",
    },

    quantity: {
      type: Number,
    },
    title: { type: String },

    price: { type: Number },

    totalPrice: { type: Number },

    productImage: [],

    deliveredDate: {
      type: Date,
    },

    cancelledDate: {
      type: Date,
    },

    cancellable: {
      type: Boolean,
      default: true,
    },

    OrderStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
    },

    deletedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Ordered_products", Ordered_productsSchema);
