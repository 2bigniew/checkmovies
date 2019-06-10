const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const CommentModel = require('../Database/Model/CommentModel');
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

describe('/POST comment', () => {
    it('It should not POST comment without odmb_id and title', ( done ) => {
        const comment = {
            title: '',
            omdbId: '',
            comment: 'Test'
        };

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end(( err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('Error');
                done();
            });
    });
});

describe('/POST comment', () => {
    it('It should not POST comment without comment', ( done ) => {
        const comment = {
            comment: '',
            title: 'Snatch',
            omdbId: 'tt0208092',
        }

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end(( err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('Error');
                done();
            });
    });
});

describe('/POST comment', () => {
    it('It should not POST comment with diffrent then alphanumeric characters in omdbId', ( done ) => {
        const comment = {
            comment: 'Test',
            title: 'Snatch',
            omdbId: 'tt020--!8092',
        }

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end(( err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('Error');
                done();
            });
    });
});

describe('/POST comment', () => {
    it('It should not POST comment if it does not exist in database', ( done ) => {
        const comment = {
            comment: 'Test',
            title: 'Snatchtt0208092',
            omdbId: '',
        }

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end(( err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('Error');
                done();
            });
    });
});

describe('/POST comment', () => {
    it('It should POST comment with comment and title or comment and omdb_id', ( done ) => {
        const comment = {
            comment: 'Test',
            title: 'Snatch',
            omdbId: 'tt0208092',
        }

        chai.request(app)
            .post('/api/comments')
            .send(comment)
            .end(( err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(201);
                res.should.be.json; 
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('comment_id');
                res.body.data.should.have.property('comment');
                res.body.data.comment_id.should.be.a('number'); 
                res.body.data.comment.should.be.a('string'); 
                done();
            });
    });
});

describe('/GET comment', () => {
    it('It should GET all comments from database', ( done ) => {
        chai.request(app)
            .get('/api/comments')
            .end(( err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json; 
                res.body.should.be.a('array');
                res.body[0].should.be.a('object'); 
                res.body[0].should.have.property('comment_id'); 
                res.body[0].should.have.property('comment'); 
                res.body[0].should.have.property('movie_id'); 
                res.body[0].comment_id.should.be.a('number'); 
                res.body[0].comment.should.be.a('string'); 
                done();
            });
    });
});