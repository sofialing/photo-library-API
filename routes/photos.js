/**
 * Routes for '/photos'
 */
const router = require('express').Router();
const { index, destroy, show, store } = require('../controllers/photos_controller');
const { createPhoto } = require('../validation/rules');

/* Get all photos */
router.get('/', index);

/* Get a specific photo */
router.get('/:photoId', show);

/* Delete a specific photo */
router.delete('/:photoId', destroy);

/* Store a new photo */
router.post('/', createPhoto, store);

module.exports = router;