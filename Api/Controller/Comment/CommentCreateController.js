const validator = require('validator');
const MovieService = require('../../Service/Movies/MovieService');
const CommentService = require('../../Service/Comment/CommentService');

// strona nazywa się omdb natomiast odpoowiedź zwraca imdb_id :/
exports.addComment = async function cbGetMovie(req, res, next){
    const title = req.body.title ? req.body.title : '';
    const omdbId = req.body.omdbId ? req.body.omdbId : '';
    const comment = req.body.comment ? req.body.comment : '';
    let count = 0, movie;
    if (!comment) throw new Error('You have to pass a comment');
    if (!omdbId && !title) throw new Error('You have to pass at least on value: title or odb id');
    if (omdbId && !validator.isAlphanumeric(omdbId)) throw new Error('omdb id should have only letters and numbers');
    if (title && !validator.isAlphanumeric(title)) throw new Error('title should have only letters and numbers');  
       
    if(omdbId !== '') {
        count = await MovieService.movieReadDB.getMovieCountByOmbdId(omdbId);
    } else if (title !== '') {
        count = await MovieService.movieReadDB.getMovieCountByTitle(title);
    }

    if(count.count <= 0) {
        throw new Error('Movie doesn\'t exists in database. You have too search movie, before you send a comment');  
    } else {
        if(omdbId) {
            movie = await MovieService.movieReadDB.getMovieByomdbId(omdbId);
        } else {
            movie = await MovieService.movieReadDB.getMovieByTitle(title);
        }
    }
    const commentData = {
        comment: comment,
        movieId: movie.dataValues.movie_id
    }
    const newComment = await CommentService.commentCreateDB.createComment(commentData);

    res.status(200);
    const response = {
        data: newComment
    }
    res.json(response);
} 