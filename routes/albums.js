/**
 * Routes for '/albums'
 */
const router = require('express').Router();
const { index, destroy, show, store, addPhotos, removePhotos } = require('../controllers/albums_controller');
const { validatePhotoId, createAlbum } = require('../validation/rules');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Create new album */
router.post('/', createAlbum, store);

/* Delete a specific album */
router.delete('/:albumId', destroy);

/* Add photos to a specific album */
router.post('/:albumId/photos', validatePhotoId, addPhotos);

/* Remove photos from a specific album */
router.delete('/:albumId/photos', validatePhotoId, removePhotos);

module.exports = router;