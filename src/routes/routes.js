const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const login = require("../controllers/commonController/commonLogin");
const {
    requestResetPassword,
    resetPassword,
} = require("../controllers/commonController/resetPassword");

const createAdmin = require("../controllers/adminController/createAdmin");
const updateAdmin = require("../controllers/adminController/updateAdmin");
const deleteAdmin = require("../controllers/adminController/deleteAdmin");
const { getUsers, getUser } = require("../controllers/adminController/getUsers");
const { getOrdersAdmin, getOrderByIdAdmin } = require("../controllers/adminController/getOrders");
const updateOrderByAdmin = require("../controllers/adminController/updateOrders");
const {
    getProductByFilterAdmin,
    getProductByIdAdmin,
} = require("../controllers/adminController/getProductAdmin");

const createUser = require("../controllers/userController/createUser");
const getUserDetails = require("../controllers/userController/getUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");
const contactUs = require("../controllers/userController/contactUs")

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

const { createOrder, orderSummery } = require("../controllers/orderController/createOrder");
const { getOrders, getOrderById } = require("../controllers/orderController/getOrder");
const updateOrder = require("../controllers/orderController/updateOrder");
const deleteOrder = require("../controllers/orderController/deleteOrder");
const cancleOrder = require("../controllers/orderController/cancleOrder");
//-------------------------------------------------------------------------------------

//_____COMMON ROUTES_____
Router.post("/login/user/", login);
Router.post("/request/resetpassword/", requestResetPassword);
Router.put("/:userId/reset/password/:token", authentication, resetPassword);

//_____ADMIN_____
Router.post("/create/admin/", createAdmin);
Router.delete("/admin/:userId/profile", authentication, deleteAdmin);
Router.get("/admin/:userId/getusers/", authentication, getUsers);
Router.get("/admin/:userId/getuser/:customerUserId", authentication, getUser);
Router.put("/admin/:userId/profile", authentication, updateAdmin);
Router.get("/admin/:userId/orders", authentication, getOrdersAdmin);
Router.get("/admin/:userId/order/:orderId", authentication, getOrderByIdAdmin);
Router.put("/admin/:userId/order/:orderId", authentication, updateOrderByAdmin);
Router.get("/admin/:userId/products", authentication, getProductByFilterAdmin);
Router.get("/admin/:userId/products/:productId",authentication, getProductByIdAdmin);

//_____USER_____
Router.post("/create/user/", createUser);
Router.get("/user/:userId/profile", authentication, getUserDetails);
Router.put("/user/:userId/profile", authentication, updateUser);
Router.delete("/user/:userId/profile", authentication, deleteUser);
Router.post("/user/:userId/contactus", authentication, contactUs)

//_____PRODUCT_____
Router.post("/admin/:userId/create/product", authentication, createdProduct);
Router.get("/products", getProductByFilter);
Router.get("/products/:productId", getProductById);
Router.put("/admin/:userId/products/:productId", authentication, updateProduct);
Router.delete("/admin/:userId/products/:productId", authentication, delProduct);

//_____CART_____
Router.put("/user/:userId/cart", authentication, updatCart);
Router.get("/user/:userId/cart", authentication, getCart);
Router.delete("/user/:userId/cart", authentication, emptyCart);

//_____USER ORDER_____
Router.get("/user/:userId/order/summery", authentication, orderSummery);
Router.post("/user/:userId/order", authentication, createOrder);
Router.get("/user/:userId/orders", authentication, getOrders);
Router.get("/user/:userId/order/:orderId", authentication, getOrderById);
Router.put("/user/:userId/order/:orderId", authentication, updateOrder);
Router.put("/user/:userId/order/cancleorder/:orderId/", authentication, cancleOrder);
Router.delete("/user/:userId/order/deleteorder/:orderId", authentication, deleteOrder);

//_____TEST APIs_____
Router.post("/set", (req, res) => {
    // res.cookie("token", "a;sldfkjalsdjkfj;alsdjkfalsdjfjalsdjkfj", {
    //     expires: new Date(Date.now() + 25000),
    //     httpOnly: true,
    // });
    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("x-api-token", `Bearer $token`);
    res.setHeader('Authorization', `Bearer a;slkdfj;alskdfj;alskdfj;alksdfja;lsdkfja;lsdkfj`)

    res.send({ data: "head is set" });
});
const { getToken } = require("../utils/utilityFunctions");
Router.get("/app", (req, res) => {
    const data = req.cookies;
    const Headers = req.rawHeaders;
    let token = getToken(Headers);
    res.send({ data: data, token: token });
});

const removeCart = require("../controllers/test/otherOpreations");

Router.post("/removecart", removeCart);

//_____FOR NOT VALID APIs_____
Router.all("/*", (req, res) => {
    res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
