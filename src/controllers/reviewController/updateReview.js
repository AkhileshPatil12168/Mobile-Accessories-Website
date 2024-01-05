const bcrypt = require("bcrypt");

const reviewModel = require("../../models/productReviewModel");
const ratingModel = require("../../models/productRatingModel");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
const { isNotProvided, isValidObjectId, isValidImage } = require("../../utils/validators");

const updateReview = async (req, res) => {
  try {
    const { userId, reviewId } = req.params;
    const decodedToken = req.verifyed;
    if (!userId) return res.status(400).send({ status: false, message: "Please login again" });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    let { rating, review, images } = req.body;

    if (rating) {
      if (rating > 5 || rating < 1)
        return res.status(400).send({ status: false, message: "please give only 1 to 5 rating" });
    }
    // if (!rating) return res.status(400).send({ status: false, message: "rating is requried" });

    if (review) {
      if (!isNotProvided(review))
        return res.status(400).send({ status: false, message: "please provide some contentent" });
      review = review.trim();
    }

    let files = req.files;
    if (files.length > 0) {
      if (!files.every((v) => isValidImage(v.originalname) == true))
        return res.status(400).send({ status: false, message: "provide a valid image" });

      let reviewImagesPromises = await files.map((img) => uploadFile(img, "review_images/"));
      images = await Promise.all(reviewImagesPromises);
    }

    const data = {
      rating,
      review,
      images,
      reviewDate: Date.now() + 19800000,
      edited: true,
    };

    const oldReview = await reviewModel
      .findById(reviewId)
      .select({ rating: 1, productId: 1 })
      .lean();

    const productTotalRatings = await ratingModel
      .findOne({ productId: oldReview.productId })
      .select({ averageRating: 1, totalUsersRated: 1, totalRating: 1 })
      .lean();

    let averageRating, totalRating;
    //       5                      1
    if (+data.rating > oldReview.rating) {
      totalRating = productTotalRatings.totalRating + (+data.rating - oldReview.rating);
      averageRating = totalRating / productTotalRatings.totalUsersRated;
    } //         1                      5
    if (+data.rating < oldReview.rating) {
      totalRating = productTotalRatings.totalRating - (oldReview.rating - +data.rating);
      averageRating = totalRating / productTotalRatings.totalUsersRated;
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, data, { new: true }).lean();
    if (!updatedReview)
      return res.status(404).send({ status: true, message: "something went wrong" });

    await ratingModel.findByIdAndUpdate(
      productTotalRatings["_id"],
      {
        $set: {
          averageRating,
          totalRating,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      message: "review updated Successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = updateReview;
