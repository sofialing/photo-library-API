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
        res.sendStatus(404);
    }
}

/* Delete a specific photo */
const destroy = async (req, res) => {
    try {
        const photo = await Photo.fetchById(req.params.photoId, req.user.data.id, { withRelated: 'albums' });

        // check if photo exists and belongs to authenticated user
        if (!photo) {
            res.status(401).send({
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
            message: 'Something went wrong when trying to delete photo.',
        });
    }

}

/* Get a specific photo */
const show = async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user.data.id;

    try {
        const photo = await new Photo({ id: photoId, user_id: userId }).fetch();
        res.send({ photo });
    } catch (error) {
        res.sendStatus(404);
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

    const validData = matchedData(req);
    validData.user_id = req.user.data.id;

    try {
        const photo = await new Photo(validData).save();
        res.send({
            status: 'success',
            data: { photo }
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
    destroy,
    show,
    store
}