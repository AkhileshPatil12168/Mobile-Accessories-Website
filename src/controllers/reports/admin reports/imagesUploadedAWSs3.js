const userModel = require("../../../models/userModel")
const vendorModel =require("../../../models/vendorModel")
const productModel = require("../../../models/productModel")
const productReviewModel = require("../../../models/productReviewModel")
const advertisementModel = require("../../../models/adminModel")
const { isValidAdvertisementType } = require("../../../utils/validators")


const imagesUploadedAWSs3 = async(req, res)=>{
    try {
        const userImages = await userModel.find({ profileImage: { $exists: true } }).select({ profileImage: 1 }).lean();
        const vendorImages = await vendorModel.find({ image: { $exists: true } }).select({ image: 1 }).lean();
        const productImages = await productModel.find({ productImage: { $exists: true } }).select({ productImage: 1 }).lean();
        const productReviewImages = await productReviewModel.find({ images: { $exists: true } }).select({ images: 1 }).lean();
        const advertisementImages = await advertisementModel.find({ advertisementImage: { $exists: true } }).select({ advertisementImage: 1 }).lean();



        

        return res.status(200).send({ status: true, message: "successfull", data: [userImages,vendorImages, productImages,productReviewImages,advertisementImages] });


        
    } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
        
    }
}

module.exports = imagesUploadedAWSs3