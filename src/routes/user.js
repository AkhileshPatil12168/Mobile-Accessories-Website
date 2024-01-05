const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const createUser = require("../controllers/userController/createUser");
const getUserDetails = require("../controllers/userController/getUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");
const contactUs = require("../controllers/userController/contactUs");

Router.post("/create/user/", createUser);
Router.get("/user/:userId/profile", authentication, getUserDetails);
Router.put("/user/:userId/profile", authentication, updateUser);
Router.delete("/user/:userId/profile", authentication, deleteUser);
Router.post("/user/:userId/contactus", authentication, contactUs);

module.exports = Router;
