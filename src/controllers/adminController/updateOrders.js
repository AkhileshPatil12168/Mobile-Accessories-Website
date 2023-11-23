const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");
const adminModel = require("../../models/adminModel");
const orderedProductModel = require("../../models/orderedProductsModel")


const { emptyBody, isValidObjectId } = require("../../utils/validators");

const updateOrderByAdmin = async (req, res) => {
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

        const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

        if (!checkAdmin)
            return res.status(403).send({ status: false, message: "please login again" });

        const orderData = await orderedProductModel
          .findById(orderedProductId)
          .select({ OrderStatus: 1 })
          .lean();

        if (orderData.OrderStatus == "cancelled" || orderData.OrderStatus == "completed")
          return res.status(400).send({ status: false, message: "this order can not be updated" });

        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });

        let status = req.body.status;
        if (!status) return res.status(400).send({ status: false, message: "provide the status" });

        if (status != "cancelled" && status != "completed")
            return res
                .status(400)
                .send({ status: false, message: "status can be only cancelled or completed" });
        let updateData = {
            OrderStatus: status,
        };
        

        if (status == "completed") updateData.deliveredDate = Date.now() + 19800000;
        if (status == "cancelled") updateData.cancelledDate = Date.now() + 19800000;

        const updatedOrder = await orderedProductModel.findByIdAndUpdate(orderedProductId, updateData, { new: true });
        if (status == "cancelled") {
          await productModel.findByIdAndUpdate(updatedOrder.productId, {
            $inc: { available_Quantity: updatedOrder.quantity },
          });
        }
        
        return res.status(200).send({ status: true, message: "order updated", data: updatedOrder });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = updateOrderByAdmin;
