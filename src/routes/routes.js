const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const login = require("../controllers/loginController/commonLogin");

const createUser = require("../controllers/userController/createUser");
const getUserDetails = require("../controllers/userController/getUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");

const createdProduct = require("../controllers/productController/createProduct");
const {
    getProductByFilter,
    getProductById,
} = require("../controllers/productController/getProduct");
const updateProduct = require("../controllers/productController/updateProduct");
const delProduct = require("../controllers/productController/deleteProduct");

const updatCart = require("../controllers/cartController/updateCart");
const getCart = require("../controllers/cartController/getCart");
const emptyCart = require("../controllers/cartController/emptyCart");

const createOrder = require("../controllers/orderController/createOrder");
const { getOrder, getOrderById } = require("../controllers/orderController/getOrder");
const updateOrder = require("../controllers/orderController/updateOrder");
const deleteOrder = require("../controllers/orderController/deleteOrder");
const cancleOrder = require("../controllers/orderController/cancleOrder");



Router.post("/create/user/", createUser);
Router.post("/login/user/", login);
Router.get("/user/:userId/profile", authentication, getUserDetails);
Router.put("/user/:userId/profile", authentication, updateUser);
Router.delete("/user/:userId/profile", authentication, deleteUser);

Router.post("/admin/create/product", authentication, createdProduct);
Router.get("/products", getProductByFilter);
Router.get("/products/:productId", getProductById);
Router.put("/admin/products/:productId", authentication, updateProduct);
Router.delete("/admin/products/:productId", authentication, delProduct);

Router.put("/user/:userId/cart", authentication, updatCart);
Router.get("/user/:userId/cart", authentication, getCart);
Router.delete("/user/:userId/cart", authentication, emptyCart);

Router.post("/user/:userId/order", authentication, createOrder);
Router.get("/user/:userId/order", authentication, getOrder);
Router.get("/user/:userId/order/:orderId", authentication, getOrderById);
Router.put("/user/:userId/order/:orderId", authentication, updateOrder);
Router.put("/user/:userId/order/cancleorder/:orderId/", authentication, cancleOrder);
Router.delete("/user/:userId/order/:orderId", authentication, deleteOrder);

Router.get("/app", (req, res) => {
    res.send({ data: { name: "akhilesh", lname: "patil", age: 20 } });
});

Router.all("/*", (req, res) => {
    res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
