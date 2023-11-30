const userModel = require("../../../models/userModel");


const registeredUserData = async (req, res) => {
  try {
    const type= req.query;

    const data = await userModel
      .find(type)
      .select({ fname:1, lname:1, phone:1,createdAt: 1, isDeleted:1}).sort({loginTime:-1}).lean();
    return res.status(200).send({ status: false, message: "successfull", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
  }
};

module.exports = registeredUserData
