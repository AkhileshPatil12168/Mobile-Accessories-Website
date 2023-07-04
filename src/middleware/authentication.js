const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    try {
        const  token =req.cookies.token

        if (!token) {
            return res.status(400).send({ status: false, message: "provide token in the cookie" });
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
