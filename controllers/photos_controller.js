/**
 * Photos controller
 */
const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models')

/* Get all photos */
const index = async (req, res) => {
    try {
        const user = await new User({ id: req.user.data.id }).fetch({ withRelated: 'photos' });
        const photos = user.related('photos');

        res.send({
            status: 'success',
            data: { photos }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to get photos.',
        });
        throw error;
    }
}

/* Delete a specific photo and remove all associations */
const destroy = async (req, res) => {
    try {
        const photo = await Photo.fetchById(req.params.photoId, req.user.data.id, { withRelated: 'albums' });

        // check if photo exists and belongs to authenticated user
        if (!photo) {
            res.status(403).send({
                status: 'fail',
                message: `Not allowed to delete photo with id: ${req.params.photoId}`
            });
            return;
        }

        // remove all associations 
        await photo.albums().detach();
        // delete photo
        await photo.destroy();

        res.status(204).send({
            status: 'succes',
            data: null
        })

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to delete photo.',
        });
        throw error;
    }

}

/* Get a specific photo */
const show = async (req, res) => {
    try {
        const photo = await Photo.fetchById(req.params.photoId, req.user.data.id);

        // check if photo exists and belongs to authenticated user
        if (!photo) {
            res.status(404).send({
                status: 'fail',
                message: `Could not find photo with id: ${req.params.photoId}`
            })
            return;
        }

        res.send({
            status: 'succes',
            data: { photo }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to get photo.',
        });
        throw error;
    }
};

/* Store new photo */
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
        const photo = await new Photo(data).save();
        res.status(201).send({
            status: 'success',
            data: { photo }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'An unexpected error occurred when trying to store new photo.',
        });
        throw error;
    }
}

module.exports = {
    index,
    destroy,
    show,
    store
}