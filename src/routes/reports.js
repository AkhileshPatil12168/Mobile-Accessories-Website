const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");
const getLoginLogoutData = require("../controllers/reports/loginLogoutReport");



Router.get("/report/sessions/",getLoginLogoutData)




module.exports = Router;
