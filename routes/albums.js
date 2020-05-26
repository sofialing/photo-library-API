/**
 * Routes for '/albums'
 */
const router = require('express').Router();
const { index, show, store } = require('../controllers/albums_controller');
const { createAlbum } = require('../validation/create');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Create a new album */
router.post('/', createAlbum, store);

module.exports = router;