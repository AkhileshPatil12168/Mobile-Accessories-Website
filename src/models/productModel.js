const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
        
    },
    price: {
        type: Number,
        required: true
    },
  
    category:{
        type : [String],
        required: true,
        trim: true
    },

    compatible_models:{
        type : [String]
    },
 
    isFreeShipping: {
        type: Boolean,
        default: false
    },
    productImage: {
        type: [String]
    },
    available_Quantity:{
        type :Number,
        required: true,
    },

    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

module.exports = mongoose.model("product", productSchema)