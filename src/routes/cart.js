const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const updatCart = require("../controllers/cartController/updateCart");
const getCart = require("../controllers/cartController/getCart");
const emptyCart = require("../controllers/cartController/emptyCart");

Router.put("/user/:userId/cart", authentication, updatCart);
Router.get("/user/:userId/cart", authentication, getCart);
Router.delete("/user/:userId/cart", authentication, emptyCart);

module.exports = Router;
