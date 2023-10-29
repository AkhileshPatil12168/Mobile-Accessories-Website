const bcrypt = require("bcrypt");

const { isValidObjectId } = require("../../utils/validators");

const getKey = async (req, res) => {
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

        return res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
    } catch (error) {
        res.status(500).send({ error });
    }
};

module.exports = getKey;
