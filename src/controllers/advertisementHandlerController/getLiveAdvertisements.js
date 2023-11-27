const advertisementModel = require("../../models/advertisementModel");
const productModel = require("../../models/productModel");
const bcrypt = require("bcrypt");
const {
  emptyBody,
  isValidImage,
  isValidObjectId,
  isValidAdvertisementType,
  isValidDate,
} = require("../../utils/validators");
const uploadFile = require("../Amazom S3 Bucket/bucketController");

const getLiveAdvertisement = async (req, res) => {
  try {
    const { type } = req.query;

    // const targetDate = new Date("2023-12-12");

    const date = new Date();
    const fullDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    const result = await advertisementModel
      .findOne({
        startDate: { $lte: fullDate },
        endDate: { $gt: fullDate },
        advertisementType: type,
        isLive: true,
        paymentStatus: "completed",
        isApproved: true,
      })
      .select({ advertisementImage: 1 })
      .lean();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = getLiveAdvertisement;
