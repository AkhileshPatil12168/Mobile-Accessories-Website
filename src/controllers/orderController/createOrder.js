const bcrypt = require("bcrypt");

const userModel = require("../../models/userModel");
const cartModel = require("../../models/cartModel");
const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const orderedProductModel = require("../../models/orderedProductsModel")

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

const orderSummery = async (req, res) => {
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

        let cartData = await cartModel
            .findOne({ userId: userId })
            .select({ isFreeShipping: 1, totalQuantity: 1, totalItems: 1, totalPrice: 1 })
            .lean();
        if (!cartData) return res.status(404).send({ status: false, message: "Cart Not Found" });

        return res.status(200).send({ status: true, message: "success", data: cartData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const createOrder = async (req, res) => {
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

        let data = req.body;
        let { name, email, phone, address } = data;

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

        if (!name) return res.status(400).send({ status: false, message: "name is requried" });
        if (!isNotProvided(name))
            return res.status(400).send({ status: false, message: "provide the name" });
        name = validTrim(name);
        if (!isValidString(name))
            return res.status(400).send({ status: false, message: "enter a valid name" });

            if (!email) return res.status(400).send({ status: false, message: "email is requried" });
        if (!isNotProvided(email))
            return res.status(400).send({ status: false, message: "provide the email" });

        email = validTrim(email);
        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: "enter a valid email" });

            if (!phone) return res.status(400).send({ status: false, message: "phone is requried" });
        if (!isNotProvided(phone))
            return res.status(400).send({ status: false, message: "provide the phone" });

        phone = validTrim(phone);
        if (!isValidPhone(phone))
            return res.status(400).send({ status: false, message: "enter a valid phone" });

        //data.address = JSON.parse(address);
        if(!address)return res.status(400).send({ status: false, message: "address is requried" });
        if (emptyBody(address))
            return res.status(400).send({ status: false, message: "provide the address" });

        if (!address)
            return res.status(400).send({ status: false, message: "address is required" });
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
                if (!pincode)
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
                if (!pincode)
                    return res
                        .status(400)
                        .send({ status: false, message: "billing pincode is required" });
                if (!isValidPincode(data.address.billing.pincode))
                    return res
                        .status(400)
                        .send({ status: false, message: "billing pincode is not valid" });
            }
        }

        const orderdedDate = Date.now() + 19800000;

        const productIds = cart.items.map((i) => i.productId);

        const productData = await productModel
            .find({ _id: { $in: productIds }, isDeleted: false })
            .select({ available_Quantity: 1,vendorId:1 }) 
            .lean();
        if (productData.length==0)
            return res.status(400).send({ status: false, message: "product not found" });

        for (let product of productData) {
            for (let cartItem of cart.items) {
                if (cartItem.productId == product["_id"].toString()) {
                    if (product.available_Quantity < cartItem.quantity)
                        return res.status(409).send({
                            status: false,
                            message: "product might be out of stock",
                            data: cartItem,
                        });

                    break;
                }
            }
        }


        const orderData = {
            userId: userId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            //items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity: cart.totalQuantity,
            orderdedDate: orderdedDate,
            isFreeShipping: cart.isFreeShipping,
        };

        const createOrder = await orderModel.create(orderData);

        const orderId = createOrder["_id"] 


        const orderedProducts = cart.items.map((product) => {
          return { ...product, totalPrice: product.price * product.quantity,userId:userId ,orderId};
        });

        const orderedProductId = [];
        for (let product of orderedProducts) {
          let { _id } = await orderedProductModel.create(product);
          orderedProductId.push({orderedProductId:_id});
        }
 
        const orderCreated = await orderModel
          .findByIdAndUpdate(orderId, { items: orderedProductId }, { new: true })
          .populate({
            path: "items.orderedProductId",
          })
          .lean();

        await cartModel.findByIdAndUpdate(
            cart["_id"], 
            { items: [], totalPrice: 0, totalItems: 0, totalQuantity: 0 },
            { new: true }
        );

        for (let cartItem of cart.items) {
            await productModel.findByIdAndUpdate(cartItem.productId, {
                $inc: { available_Quantity: -cartItem.quantity },
            });
        }
     

        return res.status(201).send({ status: true, message: "Success", data: {...orderData, items:orderedProducts} });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};
module.exports = { createOrder, orderSummery };
