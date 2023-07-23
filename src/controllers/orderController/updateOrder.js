const bcrypt = require("bcrypt");

const orderModel = require("../../models/orderModel");

const {
    emptyBody,
    isNotProvided,
    validTrim,
    isValidEmail,
    isValidPhone,
    isValidPincode,
    isValidObjectId,
    isValidString,
} = require("../../utils/validators");

const updateOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        const orderId = req.params.orderId;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        if (!isValidObjectId(orderId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid orderId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });
        if (emptyBody(req.body))
            return res.status(400).send({ status: false, message: "provide some data" });
        const data = req.body;

        const orderStatus = await orderModel.findById(orderId).select({ status: 1 }).lean();
        if (orderStatus.status == "cancelled" || orderStatus.status == "completed")
            return res
                .status(400)
                .send({ status: false, message: "this order can not be updated" });

        let { name, phone, email, address, cancle } = data;

        if (name) {
            if (!isNotProvided(name))
                return res.status(400).send({ status: false, message: "provide the name" });
            name = validTrim(name);
            if (!isValidString(name))
                return res.status(400).send({ status: false, message: "enter a valid name" });
        }

        if (email) {
            if (!isNotProvided(email))
                return res.status(400).send({ status: false, message: "provide the email" });

            email = validTrim(email);
            if (!isValidEmail(email))
                return res.status(400).send({ status: false, message: "enter a valid email" });
        }

        if (phone) {
            if (!isNotProvided(phone))
                return res.status(400).send({ status: false, message: "provide the phone" });

            phone = validTrim(phone);
            if (!isValidPhone(phone))
                return res.status(400).send({ status: false, message: "enter a valid phone" });
        }

        if (address) {
            data.address = JSON.parse(address);
            if (!isNotProvided(address))
                return res.status(400).send({ status: false, message: "provide the address" });

            let { shipping, billing } = data.address;

            if (shipping) {
                let { street, city, pincode } = shipping;
                if (emptyBody(shipping))
                    return res.status(400).send({ status: false, message: "provide the address" });

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

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            {
                name: name,
                phone: phone,
                email: email,
                address: address,
            },
            { new: true }
        );
        return res.status(200).send({ status: true, message: "order updated", data: updatedOrder });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = updateOrder;
