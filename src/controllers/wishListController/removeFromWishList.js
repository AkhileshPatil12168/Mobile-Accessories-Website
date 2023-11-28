const bcrypt = require("bcrypt");

const wishListModel = require("../../models/wishListModel");
const { isValidObjectId } = require("../../utils/validators");

const deleteItemWishList = async (req, res) => {
  try {
    let { userId, wishListId, itemId } = req.params;

    const decodedToken = req.verifyed;

    if (!userId) return res.status(403).send({ status: false, message: "please login again" });
    if (!isValidObjectId(userId))
      res.status(403).send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);
    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    if (!wishListId)
      return res.status(400).send({ status: false, message: "wish list id is requried" });
    if (!itemId) return res.status(400).send({ status: false, message: "item id is requried" });

    const wishListData = await wishListModel
      .findByIdAndUpdate(wishListId, { $pull: { items: { _id: itemId } } }, { new: true })
      .lean();

    return res.status(200).send({
      status: true,
      data: wishListData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = deleteItemWishList;
