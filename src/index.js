const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");

const cors = require("cors");
require("dotenv").config();

app.use(multer().any());

app.use(
    cors({
        //origin : origin: process.env.iphoneHotspot+':'+process.env.forntEndPort     //iphone hotspot
        //origin : origin: process.env.laptopHostspot+':'+process.env.forntEndPort  //laptop hotspot
        //origin: process.env.homeRouter+':'+process.env.forntEndPort  //home router
    })
);

const Router = require("./routes/routes");

app.use(express.json());
app.use("/", Router);
//mongodb+srv://akhileshpatil12168:********@mobileaccessoriesdata.joq9gxm.mongodb.net/
mongoose
    .connect(process.env.mongoClust, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

//process.env.iphoneHotspot
//process.env.laptopHotspot
//process.env.homeRouter

app.listen(process.env.port, () => {
    console.log("server is live");
});
