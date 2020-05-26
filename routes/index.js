const router = require('express').Router();
const { login, register } = require('../controllers/auth_controller');
const { validateToken } = require('../controllers/middlewares/auth');
const { createAccount } = require('../validation/create');

/* Login using JWT-token */
router.post('/login', login);

/* Register a new account */
router.post('/register', createAccount, register);

/* Show authenticated users photos */
router.use('/photos', [validateToken], require('./photos'))

/* Show authenticated users albums */
router.use('/albums', [validateToken], require('./albums'))

module.exports = router;
