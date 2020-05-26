/**
 * Routes for '/albums'
 */
const router = require('express').Router();
const { index, show, store } = require('../controllers/albums_controller');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Store a new photo in album */
router.post('/:albumId', store);

module.exports = router;