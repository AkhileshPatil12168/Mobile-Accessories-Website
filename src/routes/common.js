const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const login = require("../controllers/commonController/commonLogin");
const {
  requestResetPassword,
  resetPassword,
} = require("../controllers/commonController/resetPassword");
const logOutTime = require("../controllers/logOutController/logoutTime");

Router.post("/login/user/", login);
Router.post("/request/resetpassword/", requestResetPassword);
Router.put("/:userId/reset/password/:token", authentication, resetPassword);

Router.post("/logout", logOutTime);

module.exports = Router;
