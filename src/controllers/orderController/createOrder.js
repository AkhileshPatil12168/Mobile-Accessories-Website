const bcrypt = require("bcrypt");

const userModel = require("../../models/userModel");
const cartModel = require("../../models/cartModel");
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

const createOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid userId." });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        let data = req.body;
        let { name, email, phone, address } = data;

        let userData = await userModel
            .findById(userId)
            .select({ fname: 1, lname: 1, email: 1, phone: 1, address: 1 })
            .lean();

        const cart = await cartModel
            .findOne({ userId: userId })
            .lean()
            .select({ updatedAt: 0, createdAt: 0, __v: 0 });

        if (!cart)
            return res
                .status(404)
                .send({ status: false, message: "cart not found to place an order.." });

        if (cart.items.length == 0)
            return res
                .status(404)
                .send({ status: false, message: "Cart is empty... First add Product to Cart." });

        if (name) {
            if (!isNotProvided(name))
                return res.status(400).send({ status: false, message: "provide the name" });
            name = validTrim(name);
            if (!isValidString(name))
                return res.status(400).send({ status: false, message: "enter a valid name" });
        } else name = userData.fname + " " + userData.lname;

        if (email) {
            if (!isNotProvided(email))
                return res.status(400).send({ status: false, message: "provide the email" });

            email = validTrim(email);
            if (!isValidEmail(email))
                return res.status(400).send({ status: false, message: "enter a valid email" });
        } else email = userData.email;

        if (phone) {
            if (!isNotProvided(phone))
                return res.status(400).send({ status: false, message: "provide the phone" });

            phone = validTrim(phone);
            if (!isValidPhone(phone))
                return res.status(400).send({ status: false, message: "enter a valid phone" });
        } else phone = userData.phone;

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
        } else address = userData.address;
        if (!address)
            return res.status(400).send({ status: false, message: "address is required" });

        let orderdedDate = Date.now() + 19800000;

        const orderData = {
            userId: userId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity: cart.totalQuantity,
            orderdedDate: orderdedDate,
            isFreeShipping: cart.isFreeShipping,
            status: "pending",
        };

        const orderCreated = await orderModel.create(orderData);

        await cartModel.findByIdAndUpdate(
            cart["_id"],
            { items: [], totalPrice: 0, totalItems: 0, totalQuantity: 0 },
            { new: true }
        );

        return res.status(201).send({ status: true, message: "Success", data: orderCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};
module.exports = createOrder;
