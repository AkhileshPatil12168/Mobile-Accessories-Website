const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    try {

        let  token =req.cookies.token 
        
        if(req.route.path=="/:userId/reset/password/:token")token = req.params.token
        

        if (!token) {
            return res.status(401).send({ status: false, message: "token is not present" });
        }

        jwt.verify(token, process.env.TOKEN_KEY, function (err, decodedToken) { 
            if (err) {
                return res.status(401).send({ status: false, message: "token might be expried or not valid" });
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
