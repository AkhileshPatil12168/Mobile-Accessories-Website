const orderModel = require("../../../models/orderModel");

const totalOrders = async (req, res) => {
  try {
    const {type}= req.query;

    // const {userId}= req.query;
  

const data = await orderModel.find({type}).sort({totalPrice:-1}).select({name:1, orderdedDate:1,totalPrice:1, paymentStatus:1, isFreeShipping:1}).lean()
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

module.exports = totalOrders
