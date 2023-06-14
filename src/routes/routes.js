const express = require("express")
const Router = express.Router()

const loginUser =require("../controllers/userContorller/userLogin")
const createUser = require("../controllers/userContorller/createUser")

Router.post("/create/user/",createUser)
Router.post("/login/user/", loginUser)


Router.get("/",(req,res)=>{
    res.send({data : {name: "akhilesh",age :20}})
})

Router.all("/*",  (req, res) =>{
    res.status(404).send({ status: false, message: "invalid request!!" });
  });

module.exports =Router