/**
 * Authentication middleware
 */
const jwt = require('jsonwebtoken');
const { getToken } = require('../auth_controller')

/* Validate JWT-token */
const validateToken = async (req, res, next) => {
    const token = getToken(req);

    // check if token exists
    if (!token) {
        res.status(401).send({
            status: 'fail',
            message: 'Request header missing token.'
        });
    }

    // verify token and get payload
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;

        next();

    } catch (error) {
        res.status(403).send({
            status: 'fail',
            message: 'Authentication failed.'
        });
        throw error;
    }
}

module.exports = {
    validateToken
}