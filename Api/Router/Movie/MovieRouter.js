const express = require('express');
const router = express.Router();
const errorHandler = require('../../Middleware/error');

const MovieReadCtrl = require('../../Controller/Movie/MovieReadController');

router.post('/find', errorHandler.catchAsyncErrors(MovieReadCtrl.getMovie));

module.exports = router;