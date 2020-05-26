/**
 * Routes for '/photos'
 */
const router = require('express').Router();
const { index, show, store } = require('../controllers/photos_controller');
const { createPhoto } = require('../validation/create');

/* Get all photos */
router.get('/', index);

/* Get a specific photo */
router.get('/:photoId', show);

/* Store a new photo */
router.post('/', createPhoto, store);

module.exports = router;