const bcrypt = require("bcrypt");

const productModel = require("../../models/productModel");
const orderedProductModel = require("../../models/orderedProductsModel")

const { emptyBody, isValidObjectId } = require("../../utils/validators");

const cancleOrder = async (req, res) => {
    try {
        const { userId,  orderedProductId } = req.params;
        const decodedToken = req.verifyed;
       

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        if (!isValidObjectId(orderedProductId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid orderId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });
        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });

        const orderData = await orderedProductModel
          .findById(orderedProductId)
          .select({ OrderStatus: 1 })
          .lean();

        if (orderData.OrderStatus == "cancelled" || orderData.OrderStatus == "completed")
          return res.status(400).send({ status: false, message: "this order can not be updated" });

        let updateData = {
          OrderStatus: "cancelled",
          cancelledDate: Date.now() + 19800000,
        };
        

        if (req.body.cancle) {
          const updatedOrder = await orderedProductModel.findByIdAndUpdate(orderedProductId, updateData, {
            new: true,
          });

          await productModel.findByIdAndUpdate(updatedOrder.productId, {
            $inc: { available_Quantity: updatedOrder.quantity },
          });

          return res
            .status(200)
            .send({ status: true, message: "order cancelled", data: updatedOrder });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = cancleOrder;
