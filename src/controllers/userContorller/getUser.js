const userModel = require("../../models/userModel")
const {  isValidObjectId } = require("../../utils/validators")





const getUserDetails = async function (req, res) {
    try {
        const userId = req.params.userId
        const decodedToken = req.verifyed

        if (!userId)
            return res
                .status(400)
                .send({ status: false, message: "Please provide userId." })

        if (!isValidObjectId(userId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid userId." })

        if (userId !== decodedToken.userId)
            return res
                .status(403)
                .send({ status: false, message: "please login again" })

        const userData = await userModel.findById(userId)
        if (!userData)
            return res
                .status(404)
                .send({ status: false, message: "user not found." })

        return res
            .status(200)
            .send({ status: true, message: "User profile details", data: userData })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}