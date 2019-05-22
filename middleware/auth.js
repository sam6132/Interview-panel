const jwt = require('jsonwebtoken');
const { JWTTOKEN } = require('../config')
module.exports = function (req, res, next) {
    const token = req.header('x-auth');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, JWTTOKEN);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}