const loginLogoutDataModel = require("../../models/loginLogoutDataModel");

const getLoginLogoutData = async (req, res) => {
  try {
    const type= req.query;

    const data = await loginLogoutDataModel
      .find(type)
      .select({ v: 0, createdAt: 0, updatedAt: 0 }).sort({loginTime:-1}).lean();
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

module.exports = getLoginLogoutData
