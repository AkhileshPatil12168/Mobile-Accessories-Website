const wishListModel = require("../../../models/wishListModel")

const mostWishlistedProduct = async(req, res)=>{
    try {
const data  = await wishListModel.find({}).select({items:1,_id:0}).lean()

const filteredArray = []

        for(let products in data ){
            for(let product in products.items){
                
            }
        }

        return res.status(200).send({ status: true, message: "successfull", data: data });


        
    } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
        
    }
}

module.exports = mostWishlistedProduct