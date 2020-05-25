const express = require('express');
const router = express.Router();
const { createRules } = require('../validation/profile');
const { register } = require('../controllers/auth_controller');

/* GET home page. */
router.get('/', (req, res) => {
	res.send({ status: 'success', title: 'Express' });
});

/* Register a new account */
router.post('/api/v1/register', createRules, register);

module.exports = router;
