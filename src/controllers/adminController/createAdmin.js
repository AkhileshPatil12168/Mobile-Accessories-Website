const adminModel = require("../../models/adminModel");
const roleModel = require("../../models/roleModel");
const bcrypt = require("bcrypt");

const {
  emptyBody,
  validTrim,
  isValidEmail,
  isValidPwd,
  isValidString,isValidPhone,
  isValidUserName,
} = require("../../utils/validators");

const createAdmin = async (req, res) => {
  try {
    let { userName, email, phone, password, secretKey } = req.body;

    if (emptyBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "provide some data" });

    if (!userName)
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    userName = validTrim(userName);

    if (!isValidUserName(userName))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid userName" });

    let checkUserName = await adminModel.findOne({ userName: userName });
    if (checkUserName)
      return res
        .status(400)
        .send({ status: false, message: "userName already exist" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    email = validTrim(email);
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid email" });

    let checkEmail = await adminModel.findOne({ email: email });
    if (checkEmail)
      return res
        .status(400)
        .send({ status: false, message: "Email already exist" });

    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "phone is required" });
    phone = validTrim(phone);
    if (!isValidPhone(phone))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid phone" });

    let checkPhone = await adminModel.findOne({ phone: phone });
    if (checkPhone)
      return res
        .status(400)
        .send({ status: false, message: "Phone number already exist" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    password = password.trim();
    if (!isValidPwd(password))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid password" });
    password = await bcrypt.hash(password, Number(process.env.SALT));

    if (!secretKey)
      return res
        .status(400)
        .send({ status: false, message: "secretKey is mandatory" });
    secretKey = secretKey.trim();
    if (!isValidString(secretKey))
      return res
        .status(400)
        .send({ status: false, message: "not a valid format of secretKey" });
    if (secretKey !== process.env.secretKey)
      return res
        .status(400)
        .send({ status: false, message: "secretKey is not correct" });

    const admin = {
      userName: userName,
      email: email,
      phone: phone,
      password: password,
    };
    const createAdmin = await adminModel.create(admin);
    const createRole = await roleModel.create({
        originalId:createAdmin._id,
      email: email,
      phone: phone,
      password: password,
      roleRef: "Admin",    

    });
    res.status(201).send({
      status: true,
      message: "Admin created successfully",
      data: createAdmin,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = createAdmin;
