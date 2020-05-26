/**
 * Album Controller
 */
const { matchedData, validationResult } = require('express-validator');
const { Album, User, Photo } = require('../models')

const index = async (req, res) => {
    try {
        const user = await new User({ id: req.user.data.id }).fetch({ withRelated: 'albums' });
        const albums = user.related('albums');

        res.send({
            status: 'success',
            data: {
                albums
            }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
}

const show = async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.user.data.id;

    try {
        const album = await Album.where({ id: albumId, user_id: userId }).fetch({ withRelated: 'photos' });
        res.send({
            status: 'succes',
            data: {
                album
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
}

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

    const validData = matchedData(req);
    validData.user_id = req.user.data.id;

    try {
        const album = await new Album(validData).save();
        res.send({
            status: 'success',
            data: { album }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
}

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
        const photo = await new Photo({ id: photo_id, user_id: req.user.data.id }).fetch();
        const album = await new Album({ id: req.params.albumId }).fetch();
        await album.photos().attach(photo);

        res.send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
}

module.exports = {
    index,
    show,
    store,
    storePhotos,
}