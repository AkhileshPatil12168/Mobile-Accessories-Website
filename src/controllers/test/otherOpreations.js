const cartModel = require("../../models/cartModel");
const adminModel = require("../../models/adminModel");
const userModel = require("../../models/userModel");
const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

const removeCart = async(req, res)=>{
        try {
            const usersId= await userModel.find().select({id:1}).lean()
            const filterId = []
            for(obj of usersId){
                filterId.push(obj._id)
            }
            const carts = await cartModel.deleteMany({_id : {$nin:filterId}})
            return res.send(carts)


            
        } catch (error) {
            return res.send(error)
        }
}
module.exports = removeCart
