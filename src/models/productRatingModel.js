const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

let ratingSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "product",
      required: true,
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    totalUsersRated: {
      type: Number,
      default: 0,
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product_ratings", ratingSchema);
