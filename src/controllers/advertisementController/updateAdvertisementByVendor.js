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

const updateAdvertisement = async (req, res) => {
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

    let { productId, advertisementImage, startDate, endDate } = req.body;
    const files = req.files;
    const data = {};

    if (productId) {
      if (!isValidObjectId(productId))
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid productId." });

      const checkProduct = await productModel
        .findOne({ _id: productId, isDeleted: false })
        .select({ id: 1 })
        .lean();
      if (!checkProduct)
        return res.status(400).send({ status: false, message: "product not found." });
      data.productId = productId;
    }

    if (startDate || endDate) {
      const threeDaysLaterDate = Date.now() + 60 * 60 * 24 * 3 * 1000 + 19800000;

      const oldData = await advertisementModel
        .findById(advertisementId)
        .select({ id: 1, startDate: 1, endDate: 1, paymentStatus: 1 })
        .lean();

      if (oldData.paymentStatus == "completed")
        return res.status(400).send({
          status: false,
          message: "Payment is alredy done.",
        });

      if (startDate) {
        startDate = Number(startDate);
        if (!isValidDate(startDate))
          return res
            .status(400)
            .send({ status: false, message: "Please provide a valid start date." });

        if (new Date(startDate) < new Date(threeDaysLaterDate))
          return res.status(400).send({
            status: false,
            message: "Please provide start date at lest from three days later.",
          });
        data.startDate = new Date(startDate);
      } else data.startDate = oldData.startDate;

      if (endDate) {
        endDate = Number(endDate);
        if (!isValidDate(endDate))
          return res
            .status(400)
            .send({ status: false, message: "Please provide a valid end date." });
        endDate = new Date(endDate);
        if (endDate <= data.startDate)
          return res
            .status(400)
            .send({ status: false, message: "End date can not be less or equal to start date." });
        data.endDate = endDate;
      } else data.endDate = oldData.endDate;

      const difference =
        (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
        (60 * 60 * 24 * 1000);
      if (difference <= 0)
        return res
          .status(400)
          .send({ status: false, message: "Please set the advertisement at lest for one day" });
      data.price = difference * 100;

      const checkPendigAds = await advertisementModel
        .find({
          $and: [
            { isDeleted: false },
            { _id: { $ne: oldData["_id"] } },
            {
              $or: [
                {
                  $and: [
                    { startDate: { $lte: data.endDate } },
                    { endDate: { $gte: data.startDate } },
                  ],
                },
                {
                  $and: [
                    { startDate: { $gte: data.startDate } },
                    { endDate: { $lte: data.endDate } },
                  ],
                },
              ],
            },
          ],
        })
        .select({ _id: 1 })
        .lean();
      if (checkPendigAds.length != 0)
        return res.status(400).send({
          status: false,
          message: "plese select differnt dates. Days are booked for these days.",
        });
    }
    if (files.length > 0) {
      if (!isValidImage(files[0].originalname))
        return res.status(400).send({ status: false, message: "provide a valid image" });

      advertisementImage = await uploadFile(files[0], "advertisements/");
      data.advertisementImage = advertisementImage;
    }

    const updatedData = await advertisementModel
      .findByIdAndUpdate(advertisementId, data, { new: true })
      .select({ __v: 0, isDeleted: 0 })
      .lean();

    return res.status(200).send({
      status: true,
      message: "Advertisement updated succssfully.",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = updateAdvertisement;
