/**
 * Routes for '/albums'
 */
const router = require('express').Router();
const { index, show, store } = require('../controllers/albums_controller');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:photoId', show);

/* Store a new photo in album */
router.post('/:photoId', store);

module.exports = router;