const CommentService = require('../../Service/Comment/CommentService');

exports.getAllComments = async function cbGetMovie(req, res, next){
    const comments = await CommentService.commentReadDB.getAllCommentsFromDb();
    res.status(200);
    res.json(comments);
}