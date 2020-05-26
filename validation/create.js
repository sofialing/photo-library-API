/**
 * Validation rules to create data
 */

const { body } = require('express-validator');

const createAccount = [
	body('email').trim().isLength({ min: 8 }),
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
