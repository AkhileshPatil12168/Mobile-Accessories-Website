const express = require("express")
const Router = express.Router()

Router.get("/",(req,res)=>{
    res.send("home page")
})

Router.all("/*",  (req, res) =>{
    res.status(404).send({ status: false, message: "invalid request!!" });
  });

module.exports =Router