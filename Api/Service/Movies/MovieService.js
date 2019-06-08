const omdb = require('../../../Config/axiosOmdb');
const axios = require('axios');
const MovieModel = require('../../../Database/Model/MovieModel');
const Sequalize = require('sequelize');

class MovieRead {
    constructor(omdburl, MovieModel, Sequalize){
        this.omdburl = omdburl;
        this.MovieModel = MovieModel;
        this.sq = Sequalize

        this.getMovieFromOmdbByTitle = this.getMovieFromOmdbByTitle.bind(this);
        this.getMovieFromOmdbById = this.getMovieFromOmdbById.bind(this);
    }

    async getMovieFromOmdbByTitle(title){
        const movie = await axios.get(this.omdburl+'t='+title);
        return movie.data;
    }

    async getMovieFromOmdbById(omdbId){
        const movie = await axios.get(this.omdburl+'i='+omdbId);
        return movie.data;
    }

}

class MovieReadDB {
    constructor(omdburl, MovieModel, Sequalize){
        this.omdburl = omdburl;
        this.MovieModel = MovieModel;
        this.sq = Sequalize

        this.getAllMoviesFromDb = this.getAllMoviesFromDb.bind(this);
        this.getMovieCountByOmbdId = this.getMovieCountByOmbdId.bind(this);
        this.getMovieCountByTitle = this.getMovieCountByTitle.bind(this);
        this.getMovieByomdbId = this.getMovieByomdbId.bind(this);
        this.getMovieByTitle = this.getMovieByTitle.bind(this);
    }

    async getAllMoviesFromDb() {
        const data = await this.MovieModel.findAll();
        const movies = data.map( m => m.dataValues);
        return movies;
    }

    async getMovieByomdbId(omdbId) {
        const Op = this.sq.Op;
        const movie = await this.MovieModel.findOne({
            where: {
                omdb_id: {
                    [Op.iLike]: omdbId
                }
            }
        });
        return movie;
    }

    async getMovieByTitle(title) {
        const Op = this.sq.Op;
        const movie = await this.MovieModel.findOne({
            where: {
                title: {
                    [Op.iLike]: title
                }
            }
        });
        return movie;
    }

    async getMovieCountByOmbdId(omdbId){
        const Op = this.sq.Op;
        const movieCount = await this.MovieModel.findAndCountAll({
            where: {
                omdb_id: {
                    [Op.iLike]: omdbId
                }
            }
        });
        return movieCount;
    }

    async getMovieCountByTitle(title){
        const Op = this.sq.Op;
        const movieCount = await this.MovieModel.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: title
                }
            }
        });
        return movieCount;
    }
}

class MovieCreateDB {
    constructor(omdburl, MovieModel, Sequalize){
        this.omdburl = omdburl;
        this.MovieModel = MovieModel;
        this.sq = Sequalize

        this.createMovie = this.createMovie.bind(this);
    }

    async createMovie(movieData){
        console.log(movieData);
        const newMovie = await this.MovieModel.create({ 
            title: movieData.title,
            omdb_id: movieData.omdb_id,
            data_string: movieData.data_string
        });
        return newMovie;
    }
}

exports.movieRead = new MovieRead(omdb.baseURL, MovieModel, Sequalize);
exports.movieReadDB = new MovieReadDB(omdb.baseURL, MovieModel, Sequalize);
exports.movieCreateDB = new MovieCreateDB(omdb.baseURL, MovieModel, Sequalize);