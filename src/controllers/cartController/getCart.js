const bcrypt = require("bcrypt");

const cartModel = require("../../models/cartModel");

const { isValidObjectId } = require("../../utils/validators");

const getCart = async (req, res) => {
    try {
        let userId = req.params.userId;
        const decodedToken = req.verifyed;
        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid userId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        let cartData = await cartModel.findOne({ userId: userId });
        if (!cartData) return res.status(404).send({ status: false, message: "Cart Not Found" });

        return res.status(200).send({ status: true, message: "success", data: cartData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = getCart;
