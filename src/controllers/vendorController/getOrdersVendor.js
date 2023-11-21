const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");
const vendorModel = require("../../models/vendorModel");
const orderedProductModel = require("../../models/orderedProductsModel")

const { isValidObjectId, isValidStatus } = require("../../utils/validators");


const getOrdersVendor = async (req, res) => {
  try {
    let vendorId = req.params.userId;
    const decodedToken = req.verifyed;
    const filters = req.query;
    let { status } = filters;

    if (!vendorId) return res.status(403).send({ status: false, message: "please login again" });

    if (!isValidObjectId(vendorId))
      return res.status(403).send({ status: false, message: "please login again" });

    const isCorrectUser = await bcrypt.compare(vendorId, decodedToken.userId);

    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const checkVendor = await vendorModel.findById(vendorId).select({ _id: 1 }).lean();

    if (!checkVendor)
        return res.status(403).send({ status: false, message: "please login again" });

    if (status) {
      if (!isValidStatus(status))
        return res.status(400).send({
          status: false,
          message: "Please provide only pending, completed, cancelled.",
        });
    }

    const data = {vendorId};
    if (status) data.Orderstatus = status;

    let orderData = await orderedProductModel
      .find(data)
      .populate({
        path: "orderId",
        select: "name phone email",
      })
      .sort({ createdAt: -1 })
      .select({
        isDeleted:0, deletedAt:0
      })
      .lean();
    if (orderData.length == 0)
      return res.status(404).send({ status: false, message: "orders Not Found" });

    return res.status(200).send({ status: true, message: "success", data: orderData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};




const getOrderByIdVendor = async (req, res) => {
  try {
    const { userId,  orderedProductId } = req.params;
    const decodedToken = req.verifyed;

    if (!userId) return res.status(400).send({ status: false, message: "Please provide userId." });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    if (!isValidObjectId(orderedProductId))
      return res.status(400).send({ status: false, message: "Please provide a valid orderId." });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const checkVendor = await vendorModel.findById(userId).select({ _id: 1 }).lean();

    if (!checkVendor) return res.status(403).send({ status: false, message: "please login again" });

    let orderData = await orderedProductModel
      .findById(orderedProductId).populate({path:"orderId",select:"name email phone address"})
      .select({ deletedAt: 0, isDeleted: 0 })
      .lean();
    if (!orderData) return res.status(404).send({ status: false, message: "order Not Found" });

    return res.status(200).send({ status: true, message: "success", data: orderData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { getOrdersVendor, getOrderByIdVendor };
