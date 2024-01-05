const orderModel = require("../../../models/orderModel");
const orderedProductsModel = require("../../../models/orderedProductsModel");

const userOrderHistory = async (req, res) => {
  try {
    const type= req.query;

    const data = await orderModel.find(type).select({userId:1, name :1, totalPrice:1,orderdedDate:1,totalItems:1,totalQuantity:1}).lean()
    return res.status(200).send({ status: true, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

const userOrderedProductHistory = async (req, res) => {
    try {
      const type= req.query;
  
      const data = await orderedProductsModel.find(type).select({userId:0,orderId:0,vendorId:0,updatedAt:0,__v:0,deletedAt:0,cancellable:0,productImage:0,price:0,isDeleted:0}).lean()
      return res.status(200).send({ status: true, message: "successfull", data: data });
    } catch (error) {
      return res.status(500).send({ status: false, data: error.message });
    }
  };





module.exports = {userOrderHistory, userOrderedProductHistory}
