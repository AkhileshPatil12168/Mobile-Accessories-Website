const userModel = require("../../models/userModel");
const cartModel = require("../../models/cartModel");
const roleModel = require("../../models/roleModel");
const bcrypt = require("bcrypt");
const uploadFile = require("../Amazom S3 Bucket/bucketController");
const mailSender = require("../NodeMailer/nodeMailer");
const {
  emptyBody,
  isNotProvided,
  validTrim,
  isValidWord,
  isValidEmail,
  isValidPhone,
  isValidPwd,
  isValidPincode,
  isValidImage,
} = require("../../utils/validators");

const createUser = async (req, res) => {
  try {
    let files = req.files;

    let { fname, lname, email, phone, password, address, profileImage } =
      req.body;

    let streetS, cityS, pincodeS, streetB, cityB, pincodeB;

    if (emptyBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "provide some data" });

    if (!fname)
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    fname = validTrim(fname);
    if (!isValidWord(fname))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid fname" });

    if (!lname)
      return res
        .status(400)
        .send({ status: false, message: "last name is required" });
    lname = validTrim(lname);
    if (!isValidWord(lname))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid lname" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    email = validTrim(email);
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid email" });

    let checkEmail = await roleModel.findOne({ email: email });
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

    let checkPhone = await roleModel.findOne({ phone: phone });
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

    if (address) {
      let { shipping, billing } = JSON.parse(address);

      if (!shipping)
        return res
          .status(400)
          .send({ status: false, message: "shipping address is required" });

      if (!isNotProvided(shipping.street))
        return res.status(400).send({
          status: false,
          message: "shipping street address is required",
        });
      streetS = validTrim(shipping.street);
      if (!streetS)
        return res.status(400).send({
          status: false,
          message: "shipping street address is required",
        });

      if (!isNotProvided(shipping.city))
        return res.status(400).send({
          status: false,
          message: "shipping city address is required",
        });
      cityS = validTrim(shipping.city);
      if (!cityS)
        return res.status(400).send({
          status: false,
          message: "shipping city address is required",
        });

      if (!isNotProvided(shipping.pincode))
        return res
          .status(400)
          .send({ status: false, message: "shipping pincode is required" });
      pincodeS = shipping.pincode.trim();
      if (!pincodeS)
        return res
          .status(400)
          .send({ status: false, message: "shipping pincode is required" });
      if (!isValidPincode(pincodeS))
        return res
          .status(400)
          .send({ status: false, message: "shipping pincode is not valid" });

      //_____________________________________

      if (!billing)
        return res
          .status(400)
          .send({ status: false, message: "billing address is required" });

      if (!isNotProvided(billing.street))
        return res.status(400).send({
          status: false,
          message: "billing street address is required",
        });
      streetB = validTrim(billing.street);
      if (!streetB)
        return res.status(400).send({
          status: false,
          message: "billing street address is required",
        });
      //_________________________
      if (!isNotProvided(billing.city))
        return res
          .status(400)
          .send({ status: false, message: "billing city address is required" });
      cityB = validTrim(billing.city);
      if (!cityB)
        return res
          .status(400)
          .send({ status: false, message: "billing city address is required" });
      //___________________________
      if (!isNotProvided(billing.pincode))
        return res
          .status(400)
          .send({ status: false, message: "billing pincode is required" });
      pincodeB = validTrim(billing.pincode);
      if (!pincodeB)
        return res
          .status(400)
          .send({ status: false, message: "billing pincode is required" });
      if (!isValidPincode(pincodeB))
        return res
          .status(400)
          .send({ status: false, message: "billing pincode is not valid" });
    }

    if (files.length > 0) {
      if (!isValidImage(files[0].originalname))
        return res
          .status(400)
          .send({ status: false, message: "provide a valid image" });

      profileImage = await uploadFile(files[0], "profile/");
    }

    let user = {
      fname: fname,
      lname: lname,
      email: email,
      profileImage: profileImage,
      phone: phone,
      password: password,
      address: {
        shipping: {
          street: streetS,
          city: cityS,
          pincode: pincodeS,
        },
        billing: {
          street: streetB,
          city: cityB,
          pincode: pincodeB,
        },
      },
    };
    const createUser = await userModel.create(user);
    await cartModel.create({
      userId: createUser["_id"],
      totalQuantity: 0,
      totalPrice: 0,
      totalItems: 0,
    });
    const createRole = await roleModel.create({
      originalId: createUser._id,
      email: email,
      password: password,
      phone: phone,
      roleRef: "User",
    });

    mailSender(email, "singUp", "registeration successful");

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: createUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = createUser;
