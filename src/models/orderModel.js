const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            shipping: {
                street: {
                    type: String,
                    trim: true,
                },
                city: {
                    type: String,
                    trim: true,
                },
                pincode: {
                    type: Number,
                    trim: true,
                },
            },
            billing: {
                street: {
                    type: String,
                    trim: true,
                },
                city: {
                    type: String,
                    trim: true,
                },
                pincode: {
                    type: Number,
                    trim: true,
                },
            },
        },
        items: [
            {
                productId: {
                    type: ObjectId,
                    ref: "product",
                },
                quantity: {
                    type: Number,
                },
                title: { type: String },
                price: { type: Number },
                productImage: [],
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
        orderdedDate : {
            type : Date
        },
        deliveredDate :{
            type:Date
        },
        cancellable: {
            type: Boolean,
            default: true,
        },
        status: {
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

module.exports = mongoose.model("Order", orderSchema);
