const mongoose = require("mongoose");


const vendorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    mname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
  image: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        trim: true, required: true,
      },
      city: {
        type: String,
        trim: true, required: true,
      },
      state: {
        type: String,
        trim: true, required: true,
      },
      pincode: {
        type: String,
        trim: true, required: true,
      },
    },
    phone: {
      type: String,
      trim: true, required: true,
    },
    
    isApproved: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
