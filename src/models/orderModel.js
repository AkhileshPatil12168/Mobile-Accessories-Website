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
            {orderedProductId:{
                type:ObjectId,
                ref:"Ordered_products"
            }}
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
        orderdedDate: {
            type: Date,
        },
        
        paymentMethod: {
            type: String,
            default:"cash on delivery",
            enum: ["cash on delivery", "razorpay"],
        },
        
        paymentStatus: {
            type: String,
            enum: ["pending", "completed"],
        },
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
