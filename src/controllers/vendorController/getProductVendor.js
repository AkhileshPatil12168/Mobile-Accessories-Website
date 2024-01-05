const productModel = require("../../models/productModel");
const bcrypt = require("bcrypt");

const { isValidObjectId } = require("../../utils/validators");

const getProductsByVendor = async (req, res) => {
  try {
    let { userId } = req.params;

    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res
        .status(403)
        .send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res
        .status(403)
        .send({ status: false, message: "please login again" });

        

    const products = await productModel
      .find({ vendorId: userId })
      .select({ title: 1, price: 1, productImage: 1, available_Quantity: 1 })
      .lean();
    if (products.length == 0)
      return res.status(404).send({
        status: false,
        message: "Np product Found",
      });
      return res
            .status(200)
            .send({ status: true, message: "all products.", data: products });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

const getProductByIdVendor = async (req, res) => {
  try {
    let { productId, userId } = req.params;

    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res
        .status(403)
        .send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res
        .status(403)
        .send({ status: false, message: "please login again" });

    if (!productId)
      return res.status(400).send({
        status: false,
        message: "provide Product Id",
      });

    if (!isValidObjectId(productId))
      return res.status(400).send({
        status: false,
        message: "provide a valid Product Id",
      });

    let productsDetails = await productModel
      .findOne({ _id: productId, vendorId: userId }).populate({path:"ratings", select:"totalUsersRated averageRating totalRating"})
      .lean();
    if (!productsDetails)
      return res.status(404).send({
        status: false,
        message: "Product Not Found",
      });

    return res.status(200).send({
      status: true,
      message: "Success",
      data: productsDetails,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {getProductsByVendor, getProductByIdVendor}