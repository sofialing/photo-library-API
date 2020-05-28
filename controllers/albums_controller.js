/**
 * Album Controller
 */
const { matchedData, validationResult } = require('express-validator');
const _ = require('lodash');
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
            message: 'An unexpected error occurred when trying to get all albums.',
        });
        throw error;
    }
}

/* Delete a specific album and remove all associations */
const destroy = async (req, res) => {
    try {
        const album = await Album.fetchById(req.params.albumId, req.user.data.id, { withRelated: 'photos' });

        // check if album exists and belongs to authenticated user
        if (!album) {
            res.status(403).send({
                status: 'fail',
                message: `Not allowed to delete album with id: ${req.params.albumId}`
            });
            return;
        }

        // remove all associations 
        await album.photos().detach();
        // delete photo
        await album.destroy();

        res.status(204).send({
            status: 'succes',
            data: null
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to delete album.',
        });
        throw error;
    }
}

/* Get a specific album */
const show = async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.user.data.id;

    try {
        const album = await Album.fetchById(albumId, userId, { withRelated: 'photos' });

        // check if album exists and belongs to authenticated user
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
            message: 'An unexpected error occurred when trying to get album.',
        });
        throw error;
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
        res.status(201).send({
            status: 'success',
            data: { album }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to store new album.',
        });
        throw error;
    }
}

/* Add photos to album */
const addPhotos = async (req, res) => {
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

    try {
        let { photo_id } = matchedData(req);
        const album = await Album.fetchById(req.params.albumId, req.user.data.id);

        // check if album exists and if user is authorized to add photos to it
        if (!album) {
            res.status(403).send({
                status: 'fail',
                message: `Not allowed to add photos to album with id: ${req.params.albumId}`
            });
            return;
        }

        // convert single photo id to array
        photo_id = _.isArray(photo_id) ? photo_id : photo_id.toString().split();

        // get photos and attach then to album
        _.uniq(photo_id).forEach(async id => {
            const photo = await Photo.fetchById(id, req.user.data.id);
            await album.photos().detach(photo); // detach first to prevent duplicates in db
            await album.photos().attach(photo);
        });

        res.status(201).send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to add photos to album.',
        });
        throw error;
    }
}

/* Remove photos from album */
const removePhotos = async (req, res) => {
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

    try {
        let { photo_id } = matchedData(req);
        const album = await Album.fetchById(req.params.albumId, req.user.data.id);

        // check if album exists and if user is authorized to remove photos from it
        if (!album) {
            res.status(403).send({
                status: 'fail',
                message: `Not allowed to remove photos from album with id: ${req.params.albumId}`
            });
            return;
        }

        // convert single photo id to array
        photo_id = _.isArray(photo_id) ? photo_id : photo_id.toString().split();

        // get photos and detach them from album
        _.uniq(photo_id).forEach(async id => {
            const photo = await Photo.fetchById(id, req.user.data.id);
            await album.photos().detach(photo);
        });

        res.send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to remove photos from album.',
        });
        throw error;
    }
}

module.exports = {
    index,
    destroy,
    show,
    store,
    addPhotos,
    removePhotos
}