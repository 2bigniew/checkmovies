const Sequalize = require('sequelize');
const con = require('../Connection/Connection');

const Movie = con.define('Movie', {
  movie_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequalize.STRING },
  imbd_id: { type: Sequalize.STRING },
}, {
  tableName: 'movies',
  createdAt: 'created_at',
  updatedAt: false,
  underscored: true
});

module.exports = Movie;