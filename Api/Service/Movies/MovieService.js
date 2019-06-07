const omdb = require('../../../Config/axiosOmdb');
const axios = require('axios');

class MovieRead {
    constructor(omdburl){
        this.omdburl = omdburl;

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

exports.movieRead = new MovieRead(omdb.baseURL);