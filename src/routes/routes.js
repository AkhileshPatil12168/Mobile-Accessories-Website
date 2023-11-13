const express = require("express");
const Router = express.Router();

const commonRoute = require("./common");
const adminRoute = require("./admin");
const userRoute = require("./user");
const vendorRoute = require("./vendor");
const productRoute = require("./product");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const testRoute = require("./test");
const reviewRoute = require("./review")

Router.use(commonRoute);
Router.use(adminRoute);
Router.use(userRoute);
Router.use(vendorRoute);
Router.use(productRoute);
Router.use(cartRoute);
Router.use(orderRoute);
Router.use(testRoute);
Router.use(reviewRoute);

//_____FOR NOT VALID APIs_____
Router.all("/*", (req, res) => {
  res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
