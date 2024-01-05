const loginLogoutDataModel = require("../../models/loginLogoutDataModel");


const logOutTime = async(req, res)=>{
    try {
        const {token, logOutTime}= req.body

        await loginLogoutDataModel.findOneAndUpdate({token},{logOutTime})

        return res.status(200).send({ status: true, message:"logOut successful"})

       
        
    } catch (error) {
    return res.status(500).send({ status: false, data: error.message });
        
    }
}

module.exports = logOutTime