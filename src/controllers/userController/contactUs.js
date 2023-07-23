const contactUsModel = require("../../models/connetUsModel");
const bcrypt = require("bcrypt");

const {
    isNotProvided,
    validTrim,
    isValidEmail,
    isValidObjectId,
    isValidString,
} = require("../../utils/validators");

const contactUs = async (req, res) => {
    try {
        const userId = req.params.userId;
        const decodedToken = req.verifyed;
        if (!userId)
            return res.status(400).send({ status: false, message: "Please provide userId." });

        if (!isValidObjectId(userId))
        return res.status(403).send({ status: false, message: "please login again" });

        let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

        if (!isCorrectUser)
            return res.status(403).send({ status: false, message: "please login again" });
        const data = req.body;
        let { name, email, message } = data;

        if (!name) return res.status(400).send({ status: false, message: "name is requried" });
        if (!isNotProvided(name))
            return res.status(400).send({ status: false, message: "provide the name" });
        name = validTrim(name);
        if (!isValidString(name))
            return res.status(400).send({ status: false, message: "enter a valid name" });

        if (!email) return res.status(400).send({ status: false, message: "email is required" });
        email = validTrim(email);
        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: "enter a valid email" });

        if (!message)
            return res.status(400).send({ status: false, message: "message is requried" });
        if (!isValidString(message))
            return res
                .status(400)
                .send({ status: false, message: "message is in incorrect format" });
        if (!isNotProvided(message))
            return res.status(400).send({ status: false, message: "provide the message" });
        message = validTrim(message);
        if (message.length < 20)
            return res
                .status(400)
                .send({ status: false, message: "message should contain 15 words" });
        data.userId= userId
        data.requestedDate = Date.now() + 19800000;

        const response = await contactUsModel.create(data);

        return res.status(200).send({ status: true, message: "message send", data: response });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// const contactUs = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//                 const decodedToken = req.verifyed;
//                 if (!userId)
//                     return res.status(400).send({ status: false, message: "Please provide userId." });

//                 if (!isValidObjectId(userId))
//                     return res
//                         .status(400)
//                         .send({ status: false, message: "Please provide a valid userId." });

//                 let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

//                 if (!isCorrectUser)
//                     return res.status(403).send({ status: false, message: "please login again" });
//                 const data = req.body;

//                 if (emptyBody(req.body))
//                 return res.status(400).send({ status: false, message: "provide some data" });

//                 const { name, email, message } = data;

//             if (!name) return res.status(400).send({ status: false, message: "name is requried" });
//             if (!isNotProvided(name))
//                 return res.status(400).send({ status: false, message: "provide the name" });
//             name = validTrim(name);
//             if (!isValidString(name))
//                 return res.status(400).send({ status: false, message: "enter a valid name" });

//         if (!email) return res.status(400).send({ status: false, message: "email is required" });
//         email = validTrim(email);
//         if (!isValidEmail(email))
//             return res.status(400).send({ status: false, message: "enter a valid email" });

//         return res.status(200).send({
//             status: true,
//             message: "User created successfully",
//             data: createUser,
//         });
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error });
//     }
// };

module.exports = contactUs;
