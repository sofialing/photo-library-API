/**
 * Validation rules to submit data
 */

const { body } = require('express-validator');
const _ = require('lodash');
const { User, Photo } = require('../models')

// Check if email already exists
const checkEmail = async input => {
	const user = await new User({ email: input }).fetch();

	if (user) {
		return Promise.reject('Email already exists.')
	}
}

// Check if photo ID exists and belongs to authenticated user 
const checkPhotoId = async (input, { req }) => {
	// only accept input as integer or array
	if (!_.isInteger(input) && !_.isArray(input)) {
		return Promise.reject('Photo id must be an integer or array.');
	}

	// check array of multiple photo IDs
	if (_.isArray(input)) {
		for (let i = 0; i < input.length; i++) {
			const photo = await Photo.fetchById(input[i], req.user.data.id);

			if (!photo || !_.isInteger(input[i])) {
				return Promise.reject(`Not a valid photo id: ${input[i]}`);
			}
		}
	}

	// check single photo ID
	if (_.isInteger(input)) {
		const photo = await Photo.fetchById(input, req.user.data.id);

		if (!photo) {
			return Promise.reject('Not a valid photo id.');
		}
	}
};

const createAccount = [
	body('email').trim().isLength({ min: 8 }).custom(checkEmail),
	body('password').trim().isLength({ min: 8 }),
	body('first_name').trim().isLength({ min: 2 }),
	body('last_name').trim().isLength({ min: 2 }),
];

const createAlbum = [
	body('title').trim().notEmpty(),
]

const createPhoto = [
	body('title').trim().notEmpty(),
	body('url').trim().notEmpty(),
	body('comment').optional().trim(),
];

const updatePhoto = [
	body('title').optional().trim().notEmpty(),
	body('url').optional().trim().notEmpty(),
	body('comment').optional().optional().trim(),
]

const validatePhotoId = [
	body('photo_id').notEmpty().custom(checkPhotoId)
];

module.exports = {
	createAccount,
	createAlbum,
	createPhoto,
	updatePhoto,
	validatePhotoId,
};
