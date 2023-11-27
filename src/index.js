const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

app.use(multer().any());
app.use(cookieParser());

app.use(
  "*",
  cors({
    origin: ["https://camas.website", "http://localhost:3001"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.use(
//     cors({
//         // origin: process.env.iphoneHotspot+':'+process.env.forntEndPort ,    //iphone hotspot
//         // origin: 'http://'+process.env.laptopHostspot+':'+process.env.forntEndPort,    //laptop hotspot
//         // origin: process.env.homeRouter+':'+process.env.forntEndPort,        //home router
//         //origin: "http://localhost:3001",
//         origin: "https://mobileacc.onrender.com",
//        credentials: true,

//         // origin:'http://192.168.1.11:3001'
//     })
// );

const Router = require("./routes/routes");
const updateLiveAdvertisement = require("./controllers/advertisementHandlerController/updateLiveAdvertisement");
// cron.schedule("0 */1 * * * *", updateLiveAdvertisement);

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

app.listen(
  process.env.port,
  /*'192.168.1.11', */ () => {
    console.log("server is live at " + process.env.port);
  }
);
