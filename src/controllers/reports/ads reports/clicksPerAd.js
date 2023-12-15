const advertisementClicksByDaysModel = require("../../../models/advertisementClicksByDaysModel");


const clicksPerAdsByDays = async (req, res) => {
try {
    const {type}= req.query;

    const data = await advertisementClicksByDaysModel
    .find(type).sort({date:-1})
    // .select({vendorId:1, prductId:1, startDate:1, endDate:1, isApproved:1,price:1}).sort({startDate:1})
    .lean();
    return res.status(200).send({ status: false, message: "successfull", data: data });
} catch (error) {
    return res.status(500).send({ status: false, data: error.message });
}
};

module.exports = clicksPerAdsByDays
