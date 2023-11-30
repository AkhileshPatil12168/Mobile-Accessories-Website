    const orderedProductModel = require("../../../models/orderedProductsModel")

    const selledProducts = async (req, res) => {
    try {
        const {type}= req.query;

        const data = await orderedProductModel
        .find(type)
        .select({userId:1, prductId:1, quantity:1, totalPrice:1, OrderStatus:1,deliveredDate:1}).sort({loginTime:-1}).lean();
        return res.status(200).send({ status: false, message: "successfull", data: data });
    } catch (error) {
        return res.status(500).send({ status: false, data: error.message });
    }
    };

    module.exports = selledProducts
