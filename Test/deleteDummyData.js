const chai = require('chai');
const chaiHttp = require('chai-http');
const CommentModel = require('../Database/Model/CommentModel');
const MovieModel = require('../Database/Model/MovieModel');
const Sequalize = require('sequelize');

chai.use(chaiHttp);

describe('DELETE ALL FROM comments', () => {
    it('It should remove all from comments table', (done) => {
        const Op = Sequalize.Op;
    
        CommentModel.destroy({
            where: {
                comment_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});

describe('DELETE ALL FROM movies', () => {
    it('It should remove all from comments table', (done) => {
        const Op = Sequalize.Op;
    
        MovieModel.destroy({
            where: {
                movie_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});