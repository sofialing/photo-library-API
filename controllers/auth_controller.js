/**
 * Authentication Controller
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

/* Login and issue an access-token */
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
	const payload = { data: { id: user.get('id'), email: user.get('email') } }

	// sign payload and get access-token
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h',
	});

	res.send({
		status: 'success',
		data: { access_token }
	});
};

/* Register a new account */
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

module.exports = {
	login,
	register,
};
