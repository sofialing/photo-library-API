/**
 * Register Album Model
 */
module.exports = bookshelf => {
	return bookshelf.model('Album', {
		hidden: ['user_id'],
		requireFetch: false,
		tableName: 'albums',
		user() {
			return this.belongsTo('User');
		},
		photos() {
			return this.belongsToMany('Photo');
		}
	},
		{
			fetchById(id, user_id, fetchOptions = {}) {
				return new this({ id, user_id }).fetch(fetchOptions);
			},
		}
	);
};
