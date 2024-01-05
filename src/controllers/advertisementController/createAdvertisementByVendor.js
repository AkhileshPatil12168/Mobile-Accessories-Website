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

const getAdvertisementSummery = async (req, res) => {
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
    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });

    let { productId, advertisementImage, advertisementType, startDate, endDate } = req.body;
    const files = req.files;

    const threeDaysLaterDate = Date.now() + 60 * 60 * 24 * 3 * 1000 + 19800000;

    if (!productId)
      return res.status(400).send({ status: false, message: "Please provide the productId." });

    if (!isValidObjectId(productId))
      return res.status(400).send({ status: false, message: "Please provide a valid productId." });

    const checkProduct = await productModel
      .findOne({ _id: productId, isDeleted: false })
      .select({ id: 1 })
      .lean();
    if (!checkProduct)
      return res.status(400).send({ status: false, message: "product not found." });

    if (!advertisementType)
      return res.status(400).send({ status: false, message: "Advertisement type is requried" });

    if (!isValidAdvertisementType(advertisementType))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid advertisement type." });

    if (!startDate)
      return res.status(400).send({ status: false, message: "Please provide the start date." });
    startDate = Number(startDate);
    if (!isValidDate(startDate))
      return res.status(400).send({ status: false, message: "Please provide a valid start date." });
    if (new Date(startDate) < new Date(threeDaysLaterDate))
      return res.status(400).send({
        status: false,
        message: "Please provide start date at lest from three days later.",
      });

    if (!endDate)
      return res.status(400).send({ status: false, message: "Please provide the end date." });
    endDate = Number(endDate);
    if (!isValidDate(endDate))
      return res.status(400).send({ status: false, message: "Please provide a valid end date." });
    if (new Date(endDate) <= new Date(startDate))
      return res
        .status(400)
        .send({ status: false, message: "End date can not be less or equal to start date." });

    const difference = (new Date(endDate) - new Date(startDate)) / (60 * 60 * 24 * 1000);
    if (difference <= 0)
      return res
        .status(400)
        .send({ status: false, message: "Please set the advertisement at lest for one day" });
    const checkPendigAds = await advertisementModel
      .find({
        $and: [
          { isDeleted: false },
          { advertisementType: advertisementType },
          {paymentStatus:"completed"},
          {
            $or: [
              {
                $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: startDate } }],
              },
              {
                $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }],
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

    if (files.length == 0)
      return res.status(400).send({ status: false, message: "advertisement Image is requried" });

    if (!isValidImage(files[0].originalname))
      return res.status(400).send({ status: false, message: "provide a valid image" });

    advertisementImage = await uploadFile(files[0], "advertisements/");

    const data = {
      vendorId,
      productId,
      advertisementType,
      startDate,
      endDate,
      price: difference * 100,
      advertisementImage,
    };
    const createRequest = await advertisementModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Advertisement request succssfully.",
      data: createRequest,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const createAdvertisement = async (req, res) => {
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
    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "provide some data" });

    let { productId, advertisementImage, advertisementType, startDate, endDate } = req.body;
    const files = req.files;

    const threeDaysLaterDate = Date.now() + 60 * 60 * 24 * 3 * 1000 + 19800000;

    if (!productId)
      return res.status(400).send({ status: false, message: "Please provide the productId." });

    if (!isValidObjectId(productId))
      return res.status(400).send({ status: false, message: "Please provide a valid productId." });

    const checkProduct = await productModel
      .findOne({ _id: productId, isDeleted: false })
      .select({ id: 1 })
      .lean();
    if (!checkProduct)
      return res.status(400).send({ status: false, message: "product not found." });

    if (!advertisementType)
      return res.status(400).send({ status: false, message: "Advertisement type is requried" });

    if (!isValidAdvertisementType(advertisementType))
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid advertisement type." });

    if (!startDate)
      return res.status(400).send({ status: false, message: "Please provide the start date." });
    startDate = Number(startDate);
    if (!isValidDate(startDate))
      return res.status(400).send({ status: false, message: "Please provide a valid start date." });
    // let date = new Date(startDate);
    // let date2 = new Date(threeDaysLaterDate);
    if (new Date(startDate) < new Date(threeDaysLaterDate))
      return res.status(400).send({
        status: false,
        message: "Please provide start date at lest from three days later.",
      });

    if (!endDate)
      return res.status(400).send({ status: false, message: "Please provide the end date." });
    endDate = Number(endDate);
    if (!isValidDate(endDate))
      return res.status(400).send({ status: false, message: "Please provide a valid end date." });
    if (new Date(endDate) <= new Date(startDate))
      return res
        .status(400)
        .send({ status: false, message: "End date can not be less or equal to start date." });

    const difference = (new Date(endDate) - new Date(startDate)) / (60 * 60 * 24 * 1000);
    if (difference <= 0)
      return res
        .status(400)
        .send({ status: false, message: "Please set the advertisement at lest for one day" });
    let s = new Date(startDate);
    let e = new Date(endDate);
    const checkPendigAds = await advertisementModel
      .find({
        $and: [
          { isDeleted: false },
          {advertisementType:advertisementType},
          {
            $or: [
              {
                $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: startDate } }],
              },
              {
                $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }],
              },
            ],
          },
        ],
      })
      .select({ _id: 1 })
      .lean();
    if (checkPendigAds.length != 0)
      return res
        .status(400)
        .send({
          status: false,
          message: "plese select differnt dates. Days are booked for these days.",
        });

    if (files.length == 0)
      return res.status(400).send({ status: false, message: "advertisement Image is requried" });

    if (!isValidImage(files[0].originalname))
      return res.status(400).send({ status: false, message: "provide a valid image" });

    advertisementImage = await uploadFile(files[0], "advertisements/");

    const data = {
      vendorId,
      productId,
      advertisementType,
      startDate,
      endDate,
      price: difference * 100,
      advertisementImage,
    };

    const createRequest = await advertisementModel.create(data);

    return res.status(201).send({
      status: true,
      message: "Advertisement request succssfully.",
      data: createRequest,
    });

    // console.log(new Date(Date.now()+19800000),new Date(1700943326483+19800000))
    // console.log(new Date("2020-07-20")<new Date("2020-07-21"))
    // console.log(new Date(Date.now()+19800000));
    // console.log(Date.now() + 19800000 + 60 * 60 * 24 * 7 * 1000);
    let datee = new Date("2023-12-");
    console.log(datee.getTime());
    // console.log(new Date(1700870400000+(60*60*24*2*1000)))

    //                          end date              start date
    // console.log((new Date("2023-12-05") - new Date("2023-12-05")) / (60 * 60 * 24 * 1000));
  } catch (error) {
    return   res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {getAdvertisementSummery,createAdvertisement};
