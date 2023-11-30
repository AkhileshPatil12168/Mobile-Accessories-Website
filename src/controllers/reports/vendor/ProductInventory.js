const productModel = require("../../../models/productModel");

const productInventory = async (req, res) => {
  try {
    const {type}= req.query;

    const data = await productModel
      .find(type)
      .select({title:1,price:1,isFreeShipping:1,available_Quantity:1,createdAt:1,category:1}).sort({loginTime:-1}).lean();
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

module.exports = productInventory
