const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const { createOrder, orderSummery } = require("../controllers/orderController/createOrder");
const { getOrders, getOrderById } = require("../controllers/orderController/getOrder");
const updateOrder = require("../controllers/orderController/updateOrder");
const deleteOrder = require("../controllers/orderController/deleteOrder");
const cancleOrder = require("../controllers/orderController/cancleOrder");

Router.get("/user/:userId/order/summery", authentication, orderSummery);
Router.post("/user/:userId/order", authentication, createOrder);
Router.get("/user/:userId/orders", authentication, getOrders);
Router.get("/user/:userId/order/:orderId", authentication, getOrderById);
Router.put("/user/:userId/order/:orderId", authentication, updateOrder);
Router.put("/user/:userId/order/cancleorder/:orderId/", authentication, cancleOrder);
Router.delete("/user/:userId/order/deleteorder/:orderId", authentication, deleteOrder);

module.exports = Router;
