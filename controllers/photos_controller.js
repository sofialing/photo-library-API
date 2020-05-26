/**
 * Photos controller
 */

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

    // res.sendStatus(501);
};

module.exports = {
    index,
    show
}