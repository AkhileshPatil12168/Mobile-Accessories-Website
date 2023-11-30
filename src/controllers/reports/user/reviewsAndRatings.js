const userModel = require("../../../models/userModel");
const reviewModel = require("../../../models/productReviewModel");


const getUserReviews = async (req, res) => {
  try {
    const {userId}= req.query;

    const data = await reviewModel
      .find({userId})
      .select({__v:0,images:0}).sort({updatedAt:-1}).lean();
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

module.exports = getUserReviews