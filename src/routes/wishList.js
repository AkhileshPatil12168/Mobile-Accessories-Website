const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const addToWishList = require("../controllers/wishListController/addToWishList");
const getWishList = require("../controllers/wishListController/getWishList");
const deleteItemWishList = require("../controllers/wishListController/removeFromWishList");

Router.put("/user/:userId/product/:productId/wishlist", authentication, addToWishList);
Router.get("/user/:userId/wishlist", authentication, getWishList);
Router.delete("/user/:userId/wishlist/:wishListId/item/:itemId",authentication,deleteItemWishList);

module.exports = Router;
