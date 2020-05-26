/**
 * Validation rules to create data
 */

const { body } = require('express-validator');
const { User } = require('../models')

const checkEmail = async value => {
	const user = await new User({ email: value }).fetch({ require: false });

	return user
		? Promise.reject('Email already exists.')
		: Promise.resolve();
}

const createAccount = [
	body('email').trim().isLength({ min: 8 }).custom(checkEmail),
	body('password').trim().isLength({ min: 8 }),
	body('first_name').trim().isLength({ min: 2 }),
	body('last_name').trim().isLength({ min: 2 }),
];

const createPhoto = [
	body('title').trim().notEmpty(),
	body('url').trim().notEmpty(),
	body('comment').optional().trim(),
];

module.exports = {
	createAccount,
	createPhoto,
};
