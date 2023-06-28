const bcrypt = require("bcrypt");
const adminModel = require("../../models/adminModel");

const {
    emptyBody,
    isNotProvided,
    validTrim,
    isValidWord,
    isValidEmail,
    isValidPwd,
    isValidObjectId,
} = require("../../utils/validators");

const updateAdmin = async (req, res) => {
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

        const userData = await adminModel.findById(userId);
        if (!userData) return res.status(404).send({ status: false, message: "user not found." });

        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });
        let data = req.body;

        let { userName, email, password } = data;

        if (userName) {
            if (!isNotProvided(userName))
                return res.status(400).send({ status: false, message: "provide the userName" });

            data.userName = validTrim(userName);
            if (!isValidWord(data.userName))
                return res.status(400).send({ status: false, message: "enter a valid userName" });
        }

        if (email) {
            if (!isNotProvided(email))
                return res.status(400).send({ status: false, message: "provide the email" });

            data.email = validTrim(email);
            if (!isValidEmail(data.email))
                return res.status(400).send({ status: false, message: "enter a valid email" });
        }

        let checkEmail = await adminModel.findOne({ email: data.email });
        if (checkEmail)
            return res.status(400).send({ status: false, message: "Email already exist" });

        if (password) {
            if (!isNotProvided(password))
                return res.status(400).send({ status: false, message: "provide the password" });

            password = password.trim();
            if (!isValidPwd(password))
                return res.status(400).send({ status: false, message: "enter a valid password" });
            data.password = await bcrypt.hash(password, Number(process.env.SALT));
        }

        let updateData = await adminModel.findByIdAndUpdate(userId, data, {
            new: true,
        });
        res.status(200).send({
            status: true,
            message: "Update admin is successful",
            data: updateData,
        });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = updateAdmin;
