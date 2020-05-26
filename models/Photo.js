/**
 * User Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		hidden: ['id', 'user_id'],
		user() {
			return this.belongsTo('User');
		}
	});
};
