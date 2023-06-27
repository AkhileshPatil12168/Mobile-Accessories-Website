const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");

const { isValidObjectId } = require("../../utils/validators");

const deleteOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        const orderId = req.params.orderId;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid userId." });

        if (!isValidObjectId(orderId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid orderId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const orderStatus = await orderModel
            .findById(orderId, { isDeleted: false })
            .select({ status: 1 })
            .lean();
        if (orderStatus.status == "pending")
            return res
                .status(400)
                .send({ status: false, message: "this order can not be deleted" });

        let deletedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { isDeleted: true },
            { new: true }
        );

        return res.status(204).send({ status: true, msg: "order is deleted", data: deletedOrder });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = deleteOrder;
