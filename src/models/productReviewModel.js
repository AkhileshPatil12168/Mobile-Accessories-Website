const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

let reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "product",
      required: true,
      trim: true,
    },

    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
    },
    reviewDate: {
      type: Date,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product_reviews", reviewSchema);
