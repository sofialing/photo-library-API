/**
 * Photos controller
 */
const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models')

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

const show = async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user.data.id;

    try {
        const photo = await Photo.where({ id: photoId, user_id: userId }).fetch();
        res.send({ photo });
    } catch (error) {
        res.sendStatus(404);
    }
};

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
    show,
    store
}