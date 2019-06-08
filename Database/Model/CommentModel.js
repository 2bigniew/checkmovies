const Sequalize = require('sequelize');
const con = require('../Connection/Connection');

const Comment = con.define('Comment', {
  comment_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true },
  comment: { type: Sequalize.TEXT },
  movie_id: { type: Sequalize.INTEGER }
}, {
  tableName: 'comments',
  createdAt: 'created_at',
  updatedAt: false,
  underscored: true
});

module.exports = Comment;