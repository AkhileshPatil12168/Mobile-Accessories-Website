const bcrypt = require("bcrypt");

const reviewModel = require("../../models/productReviewModel");
const ratingModel = require("../../models/productRatingModel");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
const { isNotProvided, isValidObjectId, isValidImage } = require("../../utils/validators");

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const productReviews = await reviewModel
      .find({ productId: productId, isDeleted: false })
      .populate("userId", "fname lname")
      .select({ rating: 1, review: 1, images: 1, reviewDate: 1, edited:1 })
      .lean();

    if (productReviews.length == 0)
      return res.status(404).send({ status: true, message: "no reviews" });

    return res.status(200).send({
      status: true,
      data: productReviews,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { userId,reviewId } = req.params;
    const decodedToken = req.verifyed;
    if (!userId) return res.status(400).send({ status: false, message: "Please login again" });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const productReviews = await reviewModel
      .findById(reviewId,{ isDeleted: false })
      .populate("userId", "fname lname")
      .select({ rating: 1, review: 1, images: 1, reviewDate: 1 ,edited:1})
      .lean();

    if (!productReviews) return res.status(404).send({ status: true, message: "no review" });

    return res.status(200).send({
      status: true,
      data: productReviews,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {getReviews, getReviewById};
