const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()

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
