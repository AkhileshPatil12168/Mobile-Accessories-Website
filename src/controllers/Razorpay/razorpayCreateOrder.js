const instance = require("./razorpayConfigfile");
const bcrypt = require("bcrypt");

const { isValidObjectId } = require("../../utils/validators");

const createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res.status(403).send({ status: false, message: "please login again" });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });


        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
            receipt: userId,
        };
        const order = await instance.orders.create(options);

        return res.status(200).send({ order: order });
    } catch (error) {
        return res.status(500).send({ error });
    }
};

module.exports = createRazorpayOrder;
