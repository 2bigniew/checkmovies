const validator = require('validator');
const MovieService = require('../../Service/Movies/MovieService');

exports.getAllMovies = async function cbGetAllMovies(req, res, next){
    const movies = await MovieService.movieReadDB.getAllMoviesFromDb();
    res.json(movies);
} 