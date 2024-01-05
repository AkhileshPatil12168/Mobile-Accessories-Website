const bcrypt = require("bcrypt");

const wishListModel = require("../../models/wishListModel");
const { isValidObjectId } = require("../../utils/validators");

const getWishList = async (req, res) => {
  try {
    let { userId } = req.params;

    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const wishListData = await wishListModel
      .findOne({ userId })
      .populate({
        path: "items.productId",
        select: "title price productImage ratings",
        populate: {
          path: "ratings",
          select: "averageRating totalUsersRated",
        },
      })
      .lean();

    if (!wishListData)
      return res.status(400).send({ status: true, data: {}, message: "wish list is empty" });

    return res.status(200).send({
      status: true,
      data: wishListData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = getWishList;
