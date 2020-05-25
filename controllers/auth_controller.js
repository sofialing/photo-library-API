/**
 * Auth Controller
 */
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

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

	const validData = matchedData(req);
	try {
		// hash password
		validData.password = await bcrypt.hash(
			validData.password,
			User.hashSaltRounds
		);

		// save new user to db
		await new User(validData).save();

		res.status(201).send({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
};

module.exports = {
	register,
};
