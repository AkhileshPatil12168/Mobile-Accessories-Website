const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const createVendor = require("../controllers/vendorController/createVendor");
const getVendorDetails = require("../controllers/vendorController/getVendor");
const {
  getProductsByVendor,
  getProductByIdVendor,
} = require("../controllers/vendorController/getProductVendor");
const updateVendor = require("../controllers/vendorController/updateVendor");
const deleteVendor = require("../controllers/vendorController/deleteVendor");

Router.post("/create/vendor", createVendor);
Router.get("/vendor/:userId/details", authentication, getVendorDetails);
Router.get("/vendor/:userId/products", authentication, getProductsByVendor);
Router.get("/vendor/:userId/product", authentication, getProductByIdVendor);
Router.put("/vendor/:userId/details", authentication, updateVendor);
Router.delete("/vendor/:userId/delete", authentication, deleteVendor);

module.exports = Router;
