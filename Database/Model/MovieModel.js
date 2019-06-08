const Sequalize = require('sequelize');
const con = require('../Connection/Connection');

const Movie = con.define('Movie', {
  movie_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequalize.STRING },
  omdb_id: { type: Sequalize.STRING },
  data_string: { type: Sequalize.TEXT }
}, {
  tableName: 'movies',
  createdAt: 'created_at',
  updatedAt: false,
  underscored: true
});

module.exports = Movie;