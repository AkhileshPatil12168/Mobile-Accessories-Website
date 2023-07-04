const adminModel = require("../../models/adminModel");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { emptyBody, isValidEmail } = require("../../utils/validators");

const login = async function (req, res) {
    try {
        if (emptyBody(req.body))
            return res.status(400).send({ status: false, msg: "Email and Password is Requierd" });

        const { email, password, userType } = req.body;
        let model;

        if (!email) return res.status(400).send({ status: false, msg: "User Email is Requierd" });

        if (!password)
            return res.status(400).send({ status: false, msg: "User Password is Requierd" });

        if (!isValidEmail(email))
            return res.status(400).send({ status: false, msg: "Enter Valid Email Id" });

        if (!userType) return res.status(400).send({ status: false, msg: "User type is Requierd" });

        if (userType == "admin") model = adminModel;
        if (userType == "user") model = userModel;

        let user = await model
            .findOne({ email: email, isDeleted: false })
            .select({ _id: 1, password: 1 })
            .lean();
        if (!user) return res.status(400).send({ status: false, msg: "User not Exist" });

        let actualPassword = await bcrypt.compare(password, user.password);

        if (!actualPassword)
            return res.status(400).send({ status: false, msg: "Incorrect email or password" });

        const userId = await bcrypt.hash(user["_id"].toString(), Number(process.env.SALT));
        let token = jwt.sign({ userId: userId }, process.env.TOKEN_KEY, {
            expiresIn: "1d",
        });
        // res.setHeader("Content-Type", "application/json");
        // res.set("Authorization", `Bearer ${token}`);
        res.cookie("token", `${token}`, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        });
        res.cookie("user", `${user._id}`, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        });

        return res.status(200).send({
            status: true,
            message: "User login successfully",
            data: { userId: user._id, token: token },
        });
    } catch (err) {
        return res.status(500).send({ status: false, data: err.message });
    }
};
module.exports = login;
