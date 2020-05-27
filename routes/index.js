const router = require('express').Router();
const { login, refresh, register } = require('../controllers/auth_controller');
const { validateToken } = require('../controllers/middlewares/auth');
const { createAccount } = require('../validation/rules');

/* Show authenticated users photos */
router.use('/photos', [validateToken], require('./photos'))

/* Show authenticated users albums */
router.use('/albums', [validateToken], require('./albums'))

/* Login using JWT-token */
router.post('/login', login);

/* Refresh JWT-token */
router.post('/refresh', refresh);

/* Register a new account */
router.post('/register', createAccount, register);


module.exports = router;
