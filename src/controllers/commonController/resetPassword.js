const adminModel = require("../../models/adminModel");
const userModel = require("../../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSender = require("../NodeMailer/nodeMailer");

const {  isNotProvided, isValidEmail, isValidPwd } = require("../../utils/validators");

const requestResetPassword = async (req, res) => {
    try {
        let { email, userType } = req.body;

        let model;

        if (!email) return res.status(400).send({ status: false, message: "Email is Requierd" });

        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: "Enter Valid Email Id" });

        if (!userType) return res.status(400).send({ status: false, message: "User type is Requierd" });

        if (userType == "admin") model = adminModel;
        if (userType == "user") model = userModel;

        let user = await model
            .findOne({ email: email, isDeleted: false })
            .select({ _id: 1, email: 1 })
            .lean();
        if (user) {
            const userId = await bcrypt.hash(user["_id"].toString(), Number(process.env.SALT));
            let token = jwt.sign({ userId: userId }, process.env.TOKEN_KEY, {
                expiresIn: 60 * 5,
            });
            let resetLink = `http://localhost:3001/reset/${userType}/${user["_id"]}/resetpassword/${token}`;

            mailSender(user.email, "resetPassword", "reset password", resetLink);
            return res.status(200).send({ status: false, message: "email send successfully"});

        }
        return res.status(400).send({ status: false, message: "please check the email again" });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const userId = req.params.userId;
        let { password, re_password, userType } = req.body;
        let model;
        if (!isNotProvided(password))
            return res.status(400).send({ status: false, message: "provide the password" });

        password = password.trim();
        if (!isValidPwd(password))
            return res.status(400).send({ status: false, message: "enter a valid password" });

        if (!isNotProvided(re_password))
            return res.status(400).send({ status: false, message: "provide the password" });

        re_password = re_password.trim();
        if (!isValidPwd(re_password))
            return res.status(400).send({ status: false, message: "enter a valid password" });

        if (password !== re_password)
            return res.status(400).send({ status: false, message: "password does not mached" });

        if (userType == "user") model = userModel;
        if (userType == "admin") model = adminModel;

        password = await bcrypt.hash(password, Number(process.env.SALT));

        let updateData = await model.findByIdAndUpdate(
            userId,
            { password: password },
            {
                new: true,
            }
        );
        return res.status(200).send({
            status: true,
            message: "password updated successfully",
            data: updateData,
        });
    } catch (error) {
        return res.status(500).send({ status: false, data: error.message });
    }
};

module.exports = { requestResetPassword, resetPassword };
