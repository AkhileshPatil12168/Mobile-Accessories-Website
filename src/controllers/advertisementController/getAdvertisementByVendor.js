const advertisementModel = require("../../models/advertisementModel");
const bcrypt = require("bcrypt");

const {
  emptyBody,
  isValidImage,
  isValidObjectId,
  isValidAdvertisementType,
  isValidDate,
} = require("../../utils/validators");
const getAdvertisements = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const decodedToken = req.verifyed;

    if (!vendorId)
      return res.status(400).send({ status: false, message: "Please provide vendorId." });

    if (!isValidObjectId(vendorId))
      return res.status(403).send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(vendorId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const advertisementData = await advertisementModel
      .find({ isDeleted: false })
      .populate("productId", "title")
      .select({
        advertisementImage: 1,
        productId: 1,
        advertisementType: 1,
        isLive: 1,
        startDate: 1,
        endDate: 1,
        isApproved: 1,
        paymentStatus: 1,
      })
      .lean();
    return res.status(201).send({
      status: true,
      message: "Success.",
      data: advertisementData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAdvertisementById = async (req, res) => {
  try {
    const { vendorId, advertisementId } = req.params;
    const decodedToken = req.verifyed;

    if (!vendorId)
      return res.status(400).send({ status: false, message: "Please provide vendorId." });

    if (!isValidObjectId(vendorId))
      return res.status(403).send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(vendorId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const advertisementData = await advertisementModel
      .findOne({ _id: advertisementId, isDeleted: false })
      .populate("productId", "title productImage price")
      .select({
        isDeleted: 0,
        __v: 0,
      })
      .lean();
    if (!advertisementData)
      return res.status(400).send({ status: false, message: "no advertisement found" });

    return res.status(200).send({
      status: true,
      message: "Success.",
      data: advertisementData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getAdvertisements, getAdvertisementById };
