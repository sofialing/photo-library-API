/**
 * User Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		hidden: ['id', 'user_id'],
		user() {
			return this.belongsTo('User');
		},
		albums() {
			return this.belongsToMany('Album');
		}
	},
		{
			fetchById(id, user_id = null, fetchOptions = {}) {
				return new this({ id, user_id }).fetch(fetchOptions);
			},
		}
	);
};
