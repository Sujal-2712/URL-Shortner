const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const URL = require("./../models/url");

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        req.user = null;
    }
    try {
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verifyUser;
    } catch (error) {
        req.user = null;
    }
    next();
}
module.exports = auth;
