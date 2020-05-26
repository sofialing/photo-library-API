/**
 * Routes for '/photos'
 */
const router = require('express').Router();
const { index, show } = require('../controllers/photos_controller');

/* Get all photos */
router.get('/', index);

/* Get a specific photo */
router.get('/:photoId', show);

module.exports = router;