const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

const { isValidObjectId, emptyBody } = require("../../utils/validators");

const deleteUser = async (req, res) => {
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

        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });

        let data = req.body;

        let { password } = data;

        let user = await userModel.findById(userId).lean();
        if (!user || user.isDeleted == true)
            return res.status(400).send({ status: false, msg: "User not Exist" });

        let actualPassword = await bcrypt.compare(password, user.password);

        if (!actualPassword)
            return res.status(400).send({ status: false, msg: "Incorrect password" });

        let updateData = await userModel.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true }
        );
        if (updateData) {
            res.status(200).send({
                status: true,
                message: "deleted succesfully",
            });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = deleteUser;
