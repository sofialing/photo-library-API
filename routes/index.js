const router = require('express').Router();
const { login, refresh, register } = require('../controllers/auth_controller');
const { validateToken } = require('../controllers/middlewares/auth');
const { createAccount } = require('../validation/rules');

// Base endpoint.
router.get('/', (req, res) => res.send({ status: 'success', data: { message: 'Photo Library API.' } }));

// Album Routes.
router.use('/albums', [validateToken], require('./albums'));

// Photo Routes.
router.use('/photos', [validateToken], require('./photos'));

// Login and get access-token.
router.post('/login', login);

// Refresh access-token.
router.post('/refresh', refresh);

// Create a new user.
router.post('/register', createAccount, register);

module.exports = router;