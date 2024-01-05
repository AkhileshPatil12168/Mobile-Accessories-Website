const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const roleSchema = new mongoose.Schema(
  {
    originalId: {
      type: ObjectId,
      ref: "roleRef"
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    roleRef: {
      type: String,
      required:true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
