const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const loginLogoutData = new mongoose.Schema(
  {
    userType:{
      type:String
    },
    vendorId: {
      type: ObjectId,
      ref: "Vendor",
      trim: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      trim: true,
    },
    adminId: {
      type: ObjectId,
      ref: "Admin",
      trim: true,
    },
    token:{
      type:String
    },

    loginTime: {
      type: Date,
    },

    logOutTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Login_Logout_Data", loginLogoutData);
