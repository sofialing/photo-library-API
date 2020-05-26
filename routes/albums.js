/**
 * Routes for '/albums'
 */
const router = require('express').Router();
const { index, show, store, storePhotos } = require('../controllers/albums_controller');
const { addPhotoToAlbum, createAlbum } = require('../validation/create');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Create a new album */
router.post('/', createAlbum, store);

/* Add photos to a specific album */
router.post('/:albumId', addPhotoToAlbum, storePhotos);

module.exports = router;