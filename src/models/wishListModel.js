const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

let wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: objectId,
          ref: "product",
        },
        addedDate: {
          type: Date,
        },
        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wish_List", wishListSchema);
