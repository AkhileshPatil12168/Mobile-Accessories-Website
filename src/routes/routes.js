const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");

const loginUser = require("../controllers/userController/userLogin");
const createUser = require("../controllers/userController/createUser");
const getUserDetails = require("../controllers/userController/getUser");
const updateUser = require("../controllers/userController/updateUser");
const deleteUser = require("../controllers/userController/deleteUser");

Router.post("/create/user/", createUser);
Router.post("/login/user/", loginUser);
Router.get("/user/:userId/profile", authentication, getUserDetails);
Router.put("/user/:userId/profile", authentication, updateUser);
Router.delete("/user/:userId/profile", authentication, deleteUser);

Router.get("/app", (req, res) => {
  res.send({ data: { name: "akhilesh",lname :"patil", age: 20 } });
});

Router.all("/*", (req, res) => {
  res.status(404).send({ status: false, message: "invalid request!!" });
});

module.exports = Router;
