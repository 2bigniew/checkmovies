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
        this.getAllMoviesFromDb = this.getAllMoviesFromDb.bind(this);
    }

    async getMovieFromOmdbByTitle(title){
        const movie = await axios.get(this.omdburl+'t='+title);
        return movie.data;
    }

    async getMovieFromOmdbById(omdbId){
        const movie = await axios.get(this.omdburl+'i='+omdbId);
        return movie.data;
    }

    async getAllMoviesFromDb() {
        const data = await this.MovieModel.findAll();
        const movies = data.map( m => m.dataValues);
        return movies;
    }

    async getMovieCountFromDb(omdbId){
        const Op = this.sq.Op;
        const movieCount = this.MovieModel.findAndCountAll({
            where: {
                [Op.iLike]: omdbId
            }
        });

        return movieCount;
    }
}

exports.movieRead = new MovieRead(omdb.baseURL, MovieModel, Sequalize);