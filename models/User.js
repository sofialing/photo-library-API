/**
 * User Model
 */
module.exports = bookshelf => {
	return bookshelf.model(
		'User',
		{
			tableName: 'users',
		},
		{
			hashSaltRounds: 10,
		}
	);
};
