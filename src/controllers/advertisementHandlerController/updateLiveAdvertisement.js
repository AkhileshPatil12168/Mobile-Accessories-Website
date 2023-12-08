const advertisementModel = require("../../models/advertisementModel");
const { getTimeStamps } = require("../../utils/utilityFunctions");

const makeOnlineAdvertisement = async (req, res) => {
  try {
    console.log("start");

    const fullDate = getTimeStamps();

    const result = await advertisementModel
      .findOneAndUpdate(
        {
          startDate: fullDate,
          isLive: false,
          paymentStatus: "completed",
          isApproved: true,
        },
        { $set: { isLive: true } },
        { new: true }
      )
      .select({ advertisementImage: 1 })
      .lean();
      console.log(result);
    console.log("ad is online now");
  } catch (error) {
    console.log({ status: false, message: error.message });
  }
};

const makeOfflineAdvertisement = async () => {
  try {
    console.log("start");

    const fullDate = getTimeStamps();

    const result = await advertisementModel
      .findOneAndUpdate(
        {
          endDate: fullDate,
          isLive: true,

        },
        { $set: { isLive: false } },
        { new: true }
      )
      .select({ advertisementImage: 1 })
      .lean();
      console.log(result);
      console.log("ad is offline now");

  } catch (error) {
    console.log({ status: false, message: error.message });
  }
};
module.exports = {makeOnlineAdvertisement,makeOfflineAdvertisement};
