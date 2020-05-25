/**
 * Authentication middleware
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Get token från HTTP headers */
const getToken = req => {
    // Check for authorization header
    if (!req.headers.authorization) {
        return false;
    }

    // deconstruct authorization header
    const [authType, token] = req.headers.authorization.split(' ');

    // Check if authorization type is Bearer
    if (authType.toLowerCase() !== 'bearer') {
        return false;
    }

    return token;
};

const validateToken = async (req, res, next) => {
    const token = getToken(req);

    // check if token exists
    if (!token) {
        res.status(401).send({
            status: 'fail',
            message: 'No token found in request header.'
        });
    }

    // validate token and get payload
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