const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const getLoginLogoutData = require("../controllers/reports/loginLogoutReport");
const registeredUserData = require("../controllers/reports/user/registeredUsers");
const {spendAnalysisUsers,spendAnalysisUser} = require("../controllers/reports/user/spendsAnalysisUser");
const getUserReviews = require("../controllers/reports/user/reviewsAndRatings");
const selledProducts = require("../controllers/reports/vendor/selledProducts");
const productInventory = require("../controllers/reports/vendor/ProductInventory");
const totalOrders = require("../controllers/reports/Orders/totalOrders");
const ordersByStatus = require("../controllers/reports/Orders/ordersByStatus");
const sellersAds = require("../controllers/reports/ads reports/sellerAds");
const clicksPerAdsByDays = require("../controllers/reports/ads reports/clicksPerAd");
const {userOrderHistory,userOrderedProductHistory} = require("../controllers/reports/user/ordersHistory");
const deletedAccount = require("../controllers/reports/admin reports/deletedAccounts");
const lastProfileUpdate = require("../controllers/reports/admin reports/lastProfileUpdate");
const mostWishlistedProduct = require("../controllers/reports/admin reports/mostWishListedProduct");
const imagesUploadedAWSs3 = require("../controllers/reports/admin reports/imagesUploadedAWSs3");

Router.get("/report/admin/accounts/deleted",deletedAccount)
Router.get("/report/admin/accounts/lastupdate",lastProfileUpdate)
Router.get("/report/admin/product/mostwishlisted",mostWishlistedProduct)
Router.get("/report/admin/images/awss3",imagesUploadedAWSs3)




Router.get("/report/users/registered/",registeredUserData)
Router.get("/report/users/spends/",spendAnalysisUsers)
Router.get("/report/user/spends/",spendAnalysisUser)
Router.get("/report/user/reviews/",getUserReviews)
Router.get("/report/user/orders/",userOrderHistory)
Router.get("/report/user/order/products/",userOrderedProductHistory)


Router.get("/reports/vendor/products/selled/", selledProducts)
Router.get("/reprots/vendor/products/inventory/", productInventory)

Router.get("/reports/orders/total", totalOrders)
Router.get("/reports/orders/status/",ordersByStatus)

Router.get("/reports/sellers/ads/", sellersAds)
Router.get("/ads/clicks/",clicksPerAdsByDays)



Router.get("/report/sessions/",getLoginLogoutData)




module.exports = Router;
