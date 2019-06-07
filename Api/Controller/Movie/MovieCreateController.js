const validator = require('validator');
const MovieService = require('../../Service/Movies/MovieService');

exports.getMovie = async function cbGetMovie(req, res, next){
    const title = req.body.title ? req.body.title : '';
    const omdbId = req.body.omdbId ? req.body.omdbId : '';
    console.log(req.body);
    if (title && !validator.isAlphanumeric(title)) {
        console.log('Nie udała się walidacja', title);
    }

    if (omdbId && !validator.isAlphanumeric(omdbId)) {
        console.log('Nie udała się walidacja', omdbId);
    }

    let movie;
    if(omdbId) {
        movie = await MovieService.movieRead.getMovieFromOmdbById(omdbId);
    } else {
        movie = await MovieService.movieRead.getMovieFromOmdbByTitle(title);
    }
    console.log(movie);
    res.status(200);
    const response = {
        data: movie
    }
    res.json(response);
} 