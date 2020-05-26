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
	const photo = await Photo.fetchById(value, req.user.data.id, { require: false });

	return photo ? Promise.resolve() : Promise.reject('Not a valid photo id.');
}

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

const addPhotoToAlbum = [
	body('photo_id').trim().notEmpty().custom(checkPhoto)
];

module.exports = {
	createAccount,
	createAlbum,
	createPhoto,
	addPhotoToAlbum,
};
