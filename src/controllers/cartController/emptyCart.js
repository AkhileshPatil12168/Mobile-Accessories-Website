const bcrypt = require("bcrypt");

const cartModel = require("../../models/cartModel");

const { isValidObjectId } = require("../../utils/validators");

const emptyCart = async (req, res) => {
    try {
        let userId = req.params.userId;
        const decodedToken = req.verifyed;
        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });
        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        let cartData = await cartModel.findOne({ userId: userId }).lean();

        if (
            cartData.totalItems == 0 &&
            cartData.items.length == 0 &&
            cartData.totalPrice == 0 &&
            cartData.totalQuantity == 0
        )
            return res.status(404).send({ status: false, message: "cart is empty" });

        const cartDeleted = await cartModel.findByIdAndUpdate(
            cartData["_id"],
            { items: [], totalPrice: 0, totalItems: 0, totalQuantity: 0 },
            { new: true }
        );
        return res.status(204).send({ status: true, message: "cart is empty", data: cartDeleted });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = emptyCart;
