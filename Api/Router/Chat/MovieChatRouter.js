const express = require('express');
const router = express.Router();
const errorHandler = require('../../Middleware/error');

const MovieChatCtrl = require('../../Controller/Chat/MovieChatController');

router.get('/movies', errorHandler.catchAsyncErrors(MovieChatCtrl.handleChat));

module.exports = router;