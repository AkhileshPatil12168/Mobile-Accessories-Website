const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");
const { isValidObjectId, isValidStatus } = require("../../utils/validators");
const adminModel = require("../../models/adminModel");

const getOrdersAdmin = async (req, res) => {
    try {
        let userId = req.params.userId;
        const decodedToken = req.verifyed;
        const filters = req.query;
        let { status } = filters;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        const isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

        if (!checkAdmin)
            return res.status(403).send({ status: false, message: "please login again" });

        if (status) {
            if (!isValidStatus(status))
                return res.status(400).send({
                    status: false,
                    message: "Please provide only pending, completed, cancelled.",
                });
        }
        
        const data = {};
        if (status) data.status = status;

        let orderData = await orderModel
            .find(data)
            .sort({ orderdedDate: -1 })
            .select({ deliveredDate: 1, items: 1, totalPrice: 1, status: 1, orderdedDate: 1,cancelledDate:1,deliveredDate:1 })
            .lean();
        if (orderData.length == 0)
            return res.status(404).send({ status: false, message: "orders Not Found" });

        return res.status(200).send({ status: true, message: "success", data: orderData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const getOrderByIdAdmin = async (req, res) => {
    try {
        let userId = req.params.userId;
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

        const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

        if (!checkAdmin)
            return res.status(403).send({ status: false, message: "please login again" });

        let orderData = await orderModel
            .findById(orderId)
            .select({  deletedAt: 0, isDeleted: 0 })
            .lean();
        if (!orderData) return res.status(404).send({ status: false, message: "order Not Found" });

        return res.status(200).send({ status: true, message: "success", data: orderData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { getOrdersAdmin, getOrderByIdAdmin };
