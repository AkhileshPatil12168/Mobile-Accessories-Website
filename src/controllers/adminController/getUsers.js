const bcrypt = require("bcrypt");

const adminModel = require("../../models/adminModel");
const userModel = require("../../models/userModel");

const { isValidObjectId } = require("../../utils/validators");

const getUsers = async function (req, res) {
    try {
        const userId = req.params.userId;
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

        const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

        if (!checkAdmin)
            return res.status(403).send({ status: false, message: "please login again" });

        const userData = await userModel
            .find({ isDeleted: false })
            .select({ __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0, password: 0 })
            .lean();
        if (userData.length == 0)
            return res.status(404).send({ status: false, message: "users not found." });

        return res
            .status(200)
            .send({ status: true, message: "User profile details", data: userData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const getUser = async function (req, res) {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        const customerUserId = req.params.customerUserId;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid userId." });

        if (!customerUserId)
            return res
                .status(400)
                .send({ status: false, message: "Please provide customer userId." });

        if (!isValidObjectId(customerUserId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid customer userId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const userData = await userModel
            .findOne({ _id: customerUserId, isDeleted: false })
            .select({ __v: 0, updatedAt: 0, createdAt: 0, isDeleted: 0, password: 0 })
            .lean();
        if (!userData) return res.status(404).send({ status: false, message: "user not found." });

        return res.status(200).send({ status: true, message: "Users details", data: userData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { getUsers, getUser };
