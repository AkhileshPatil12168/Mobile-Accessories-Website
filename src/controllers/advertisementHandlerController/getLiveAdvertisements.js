const advertisementModel = require("../../models/advertisementModel");
const { getTimeStamps } = require("../../utils/utilityFunctions");

const getLiveAdvertisement = async (req, res) => {
  try {
    const { type } = req.query;

    const fullDate = getTimeStamps();

    const result = await advertisementModel
      .findOne({
        startDate: { $lte: fullDate },
        endDate: { $gte: fullDate },
        advertisementType: type,
        isLive: true,
        paymentStatus: "completed",
        isApproved: true,
      })
      .select({ advertisementImage: 1, productId: 1 })
      .lean();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = getLiveAdvertisement;
