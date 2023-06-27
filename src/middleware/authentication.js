const jwt = require("jsonwebtoken");
const { getToken } = require("../utils/validators");

const authentication = async (req, res, next) => {
    try {
        const Headers = req.rawHeaders;
        let token = getToken(Headers);

        if (!token) {
            return res.status(400).send({ status: false, message: "provide token in the headers" });
        }

        jwt.verify(token, process.env.TOKEN_KEY, function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message });
            } else {
                req.verifyed = decodedToken;
                next();
            }
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = authentication;
