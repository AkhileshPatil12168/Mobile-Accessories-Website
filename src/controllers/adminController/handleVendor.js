const bcrypt = require("bcrypt");

const vendorModel = require("../../models/vendorModel");
const adminModel = require("../../models/adminModel");

const { isValidObjectId } = require("../../utils/validators");

const approveVender = async (req, res) => {
  try {
    let { userId, vendorId } = req.params;
    const decodedToken = req.verifyed;

    if (!userId) return res.status(400).send({ status: false, message: "Please provide userId." });

    if (!isValidObjectId(userId) || !isValidObjectId(vendorId)) 
      return res.status(403).send({ status: false, message: "please login again" });

    const isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

    if (!checkAdmin) return res.status(403).send({ status: false, message: "please login again" });

    if (!vendorId)
      return res.status(400).send({ status: false, message: "please provide vendorId" });

    let { isApproved } = req.body;
    if (!isApproved) isApproved = false;

    const updateData = await vendorModel.findByIdAndUpdate(vendorId, { isApproved }, { new: true });
    return res.status(200).send({
      status: true,
      message: "vendor approved successfully",
      data: updateData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const suspendVendor = async (req, res) => {
  try {
    let { userId, vendorId } = req.params;
    const decodedToken = req.verifyed;

    if (!userId) return res.status(400).send({ status: false, message: "Please provide userId." });

    if (!isValidObjectId(userId))
      return res.status(403).send({ status: false, message: "please login again" });

    const isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res.status(403).send({ status: false, message: "please login again" });

    const checkAdmin = await adminModel.findById(userId).select({ _id: 1 }).lean();

    if (!checkAdmin) return res.status(403).send({ status: false, message: "please login again" });

    if (!vendorId)
      return res.status(400).send({ status: false, message: "please provide vendorId" });

    let { isSuspended } = req.body;
    if (!isSuspended) isSuspended = false;

    const updateData = await vendorModel.findByIdAndUpdate(
      vendorId,
      { isSuspended },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "vendor updated successfully",
      data: updateData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { approveVender, suspendVendor };
