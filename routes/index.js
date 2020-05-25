const router = require('express').Router();
const { login, register } = require('../controllers/auth_controller');
const { validateToken } = require('../controllers/middlewares/auth');
const { createRules } = require('../validation/profile');

/* Login using JWT-token */
router.post('/login', login);

/* Register a new account */
router.post('/register', createRules, register);

/* Show users photos */
router.use('/photos', [validateToken], require('./photos'))

module.exports = router;
