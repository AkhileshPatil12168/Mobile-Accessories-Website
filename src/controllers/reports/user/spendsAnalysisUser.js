const orderModel = require("../../../models/orderModel");

const spendAnalysisUsers = async (req, res) => {
  try {
    const type= req.query;

    const data = await orderModel.aggregate([
        {
          $group: {
            _id: "$userId",
            name: { $first: "$name" },
            totalSpendings: { $sum: "$totalPrice" },
            totalOrders: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            name: 1,
            totalSpendings: 1,
            totalOrders: 1
          }
        }
      ])
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

const spendAnalysisUser = async (req, res) => {
    try {
      const {userId}= req.query;
  
      const data = await orderModel.find({userId}).sort({totalPrice:-1}).select({name:1, orderdedDate:1,totalPrice:1, paymentStatus:1}).lean()
      return res.status(200).send({ status: false, message: "successfull", data: data });
    } catch (error) {
      return res.status(500).send({ status: false, data: error.message });
    }
  };

module.exports = {spendAnalysisUsers,spendAnalysisUser}
