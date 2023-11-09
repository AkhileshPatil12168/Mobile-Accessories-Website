const express = require("express");
const Router = express.Router();

Router.post("/set", (req, res) => {
  // res.cookie("token", "a;sldfkjalsdjkfj;alsdjkfalsdjfjalsdjkfj", {
  //     expires: new Date(Date.now() + 25000),
  //     httpOnly: true,
  // });
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("x-api-token", `Bearer $token`);
  res.setHeader("Authorization", `Bearer a;slkdfj;alskdfj;alskdfj;alksdfja;lsdkfja;lsdkfj`);

  res.send({ data: "head is set" });
});

const { getToken } = require("../utils/utilityFunctions");
Router.get("/app", (req, res) => {
  const data = req.cookies;
  const Headers = req.rawHeaders;
  let token = getToken(Headers);
  res.send({ data: data, token: token });
});

const removeCart = require("../controllers/test/otherOpreations");

Router.post("/removecart", removeCart);

module.exports = Router;
