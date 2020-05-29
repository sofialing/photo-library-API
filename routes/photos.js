/**
 * Photo Routes
 */
const router = require('express').Router();
const { index, show, store, destroy } = require('../controllers/photos_controller');
const { createPhoto } = require('../validation/rules');

// Get all photos.
router.get('/', index);

// Get a photo by ID.
router.get('/:photoId', show);

// Create a new photo.
router.post('/', createPhoto, store);

// Delete a photo by ID.
router.delete('/:photoId', destroy);

module.exports = router;