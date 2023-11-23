const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");
const orderedProductModel = require("../../models/orderedProductsModel")

const { isValidObjectId } = require("../../utils/validators");

const deleteOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        const orderId = req.params.orderId;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        if (!isValidObjectId(orderId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid orderId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const orderStatus = await orderModel
          .findById(orderId, { isDeleted: false })
          .populate({ path: "items.orderedProductId", select: "OrderStatus" })
          .select({ items: 1 })
          .lean();
        // console.log(orderStatus.items)

        for (const { orderedProductId } of orderStatus.items) {
          if (orderedProductId.OrderStatus == "pending")
            return res
              .status(400)
              .send({ status: false, message: "this order can not be deleted" });
        }

                let updateData = {
                    isDeleted: true ,
                    deletedAt : (Date.now() + 19800000)
                };
        let deletedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        ).lean();

        for (const { orderedProductId } of deletedOrder.items) {
          await orderedProductModel.findByIdAndUpdate(orderedProductId, updateData);
        }
   

        return res.status(204).send({ status: true, message: "order is deleted", data: deletedOrder });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = deleteOrder;
