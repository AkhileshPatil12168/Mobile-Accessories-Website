const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const {getAdvertisementSummery,createAdvertisement} = require("../controllers/advertisementController/createAdvertisementByVendor");
const { getAdvertisements, getAdvertisementById } = require("../controllers/advertisementController/getAdvertisementByVendor");
const updateAdvertisement = require("../controllers/advertisementController/updateAdvertisementByVendor");
const clickCountIncreser = require("../controllers/advertisementController/clickCountIncreser");
const getLiveAdvertisement = require("../controllers/advertisementHandlerController/getLiveAdvertisements");
const updateLiveAdvertisement = require("../controllers/advertisementHandlerController/updateLiveAdvertisement");

Router.post("/vendor/:vendorId/create/advertisement", authentication, getAdvertisementSummery);
Router.post("/vendor/:vendorId/create/advertisement/finalize", authentication, createAdvertisement);
Router.get("/vendor/:vendorId/advertisements",authentication, getAdvertisements)
Router.get("/vendor/:vendorId/advertisement/:advertisementId",authentication, getAdvertisementById)
Router.put("/vendor/:vendorId/advertisement/:advertisementId",authentication,updateAdvertisement)

Router.put("/ad/:advertisementId",clickCountIncreser)
Router.get("/advertisements/live",getLiveAdvertisement)
Router.get("/test/ad",updateLiveAdvertisement)

module.exports = Router;
