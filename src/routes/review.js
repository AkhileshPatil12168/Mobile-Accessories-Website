const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const createReview = require("../controllers/reviewController/createReview");
const {getReviews,getReviewById} = require("../controllers/reviewController/getReviews");
const updateReview = require("../controllers/reviewController/updateReview");
const deleteReview = require("../controllers/reviewController/deleteReview");

Router.post("/user/:userId/product/:productId", authentication, createReview)
Router.get("/product/:productId/reviews",getReviews)
Router.get("/user/:userId/review/:reviewId", authentication,getReviewById)
Router.put("/user/:userId/review/:reviewId", authentication,updateReview)
Router.delete("/user/:userId/review/:reviewId",authentication,deleteReview)

module.exports = Router