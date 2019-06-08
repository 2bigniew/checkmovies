const CommentModel = require('../../../Database/Model/CommentModel');
const Sequalize = require('sequelize');

class CommentReadDB {
    constructor(CommentModel, Sequalize){
        this.CommentModel = CommentModel;
        this.sq = Sequalize

        this.getAllCommentsFromDb = this.getAllCommentsFromDb.bind(this);
    }

    async getAllCommentsFromDb() {
        const data = await this.CommentModel.findAll();
        const comments = data.map( c => c.dataValues);
        return comments;
    }

}

class CommentCreateDB {
    constructor(CommentModel, Sequalize){
        this.CommentModel = CommentModel;
        this.sq = Sequalize

        this.createComment = this.createComment.bind(this);
    }

    async createComment(commentData){
        const newComment = await this.CommentModel.create({ 
            comment: commentData.comment,
            movie_id: commentData.movieId
        });
        return newComment;
    }
}

exports.commentReadDB = new CommentReadDB(CommentModel, Sequalize);
exports.commentCreateDB = new CommentCreateDB(CommentModel, Sequalize);