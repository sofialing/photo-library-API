/**
 * Validation rules to submit data
 */

const { body } = require('express-validator');
const _ = require('lodash');
const { User, Photo } = require('../models')

const checkEmail = async input => {
	const user = await new User({ email: input }).fetch();

	if (user) {
		return Promise.reject('Email already exists.')
	}
}

const checkPhoto = async (input, { req }) => {
	// check if input is valid type
	if (!_.isInteger(input) && !_.isArray(input)) {
		return Promise.reject('Photo id must be an integer or array.');
	}

	// check array with multiple photo ids
	if (_.isArray(input)) {
		for (let i = 0; i < input.length; i++) {
			const photo = await Photo.fetchById(input[i], req.user.data.id);

			if (!photo) {
				return Promise.reject(`Not a valid photo id: ${input[i]}`);
			}
		}
	}

	// check single photo id
	if (_.isInteger(input)) {
		const photo = await Photo.fetchById(input, req.user.data.id);

		if (!photo) {
			return Promise.reject('Not a valid photo id.');
		}
	}

};

const addPhotoToAlbum = [
	body('photo_id').notEmpty().custom(checkPhoto)
];

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

module.exports = {
	addPhotoToAlbum,
	createAccount,
	createAlbum,
	createPhoto,
};