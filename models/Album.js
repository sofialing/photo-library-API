/**
 * User Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		hidden: ['user_id'],
		user() {
			return this.belongsTo('User');
		}
	});
};
