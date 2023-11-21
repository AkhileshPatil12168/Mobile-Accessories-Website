const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

let cartSchema = new mongoose.Schema(
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
                quantity: {
                    type: Number,
                },
                title: { type: String },
                price: { type: Number },
                productImage: [],
                vendorId:{
                    type: objectId,
                    ref: "Vendor",
                },
            },
        ],
        totalPrice: {
            type: Number,
        },
        totalItems: {
            type: Number,
        },
        totalQuantity: {
            type: Number,
        },
        isFreeShipping: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
