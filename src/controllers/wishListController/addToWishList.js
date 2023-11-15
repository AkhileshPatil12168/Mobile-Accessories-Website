const bcrypt = require("bcrypt");

const wishListModel = require("../../models/wishListModel");
const { isValidObjectId } = require("../../utils/validators");

const addToWishList = async (req, res) => {
  try {
    let { productId, userId } = req.params;

    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const product = { productId, addedDate: Date.now() + 19800000 };

    const wishListData = await wishListModel.findOneAndUpdate(
      { userId },
      { $push: { items: product } },
      { upsert: true, new: true }
    );

    if (!wishListData)
      return res.status(404).send({ status: true, message: "something went wrong" });
    
    return res.status(200).send({
      status: true,
      message: "product added Successfully in the wish list",
      data: wishListData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = addToWishList;
