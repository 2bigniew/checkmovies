const validator = require('validator');
const MovieService = require('../../Service/Movies/MovieService');

// strona nazywa się omdb natomiast odpoowiedź zwraca imdb_id :/
exports.getMovie = async function cbGetMovie(req, res, next){
    const title = req.body.title ? req.body.title : '';
    const omdbId = req.body.omdbId ? req.body.omdbId : '';
    let count = 0, movie, newMovie = undefined, movieDB;
    if (!omdbId && !title) throw new Error('You have to pass at least on value: title or odb id');
    if (omdbId && !validator.isAlphanumeric(omdbId)) throw new Error('omdb id should have only letters and numbers');
    if (title && !validator.isAlphanumeric(title)) throw new Error('title should have only letters and numbers');  
    
    if(omdbId !== '') {
        count = await MovieService.movieReadDB.getMovieCountByOmbdId(omdbId);
    } else if (title !== '') {
        count = await MovieService.movieReadDB.getMovieCountByTitle(title);
    }
    console.log(count.count);
    if(count.count > 0) {
        if(omdbId) {
            movieDB = await MovieService.movieReadDB.getMovieByomdbId(omdbId);
            movie = JSON.parse(movieDB.dataValues.data_string)
        } else {
            movieDB = await MovieService.movieReadDB.getMovieByTitle(title);
            movie = JSON.parse(movieDB.dataValues.data_string)
        }
    } else {
        if(omdbId) {
            movie = await MovieService.movieRead.getMovieFromOmdbById(omdbId);
        } else {
            movie = await MovieService.movieRead.getMovieFromOmdbByTitle(title);
        }
        const movieData = {
            title: movie.Title,
            omdb_id: movie.imdbID,
            data_string: JSON.stringify(movie)
        }
        newMovie = await MovieService.movieCreateDB.createMovie(movieData);
    }
    if(newMovie) {
        movie = JSON.parse(newMovie.data_string);
    }

    res.status(200);
    const response = {
        data: movie
    }
    console.log(response);
    res.json(response);
} 