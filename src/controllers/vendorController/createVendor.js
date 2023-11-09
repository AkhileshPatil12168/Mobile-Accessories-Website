const vendorModel = require("../../models/vendorModel");

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

const createVendor = async (req, res) => {
  try {
    let files = req.files;

    let { fname, mname, lname, email, phone, password, address, image } =
      req.body;

    // let street, city,state, pincode;

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

    if (!mname)
      return res
        .status(400)
        .send({ status: false, message: "middle name is required" });
    mname = validTrim(mname);
    if (!isValidWord(mname))
      return res
        .status(400)
        .send({ status: false, message: "enter a valid mname" });

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

    let checkEmail = await vendorModel.findOne({ email: email });
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

    let checkPhone = await vendorModel.findOne({ phone: phone });
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
      let { street, city, state, pincode } = JSON.parse(address);

      if (!isNotProvided(street))
        return res.status(400).send({
          status: false,
          message: "street address is required",
        });
      street = validTrim(street);
      if (!street)
        return res.status(400).send({
          status: false,
          message: "street address is required",
        });

      if (!isNotProvided(city))
        return res.status(400).send({
          status: false,
          message: "city address is required",
        });
      city = validTrim(city);
      if (!city)
        return res.status(400).send({
          status: false,
          message: "city address is required",
        });

     
      if (!isNotProvided(state))
        return res.status(400).send({
          status: false,
          message: "state is required",
        });
      state = validTrim(state);
      if (!state)
        return res.status(400).send({
          status: false,
          message: "state is required",
        });

      if (!isNotProvided(pincode))
        return res
          .status(400)
          .send({ status: false, message: "pincode is required" });
      pincode = pincode.trim();
      if (!pincode)
        return res
          .status(400)
          .send({ status: false, message: "pincode is required" });
      if (!isValidPincode(pincode))
        return res
          .status(400)
          .send({ status: false, message: "pincode is not valid" });
    }

    if (files.length > 0) {
      if (!isValidImage(files[0].originalname))
        return res
          .status(400)
          .send({ status: false, message: "provide a valid image" });

      profileImage = await uploadFile(files[0], "vendor/");
    }

    let vendorInfo = {
      fname,
      mname,
      lname,
      email,
      image,
      phone,
      password,
      address: {
        street,
        city,
        state,
        pincode,
      },
    };
    const vendor = await vendorModel.create(vendorInfo);

    const createRole = await roleModel.create({
      originalId: vendor._id,
      email: email,
      password: password,
      phone: phone,
      roleRef: "Vendor",
    });

    mailSender(email, "singUp", "registeration successful");

    return res.status(201).send({
      status: true,
      message: "account created successfully",
      data: vendorInfo,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = createVendor;
