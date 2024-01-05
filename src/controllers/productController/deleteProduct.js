const productModel = require("../../models/productModel");
const vendorModel = require("../../models/vendorModel");

const {  isValidObjectId,} = require("../../utils/validators");


const deleteProduct = async function (req, res) {
    try {
        let { productId, userId } = req.params;

    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res
        .status(403)
        .send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res
        .status(403)
        .send({ status: false, message: "please login again" });



        if (!productId) return res.status(400).send({ status: false, message: "provide Product Id" })

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "provide a valid Product Id" })

        let productDelete = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true })

        if (!productDelete)
            return res.status(404).send({ status: false, message: "Product Not Found" })

        return res.status(200).send({ status: true, message: "Successfully Deleted" })

    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

module.exports = deleteProduct