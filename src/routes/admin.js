const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

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
const { approveVender, suspendVendor } = require("../controllers/adminController/handleVendor");

Router.post("/create/admin/", createAdmin);
Router.delete("/admin/:userId/profile", authentication, deleteAdmin);
Router.put("/admin/:userId/profile", authentication, updateAdmin);

Router.get("/admin/:userId/getusers/", authentication, getUsers);
Router.get("/admin/:userId/getuser/:customerUserId", authentication, getUser);

Router.get("/admin/:userId/orders", authentication, getOrdersAdmin);
Router.get("/admin/:userId/order/:orderId", authentication, getOrderByIdAdmin);
Router.put("/admin/:userId/order/:orderId", authentication, updateOrderByAdmin);

Router.get("/admin/:userId/products", authentication, getProductByFilterAdmin);
Router.get("/admin/:userId/products/:productId", authentication, getProductByIdAdmin);

Router.put("/admin/:userId/vendor/:vendorId", authentication, approveVender);
Router.put("/admin/:userId/vendor/:vendorId", authentication, suspendVendor);

module.exports = Router;
