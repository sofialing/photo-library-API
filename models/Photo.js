/**
 * Photo Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Photo', {
		hidden: ['user_id'],
		requireFetch: false,
		tableName: 'photos',
		user() {
			return this.belongsTo('User');
		},
		albums() {
			return this.belongsToMany('Album');
		}
	},
		{
			fetchById(id, user_id, fetchOptions = {}) {
				return new this({ id, user_id }).fetch(fetchOptions);
			},
		}
	);
};
