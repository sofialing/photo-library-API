/**
 * User Model
 */
const bcrypt = require('bcrypt');

module.exports = bookshelf => {
	return bookshelf.model('User', {
		tableName: 'users',
		hidden: ['id', 'password'],
		photos() {
			return this.hasMany('Photo');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, {
		hashSaltRounds: 10,
		login: async function (email, password) {
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			const hash = user.get('password');
			const result = await bcrypt.compare(password, hash);

			return result ? user : false;
		}
	}
	);
};
