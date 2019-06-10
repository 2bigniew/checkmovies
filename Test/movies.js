const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const MovieModel = require('../Database/Model/MovieModel');
const Sequalize = require('sequelize');

chai.use(chaiHttp);

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

describe('/POST movies', () => {
    it('It should not POST movie without omdbId and title', ( done ) => {
        const movie = {
            title: '',
            omdbId: ''
        };

        chai.request(app)
            .post('/api/movies')
            .send(movie)
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

describe('/POST movies', () => {
    it('It should not POST movie with diffrent then alphanumeric characters in omdbId', ( done ) => {
        const movie = {
            title: 'Snatch',
            omdbId: 'tt020--!8092',
        }

        chai.request(app)
            .post('/api/movies')
            .send(movie)
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

describe('/POST movies', () => {
    it('It should not POST movie if app does not find it in OMDB' , ( done ) => {
        const movie = {
            title: 'Snatcadqwdqq3esdasfsfsah',
            omdbId: '',
        }

        chai.request(app)
            .post('/api/movies')
            .send(movie)
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

describe('/POST movies', () => {
    it('It should POST movie with title or omdbId', ( done ) => {
        const movie = {
            title: 'Snatch',
            omdbId: 'tt0208092',
        }

        chai.request(app)
            .post('/api/movies')
            .send(movie)
            .end(( err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(201);
                res.should.be.json; 
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('Title');
                res.body.data.should.have.property('imdbID');
                res.body.data.should.have.property('Type');
                res.body.data.should.have.property('Poster');
                res.body.data.should.have.property('movie_id');
                res.body.data.movie_id.should.be.a('number'); 
                res.body.data.Title.should.be.a('string'); 
                done();
            });
    });
});

describe('/GET movies', () => {
    it('It should GET all movies from database', ( done ) => {
        chai.request(app)
            .get('/api/movies')
            .end(( err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json; 
                res.body.should.be.a('array');
                res.body[0].should.be.a('object'); 
                res.body[0].should.have.property('movie_id'); 
                res.body[0].should.have.property('omdb_id'); 
                res.body[0].should.have.property('data_string'); 
                res.body[0].movie_id.should.be.a('number'); 
                res.body[0].title.should.be.a('string'); 
                done();
            });
    });
});