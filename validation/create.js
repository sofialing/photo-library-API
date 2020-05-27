/**
 * Validation rules to create data
 */

const { body } = require('express-validator');
const { User, Photo } = require('../models')

const checkEmail = async value => {
	const user = await new User({ email: value }).fetch({ require: false });

	return user ? Promise.reject('Email already exists.') : Promise.resolve();
}

const checkPhoto = async (value, { req }) => {
	// check single photo_id
	if (!Array.isArray(value)) {
		const photo = await Photo.fetchById(value, req.user.data.id, { require: false });
		return photo ? Promise.resolve() : Promise.reject();
	}

	// check multiple photo_id
	for (let i = 0; i < value.length; i++) {
		const photo = await Photo.fetchById(value[i], req.user.data.id, { require: false });

		if (!photo) {
			return Promise.reject(`Not a valid photo id: ${value[i]}`);
		}
	}
};

const addPhotoToAlbum = [
	body('photo_id').notEmpty().custom(checkPhoto).withMessage('Not a valid photo id.')
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
