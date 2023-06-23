const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { emptyBody, isValidEmail } = require("../../utils/validators");

const loginUser = async function (req, res) {
    try {
        if (emptyBody(req.body))
            return res.status(400).send({ status: false, msg: "Email and Password is Requierd" });

        const { email, password } = req.body;

        if (!email) return res.status(400).send({ status: false, msg: "User Email is Requierd" });

        if (!password)
            return res.status(400).send({ status: false, msg: "User Password is Requierd" });

        if (!isValidEmail(email))
            return res.status(400).send({ status: false, msg: "Enter Valid Email Id" });

        let user = await userModel.findOne({ email }).select({ _id: 1, password: 1 }).lean();
        if (!user) return res.status(400).send({ status: false, msg: "User not Exist" });

        let actualPassword = await bcrypt.compare(password, user.password);

        if (!actualPassword)
            return res.status(400).send({ status: false, msg: "Incorrect email or password" });

        const userId = await bcrypt.hash(user["_id"].toString(), 10);
        let token = jwt.sign({ userId: userId }, process.env.TOKEN_KEY, {
            expiresIn: "1d",
        });
        res.setHeader("Content-Type", "application/json");

        res.set("Authorization", `Bearer ${token}`);

        return res.status(200).send({
            status: true,
            message: "User login successfully",
            data: { userId: user._id, token: token },
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
module.exports = loginUser;
