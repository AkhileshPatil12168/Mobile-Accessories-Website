const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");
const orderedProductModel = require("../../models/orderedProductsModel")

const { isValidObjectId, isValidStatus } = require("../../utils/validators");

const getOrders = async (req, res) => {
    try {
        let userId = req.params.userId;
        const decodedToken = req.verifyed;
        const filters = req.query;
        let { status } = filters;

        if (!userId)
        return res.status(400).send({ status: false, message: "Please provide userId." });
        
        if (!isValidObjectId(userId))
        return res
        .status(400)
        .send({ status: false, message: "Please provide a valid userId." });
        
        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
        return res.status(403).send({ status: false, message: "please login again" });
        const data = { userId: userId, isDeleted: false,  };

        if (status) {
            if (!isValidStatus(status))
                return res.status(400).send({
                    status: false,
                    message: "Please provide only pending, completed, cancelled.",
                });
                data.status = status

        }


        let orderData = await orderModel
            .find(data)
            .sort({ orderdedDate: -1 }).populate({
                path: "items.orderedProductId",
                select: "productId vendorId orderId quantity title price totalPrice productImage OrderStatus",
              })
            .select({ deliveredDate: 1, items: 1, totalPrice: 1, status: 1, orderdedDate: 1, })
            .lean();
        if (orderData.length == 0)
            return res.status(404).send({ status: false, message: "orders Not Found" });

        return res.status(200).send({ status: true, message: "success", data: orderData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { userId, orderedProductId } = req.params;
        const decodedToken = req.verifyed;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        if (!isValidObjectId(orderedProductId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid orderedProductId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        let orderData = await orderedProductModel
          .findOne({ _id: orderedProductId, isDeleted: false }).populate({path:"orderId",select:"name phone email address orderdedDate isFreeShipping"})
          .lean()
          .select({ deletedAt: 0, isDeleted: 0 })
          .lean();

        if (!orderData) return res.status(404).send({ status: false, message: "order Not Found" });

        return res.status(200).send({ status: true, message: "success", data: orderData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { getOrders, getOrderById };
