const bcrypt = require("bcrypt");

const productModel = require("../../models/productModel");
const cartModel = require("../../models/cartModel");

const { isValidObjectId } = require("../../utils/validators");

const updatCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        let { productId, value } = req.body;

        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
            return res.status(403).send({ status: false, message: "please login again" });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });

        const productData = await productModel.findById(productId, { isDeleted: false }).lean();
        if (!productData)
            return res.status(400).send({ status: false, message: "product not found" });
        let userCart = await cartModel.findOne({ userId: userId }).lean();
        if(!userCart){
           userCart = await cartModel.create({
                userId: userId,
                totalQuantity: 0,
                totalPrice: 0,
                totalItems: 0,
            });
        }

        if (userCart.totalItems > 0) {
            if (value == 1) {
                for (let item of userCart.items) {
                    if (item.productId == productId) {
                        if (productData.available_Quantity < 1)
                            return res
                                .status(400)
                                .send({ status: false, message: "no more product left" });
                        item.quantity = item.quantity + 1;
                        if (item.quantity > productData.available_Quantity)
                            return res
                                .status(400)
                                .send({ status: false, message: "no more product left" });
                        userCart.totalPrice += productData.price;
                        userCart.totalQuantity = userCart.totalQuantity + 1;
                        break;
                    }
                    if (userCart.items.indexOf(item) + 1 == userCart.items.length) {
                        if (productData.available_Quantity < 1)
                            return res
                                .status(400)
                                .send({ status: false, message: "no more product left" });
                        userCart.items.push({
                            productId: productId,
                            title: productData.title,
                            price: productData.price,
                            productImage: productData.productImage,
                            quantity: 1,
                        });
                        userCart.totalPrice += productData.price;
                        userCart.totalQuantity = userCart.totalQuantity + 1;
                        userCart.totalItems = userCart.totalItems + 1;
                        if (userCart.totalPrice > 500) userCart.isFreeShipping = true;
                        else userCart.isFreeShipping = false;
                        break;
                    }
                }
            }
            if (value == -1) {
                if (userCart.items.length == 0)
                    return res.status(400).send({ status: false, message: "cart is empty" });
                for (let item of userCart.items) {
                    if (item.productId == productId) {
                        item.quantity = item.quantity - 1;
                        userCart.totalPrice -= productData.price;
                        userCart.totalQuantity = userCart.totalQuantity - 1;
                        if (item.quantity == 0) {
                            userCart.totalItems = userCart.totalItems - 1;
                            userCart.items.splice(userCart.items.indexOf(item), 1);
                            break;
                        }
                        break;
                    }
                }
            }

            const cart = await cartModel.findByIdAndUpdate(
                userCart["_id"],
                {
                    items: userCart.items,
                    totalPrice: userCart.totalPrice,
                    totalItems: userCart.totalItems,
                    totalQuantity: userCart.totalQuantity,
                    isFreeShipping: userCart.isFreeShipping,
                },
                { new: true }
            );
            return res
                .status(201)
                .send({ status: true, message: "Product has been added to the Cart", data: cart });
        } else {
            if (userCart.items.length == 0 && value == -1)
                return res.status(400).send({ status: false, message: "cart is empty" });

            if (productData.available_Quantity < 1)
                return res.status(400).send({ status: false, message: "no more product left" });
            const cart = await cartModel.findByIdAndUpdate(
                userCart["_id"],
                {
                    items: [
                        {
                            productId: productId,
                            title: productData.title,
                            price: productData.price,
                            productImage: productData.productImage,
                            quantity: 1,
                        },
                    ],
                    totalPrice: productData.price,
                    totalItems: 1,
                    totalQuantity: 1,
                    isFreeShipping: productData.isFreeShipping,
                },
                { new: true }
            );
            return res
                .status(201)
                .send({ status: true, message: "Product has been added to the Cart", data: cart });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = updatCart;
