const {jwtSign} = require("./config");
const jwt = require('jsonwebtoken');

const getDataFromToken = (token) => {
    jwt.verify(token, jwtSign,(err, authData) => {
        if (err)
            return null;
        else {
            return authData;
        }
    });
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader.split(' ')[1];
        jwt.verify(req.token, jwtSign,(err, authData) => {
            if (err)
                res.sendStatus(403);
            else {
                req.authData = authData;
                next();
            }
        });
    }
    else
    {
        res.sendStatus(403);
    }
}

module.exports = {verifyToken}