const userModel = require("../../../models/userModel")
const vendorModel =require("../../../models/vendorModel")

const deletedAccount = async(req, res)=>{
    try {

        const userData = await userModel.find({isDeleted:true}).select({fname:1,lname:1,updatedAt:1,createdAt:1,isDeleted:1}).lean()
        const vendorData = await vendorModel.find({isDeleted:true}).select({fname:1,lname:1,updatedAt:1,createdAt:1,isDeleted:1}).lean()

        const combinedData = [...userData.map(doc=>({...doc,"accountOf":"user"})),...vendorData.map(doc=>({...doc,"accountOf":"merchant"}))]
        return res.status(200).send({ status: true, message: "successfull", data: combinedData });
        
    } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
        
    }
}

module.exports = deletedAccount