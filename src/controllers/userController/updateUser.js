const userModel = require("../../models/userModel");
const roleModel = require("../../models/roleModel");
const bcrypt = require("bcrypt");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
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
  isValidObjectId,
} = require("../../utils/validators");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const decodedToken = req.verifyed;

    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: "Please provide userId." });

    if (!isValidObjectId(userId))
      return res
        .status(403)
        .send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res
        .status(403)
        .send({ status: false, message: "please login again" });

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .send({ status: false, message: "user not found." });

    if (emptyBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "provide some data" });
    let files = req.files;
    let data = req.body;

    let { fname, lname, email, phone, password, address, profileImgUrl } = data;

    if (fname) {
      if (!isNotProvided(fname))
        return res
          .status(400)
          .send({ status: false, message: "provide the fname" });

      data.fname = validTrim(fname);
      if (!isValidWord(data.fname))
        return res
          .status(400)
          .send({ status: false, message: "enter a valid fname" });
    }

    if (lname) {
      if (!isNotProvided(lname))
        return res
          .status(400)
          .send({ status: false, message: "provide the lname" });

      data.lname = validTrim(lname);
      if (!isValidWord(data.lname))
        return res
          .status(400)
          .send({ status: false, message: "enter a valid lname" });
    }

    if (email) {
      if (!isNotProvided(email))
        return res
          .status(400)
          .send({ status: false, message: "provide the email" });

      data.email = validTrim(email);
      if (!isValidEmail(data.email))
        return res
          .status(400)
          .send({ status: false, message: "enter a valid email" });
    }

    let checkEmail = await userModel.findOne({ email: data.email });
    if (checkEmail)
      return res
        .status(400)
        .send({ status: false, message: "Email already exist" });

    if (phone) {
      if (!isNotProvided(phone))
        return res
          .status(400)
          .send({ status: false, message: "provide the phone" });

      data.phone = validTrim(phone);
      if (!isValidPhone(data.phone))
        return res
          .status(400)
          .send({ status: false, message: "enter a valid phone" });
    }

    let checkPhone = await userModel.findOne({ phone: data.phone });
    if (checkPhone)
      return res
        .status(400)
        .send({ status: false, message: "Phone number already exist" });

    if (password) {
      if (!isNotProvided(password))
        return res
          .status(400)
          .send({ status: false, message: "provide the password" });

      password = password.trim();
      if (!isValidPwd(password))
        return res
          .status(400)
          .send({ status: false, message: "enter a valid password" });
      data.password = await bcrypt.hash(password, Number(process.env.SALT));
    }

    if (address) {
      data.address = JSON.parse(address);
      if (!isNotProvided(address))
        return res
          .status(400)
          .send({ status: false, message: "provide the address" });

      let { shipping, billing } = data.address;

      if (shipping) {
        let { street, city, pincode } = shipping;
        if (emptyBody(shipping))
          return res
            .status(400)
            .send({ status: false, message: "provide the address" });

        if (street || street == "") {
          if (!isNotProvided(street))
            return res.status(400).send({
              status: false,
              message: "shipping street address is required",
            });
          data.address.shipping["street"] = validTrim(street);
          if (!data.address.shipping.street)
            return res.status(400).send({
              status: false,
              message: "shipping street address is required",
            });
        }

        if (city || city == "") {
          if (!isNotProvided(city))
            return res.status(400).send({
              status: false,
              message: "shipping city address is required",
            });
          data.address.shipping.city = validTrim(city);
          if (!data.address.shipping.city)
            return res.status(400).send({
              status: false,
              message: "shipping city address is required",
            });
        }

        if (pincode || pincode == "") {
          if (!isNotProvided(shipping.pincode))
            return res
              .status(400)
              .send({ status: false, message: "shipping pincode is required" });
          data.address.shipping.pincode = shipping.pincode.trim();
          if (!data.address.shipping.pincode)
            return res
              .status(400)
              .send({ status: false, message: "shipping pincode is required" });
          if (!isValidPincode(data.address.shipping.pincode))
            return res.status(400).send({
              status: false,
              message: "shipping pincode is not valid",
            });
        }
      }
      //_____________________________________

      if (billing) {
        let { street, city, pincode } = billing;
        if (street || street == "") {
          if (!isNotProvided(street))
            return res.status(400).send({
              status: false,
              message: "billing street address is required",
            });
          data.address.billing.street = validTrim(street);
          if (!data.address.billing.street)
            return res.status(400).send({
              status: false,
              message: "billing street address is required",
            });
        }

        //_________________________
        if (city || city == "") {
          if (!isNotProvided(city))
            return res.status(400).send({
              status: false,
              message: "billing city address is required",
            });
          data.address.billing.city = validTrim(city);
          if (!data.address.billing.city)
            return res.status(400).send({
              status: false,
              message: "billing city address is required",
            });
        }

        //___________________________
        if (pincode || pincode == "") {
          if (!isNotProvided(pincode))
            return res
              .status(400)
              .send({ status: false, message: "billing pincode is required" });
          data.address.billing.pincode = validTrim(pincode);
          if (!data.address.billing.pincode)
            return res
              .status(400)
              .send({ status: false, message: "billing pincode is required" });
          if (!isValidPincode(data.address.billing.pincode))
            return res
              .status(400)
              .send({ status: false, message: "billing pincode is not valid" });
        }
      }
    }
    if (files.length > 0) {
      if (!isValidImage(files[0].originalname))
        return res
          .status(400)
          .send({ status: false, message: "provide a valid image" });
      profileImage = await uploadFile(files[0], "profile/");
    }

    let updateData = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (data.email || data.password || data.phone) {
      await roleModel.findOneAndUpdate(
        { originalId: userId },
        { email: data.email, password: data.password, phone: data.phone },
        { new: true }
      );
    }

    return res.status(200).send({
      status: true,
      message: "Update user profile is successful",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = updateUser;
