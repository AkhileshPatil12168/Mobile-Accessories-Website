const bcrypt = require("bcrypt");

const ratingModel = require("../../models/productRatingModel");
const reviewModel = require("../../models/productReviewModel");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
const { isNotProvided, isValidObjectId, isValidImage } = require("../../utils/validators");

const createReview = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const decodedToken = req.verifyed;
    if (!userId) return res.status(400).send({ status: false, message: "Please login again" });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    let { rating, review, images } = req.body;

    const productOverAllRatings = await ratingModel
      .findOne({ productId: productId })
      .select({ averageRating: 1, totalUsersRated: 1, totalRating: 1 })
      .lean();
      
    let findUserReview = await reviewModel.findOne({ userId, productId, isDeleted: false }).lean();

    if (findUserReview) return res.status(400).send({status: false, message: "cannot create second review" })
 
      if (!rating) return res.status(400).send({ status: false, message: "rating is requried" });

      if (rating > 5 || rating < 1)
        return res.status(400).send({ status: false, message: "please give only 1 to 5 rating" });

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

      const newReview = {
        productId,
        userId,
        rating,
        review,
        images,
        reviewDate: Date.now() + 19800000,
      };

      // const oldData = await ratingModel
      //   .findOne({ productId: productId })
      //   .select({ averageRating: 1, totalRating: 1, totalUsersRated: 1 })
      //   .lean();

      let averageRating =
        (productOverAllRatings.totalRating + +newReview.rating) /
        (productOverAllRatings.totalUsersRated + 1);

      const productReview = await reviewModel.create(newReview);

      if (!productReview)
        return res.status(404).send({ status: true, message: "something went wrong" });

      await ratingModel.findByIdAndUpdate(
        productOverAllRatings["_id"],
        {
          $inc: {
            totalRating: +newReview.rating,
            totalUsersRated: 1,
          },
          $set: {
            averageRating,
          },
        },
        { new: true }
      );

      return res.status(200).send({
        status: true,
        message: "review added Successfully",
        data: productReview,
      });
    
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = createReview;
