const advertisementClicksByDaysModel = require("../../models/advertisementClicksByDaysModel");

const clickCountIncreser = async (req, res) => {
  try {
    let { advertisementId } = req.params;

    let date = new Date();
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const increaseClicks = await advertisementClicksByDaysModel
      .findOneAndUpdate(
        { advertisementId, date: new Date(fullDate) },
        { $inc: { clicks: 1 } },
        { new: true, upsert: true }
      )
      .lean();

    return res.status(200).send({
      status: true
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = clickCountIncreser;
