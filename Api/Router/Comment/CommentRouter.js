const express = require('express');
const router = express.Router();
const errorHandler = require('../../Middleware/error');

const CommentReadCtrl = require('../../Controller/Comment/CommentReadController');
const CommentCreateCtrl = require('../../Controller/Comment/CommentCreateController');

router.get('/', errorHandler.catchAsyncErrors(CommentReadCtrl.getAllComments));
router.post('/', errorHandler.catchAsyncErrors(CommentCreateCtrl.addComment));

module.exports = router;