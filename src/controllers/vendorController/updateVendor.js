const bcrypt = require("bcrypt");

const vendorModel = require("../../models/vendorModel");

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

const updateVendor = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const userData = await vendorModel.findById(userId);
        if (!userData) return res.status(404).send({ status: false, message: "user not found." });

        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });
        let files = req.files;
        let data = req.body;

        let { fname,mname, lname, email, phone, password, address, image } = data;

        if (fname) {
            if (!isNotProvided(fname))
                return res.status(400).send({ status: false, message: "provide the fname" });

            data.fname = validTrim(fname);
            if (!isValidWord(data.fname))
                return res.status(400).send({ status: false, message: "enter a valid fname" });
        }
        if (mname) {
            if (!isNotProvided(mname))
                return res.status(400).send({ status: false, message: "provide the mname" });

            data.mname = validTrim(mname);
            if (!isValidWord(data.mname))
                return res.status(400).send({ status: false, message: "enter a valid mname" });
        }

        if (lname) {
            if (!isNotProvided(lname))
                return res.status(400).send({ status: false, message: "provide the lname" });

            data.lname = validTrim(lname);
            if (!isValidWord(data.lname))
                return res.status(400).send({ status: false, message: "enter a valid lname" });
        }

        if (email) {
            if (!isNotProvided(email))
                return res.status(400).send({ status: false, message: "provide the email" });

            data.email = validTrim(email);
            if (!isValidEmail(data.email))
                return res.status(400).send({ status: false, message: "enter a valid email" });
        }

        let checkEmail = await vendorModel.findOne({ email: data.email });
        if (checkEmail)
            return res.status(400).send({ status: false, message: "Email already exist" });

        if (phone) {
            if (!isNotProvided(phone))
                return res.status(400).send({ status: false, message: "provide the phone" });

            data.phone = validTrim(phone);
            if (!isValidPhone(data.phone))
                return res.status(400).send({ status: false, message: "enter a valid phone" });
        }

        let checkPhone = await vendorModel.findOne({ phone: data.phone });
        if (checkPhone)
            return res.status(400).send({ status: false, message: "Phone number already exist" });

        if (password) {
            if (!isNotProvided(password))
                return res.status(400).send({ status: false, message: "provide the password" });

            password = password.trim();
            if (!isValidPwd(password))
                return res.status(400).send({ status: false, message: "enter a valid password" });
            data.password = await bcrypt.hash(password, Number(process.env.SALT));
        }

        if (address) {
            data.address = JSON.parse(address);
            if (!isNotProvided(address))
                return res.status(400).send({ status: false, message: "provide the address" });

            let { street, city, state, pincode} = data.address;

            if (shipping) {
                let { street, city,state, pincode } = shipping;
                

                if (street || street == "") {
                    if (!isNotProvided(street))
                        return res.status(400).send({
                            status: false,
                            message: "shipping street address is required",
                        });
                    data["street"] = validTrim(street);
                    if (!data.street)
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
                    data.city = validTrim(city);
                    if (!data.city)
                        return res.status(400).send({
                            status: false,
                            message: "shipping city address is required",
                        });
                }

                if (state || state == "") {
                    if (!isNotProvided(state))
                        return res.status(400).send({
                            status: false,
                            message: "shipping state is required",
                        });
                    data.state = validTrim(state);
                    if (!data.state)
                        return res.status(400).send({
                            status: false,
                            message: "shipping state is required",
                        });
                }

                if (pincode || pincode == "") {
                    if (!isNotProvided(shipping.pincode))
                        return res
                            .status(400)
                            .send({ status: false, message: "shipping pincode is required" });
                    data.pincode = shipping.pincode.trim();
                    if (!data.pincode)
                        return res
                            .status(400)
                            .send({ status: false, message: "shipping pincode is required" });
                    if (!isValidPincode(data.pincode))
                        return res.status(400).send({
                            status: false,
                            message: "shipping pincode is not valid",
                        });
                }
            }
          

            
        }
        if (files.length > 0) {
            if (!isValidImage(files[0].originalname))
                return res.status(400).send({ status: false, message: "provide a valid image" });
            data.image = await uploadFile(files[0], "vendor/");
        }

        let updateData = await userModel.findByIdAndUpdate(userId, data, {
            new: true,
        });
        res.status(200).send({
            status: true,
            message: "Update profile is successful",
            data: updateData,
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = updateVendor;
