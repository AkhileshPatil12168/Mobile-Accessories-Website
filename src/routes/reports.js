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

Router.get("/report/users/registered/",registeredUserData)
Router.get("/report/users/spends/",spendAnalysisUsers)
Router.get("/report/user/spends/",spendAnalysisUser)
Router.get("/report/user/reviews/",getUserReviews)

Router.get("/reports/vendor/products/selled/", selledProducts)
Router.get("/reprots/vendor/products/inventory/", productInventory)

Router.get("/reports/orders/total", totalOrders)
Router.get("/reports/orders/status/",ordersByStatus)

Router.get("/reports/sellers/ads/", sellersAds)
Router.get("/ads/clicks/",clicksPerAdsByDays)



Router.get("/report/sessions/",getLoginLogoutData)




module.exports = Router;
