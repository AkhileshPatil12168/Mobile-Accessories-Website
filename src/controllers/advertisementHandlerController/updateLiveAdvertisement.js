const advertisementModel = require("../../models/advertisementModel");

const updateLiveAdvertisement = async (req, res) => {
  try {
    const date = new Date();
    const fullDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    const result = await advertisementModel
      .findOneAndUpdate(
        {
          startDate: fullDate,
          isLive: false,
          paymentStatus:"completed",
          isApproved:true
        },
        { $set: { isLive: true } },
        { new: true }
      )
      .select({ advertisementImage: 1 })
      .lean();
return res.send(result)
    console.log(result);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = updateLiveAdvertisement;
