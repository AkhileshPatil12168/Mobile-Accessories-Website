const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

let reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "User",
      required: true,
      unique: true,
    },
    reviews: [
      {
        productId: {
          type: objectId,
          ref: "product",
        },
        review: {
          type: String,
          trim: true,
          required:true
        },
        rating: {
          type: Number,
          required:true,
          enum:[1,2,3,4,5],
        },
        reviewDate: {
          type: Date,
          default: Date.now,
        },

      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product_Reviews", reviewSchema);
