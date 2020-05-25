/**
 * User Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		user() {
			return this.belongsTo('User');
		}
	});
};
