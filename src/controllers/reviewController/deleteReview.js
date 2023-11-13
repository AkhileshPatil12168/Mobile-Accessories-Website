const bcrypt = require("bcrypt");

const reviewModel = require("../../models/productReviewModel");
const ratingModel = require("../../models/productRatingModel");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
const { isNotProvided, isValidObjectId, isValidImage } = require("../../utils/validators");

const deleteReview = async (req, res) => {
  try {
    const { userId, reviewId } = req.params;
    const decodedToken = req.verifyed;
    if (!userId) return res.status(400).send({ status: false, message: "Please login again" });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    
    const deletedReview = await reviewModel
    .findByIdAndUpdate(reviewId, { isDeleted: true }, { new: true })
    .lean();

    const oldData = await ratingModel
      .findOne({ productId: deletedReview.productId })
      .select({ averageRating: 1, totalRating: 1, totalUsersRated: 1 })
      .lean();

    if (!deletedReview)
      return res.status(404).send({ status: true, message: "something went wrong" });

     let averageRating = (oldData.totalRating - deletedReview.rating)/(oldData.totalUsersRated-1)
 
    await ratingModel.findOneAndUpdate(
      oldData["_id"],
      {
        $inc: {
          totalRating: -deletedReview.rating,
          totalUsersRated: -1,
        },
        $set: {
          averageRating,
        },
      },
      { new: true }
    );

    return res.status(204).send({
      status: true,
      message: "review deleted",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = deleteReview;
