const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new mongoose.Schema(
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
    
        email: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        requestedDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
