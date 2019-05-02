const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = require('../config');


let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //console.log(token);

    if (token) {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, JWT_SECRET, (err, authToken) => {
            //console.log(JWT_SECRET);
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = authToken;
                next();
              }
            });
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
};
        
module.exports = { checkToken: checkToken };