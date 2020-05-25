/**
 * Validation rules to register new account
 */

const { body } = require('express-validator');

const createRules = [
	body('email').trim().isLength({ min: 8 }),
	body('password').trim().isLength({ min: 8 }),
	body('first_name').trim().isLength({ min: 2 }),
	body('last_name').trim().isLength({ min: 2 }),
];

module.exports = {
	createRules,
};
