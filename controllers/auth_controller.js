/**
 * Auth Controller
 */
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');

const register = async (req, res) => {
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
	try {
		validData.password = await bcrypt.hash(validData.password, 10);
		res.send({ validData });
	} catch (error) {
		res.status(500).send({ status: 'error', message: error.message });
	}
};

module.exports = {
	register,
};
