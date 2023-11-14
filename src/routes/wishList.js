const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const addToWishList = require("../controllers/wishListController/addToWishList")
const getWishList = require("../controllers/wishListController/getWishList")


Router.post("/user/:userId/product/:productId/wishlist",authentication,addToWishList)
Router.get("/user/:userId/wishlist",authentication,getWishList)

module.exports = Router