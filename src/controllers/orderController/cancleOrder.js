const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");

const { emptyBody, isValidObjectId } = require("../../utils/validators");

const cancleOrder = async (req, res) => {
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
        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });

        const orderStatus = await orderModel.findById(orderId).select({ status: 1 }).lean();

        if (orderStatus.status == "cancelled" || orderStatus.status == "completed")
            return res
                .status(400)
                .send({ status: false, message: "this order can not be updated" });

        const cancle = req.body.cancle;

        if (req.body.cancle) {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                {
                    status: "cancelled",
                },
                { new: true }
            );
            return res
                .status(200)
                .send({ status: true, message: "order cancelled", data: updatedOrder });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = cancleOrder;
