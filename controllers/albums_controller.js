/**
 * Album Controller
 */
const { Album, User } = require('../models')

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

const store = (req, res) => {
    res.status(501).send({
        status: 'error',
        message: 'Not Implemented yet.'
    });
}

module.exports = {
    index,
    show,
    store,
}