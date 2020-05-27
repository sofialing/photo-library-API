/**
 * Album Controller
 */
const { matchedData, validationResult } = require('express-validator');
const { Album, User, Photo } = require('../models')

/* Get all albums */
const index = async (req, res) => {
    try {
        const user = await new User({ id: req.user.data.id }).fetch({ withRelated: 'albums' });
        const albums = user.related('albums');

        res.send({
            status: 'success',
            data: { albums }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to get all albums.',
        });
    }
}

/* Get a specific album */
const show = async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.user.data.id;

    try {
        const album = await Album.fetchById(albumId, userId, { withRelated: 'photos' });

        if (!album) {
            res.status(404).send({
                status: 'fail',
                message: `Could not find album with id: ${albumId}`
            });
            return;
        }

        res.send({
            status: 'succes',
            data: { album }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to get album.',
        });
    }
}

/* Create new album */
const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors
                .array()
                .map(error => ({ key: error.param, message: error.msg })),
        });
        return;
    }

    const data = matchedData(req);
    data.user_id = req.user.data.id;

    try {
        const album = await new Album(data).save();
        res.send({
            status: 'success',
            data: { album }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to store new album.',
        });
    }
}

/* Add photos to album */
const storePhotos = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors
                .array()
                .map(error => ({ key: error.param, message: error.msg })),
        });
        return;
    }

    const { photo_id } = matchedData(req);

    try {
        const user_id = req.user.data.id;
        const album = await Album.fetchById(req.params.albumId, user_id);

        if (Array.isArray(photo_id)) {
            photo_id.forEach(async id => {
                const photo = await new Photo({ id, user_id }).fetch();
                await album.photos().attach(photo);
            });
        } else {
            const photo = await new Photo({ id: photo_id, user_id }).fetch();
            await album.photos().attach(photo);
        }

        res.send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when trying to add photos to album.',
        });
    }
}

module.exports = {
    index,
    show,
    store,
    storePhotos,
}