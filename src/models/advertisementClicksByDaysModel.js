const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const clicksByDays = new mongoose.Schema(
  {
    advertisementId: {
      type: ObjectId,
      ref: "Advertisement",
      required: true,
      trim: true,
    },

    date: { type: Date },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advertisement_Clicks_By_Days", clicksByDays);
