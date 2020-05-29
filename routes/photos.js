/**
 * Photo Routes
 */
const router = require('express').Router();
const { index, show, store, update, destroy } = require('../controllers/photos_controller');
const { createPhoto, updatePhoto } = require('../validation/rules');

// Get all photos.
router.get('/', index);

// Get a photo by ID.
router.get('/:photoId', show);

// Create a new photo.
router.post('/', createPhoto, store);

// Update a photo by ID.
router.put('/:photoId', updatePhoto, update);

// Delete a photo by ID.
router.delete('/:photoId', destroy);

module.exports = router;