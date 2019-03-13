require('dotenv').config()
const knex = require('knex')(require('./knex'));
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;