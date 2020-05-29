/**
 * Authentication Controller
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

/* Login and get access-token */
const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);

	// check if authentication failed
	if (!user) {
		res.status(401).send({
			status: 'fail',
			message: 'Authentication failed.'
		});
		return;
	}

	// construct payload
	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email')
		}
	};

	// sign payload and get access-token
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h',
	});

	// sign payload and get refresh-token
	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w',
	});

	res.send({
		status: 'success',
		data: {
			access_token,
			refresh_token
		}
	});
};

/* Refresh access-token */
const refresh = (req, res) => {
	const token = getToken(req);

	// check if token exists
	if (!token) {
		res.status(401).send({
			status: 'fail',
			message: 'Request header missing token.'
		});
		return;
	}

	try {
		// verify token using refresh-token
		const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
		const payload = { data };

		// sign new token using access-token
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h', });

		res.send({
			status: 'success',
			data: {
				access_token
			}
		});

	} catch (error) {
		res.status(403).send({
			status: 'fail',
			message: 'Invalid token.'
		});
		throw error;
	}
}

/* Create a new account */
const register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors
				.array()
				.map(error => ({ key: error.param, message: error.msg })),
		});
		return;
	}

	const data = matchedData(req);
	try {
		// hash password
		data.password = await bcrypt.hash(data.password, User.hashSaltRounds);

		// save new user to db
		await new User(data).save();

		res.status(201).send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'An unexpected error occurred when trying to register new user.',
		});
		throw error;
	}
};

/* Get token från HTTP headers */
const getToken = req => {
	// check for authorization header
	if (!req.headers.authorization) {
		return false;
	}

	// get auth type and token
	const [authType, token] = req.headers.authorization.split(' ');

	// check if authorization type is Bearer
	if (authType.toLowerCase() !== 'bearer') {
		return false;
	}

	return token;
};

module.exports = {
	login,
	refresh,
	register,
	getToken,
};
