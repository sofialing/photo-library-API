const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth_controller');
const { createRules } = require('../validation/profile');

/* Login using JWT-token */
router.post('/login', login);

/* Register a new account */
router.post('/register', createRules, register);

module.exports = router;
