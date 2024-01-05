const adminModel = require("../../models/adminModel");
const userModel = require("../../models/userModel");
const vendorModel = require("../../models/vendorModel");
const roleModel = require("../../models/roleModel");
const loginLogoutDataModel = require("../../models/loginLogoutDataModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { emptyBody, isValidEmail } = require("../../utils/validators");
const mailSender = require("../NodeMailer/nodeMailer");

const login = async (req, res) => {
  try {
    if (emptyBody(req.body))
      return res.status(400).send({ status: false, message: "Email and Password is Requierd" });

    const { email, password } = req.body;
    // let model;

    if (!email) return res.status(400).send({ status: false, message: "User Email is Requierd" });

    if (!password)
      return res.status(400).send({ status: false, message: "User Password is Requierd" });

    if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "Enter Valid Email Id" });

    let user = await roleModel
      .findOne({ email: email, isDeleted: false })
      .select({ originalId: 1, password: 1, roleRef: 1 })
      .lean();
    if (!user) return res.status(400).send({ status: false, message: "User not Exist" });

    let actualPassword = await bcrypt.compare(password, user.password);

    if (!actualPassword)
      return res.status(400).send({ status: false, message: "Incorrect email or password" });

    const userId = await bcrypt.hash(user["originalId"].toString(), Number(process.env.SALT));
    let token = jwt.sign({ userId: userId }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });
    // res.setHeader("Authorization", `Bearer ${token}`);
    // res.setHeader("Content-Type", "application/json");
    res.cookie("token", `${token}`, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      sameSite: "none",
      secure: true,
      domain: process.env.domain,
    });
    res.cookie(user.roleRef, `${user.originalId}`, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      sameSite: "none",
      secure: true,
      domain: process.env.domain,
    });

    mailSender(email, "login", "login successfully");
    let id;
    if (user.roleRef == "Admin") id = "adminId";
    if (user.roleRef == "Vendor") id = "vendorId";
    if (user.roleRef == "User") id = "userId";

    const data = {
      userType: user.roleRef,
      [id]: user.originalId,
      token,
      loginTime: Date.now() + 19800000,
    };

   await loginLogoutDataModel.create(data);
    return res.status(200).send({
      status: true,
      message: "User login successfully",
      data: { userType: user.roleRef, userId: user.originalId, token: token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, data: err.message });
  }
};
module.exports = login;
