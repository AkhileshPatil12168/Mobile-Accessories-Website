const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors")
require("dotenv").config()

app.use(multer().any());

app.use(cors({
  origin: 'http://localhost:4000'
}))

const Router = require("./routes/routes");

app.use(express.json());
app.use("/", Router);

mongoose
  .connect(
    process.env.mongoClust,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));



app.listen(process.env.port, () => {
  console.log("server is live");
});
