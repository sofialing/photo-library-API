/**
 * User Model
 */
const bcrypt = require('bcrypt');

module.exports = bookshelf => {
	return bookshelf.model('User', {
		hidden: ['id', 'password'],
		requireFetch: false,
		tableName: 'users',

		photos() {
			return this.hasMany('Photo');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, {
		hashSaltRounds: 10,
		async login(email, password) {
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			return await bcrypt.compare(password, user.get('password'))
				? user
				: false;
		}
	}
	);
};
