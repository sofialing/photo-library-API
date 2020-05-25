/**
 * Database connection and models
 */
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'library',
		charset: 'utf8',
	},
});

const bookshelf = require('bookshelf')(knex);

module.exports = {
	bookshelf,
};
