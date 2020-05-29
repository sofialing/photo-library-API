/**
 * Album Routes
 */
const router = require('express').Router();
const { index, show, store, update, destroy, handlePhotos } = require('../controllers/albums_controller');
const { validatePhotoId, createAlbum, updateAlbum } = require('../validation/rules');

// Get all albums.
router.get('/', index);

// Get an album by ID.
router.get('/:albumId', show);

// Create a new album.
router.post('/', createAlbum, store);

// Update an album by ID.
router.put('/:albumId', updateAlbum, update);

// Add photo(s) to album.
router.post('/:albumId/photos', validatePhotoId, handlePhotos);

// Remove photo(s) from album.
router.delete('/:albumId/photos', validatePhotoId, handlePhotos);

// Delete an album by ID.
router.delete('/:albumId', destroy);

module.exports = router;