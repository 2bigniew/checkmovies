const express = require('express');
const router = express.Router();
const errorHandler = require('../../Middleware/error');

const MovieReadCtrl = require('../../Controller/Movie/MovieReadController');
const MovieCreateCtrl = require('../../Controller/Movie/MovieCreateController');

router.get('/all', errorHandler.catchAsyncErrors(MovieReadCtrl.getAllMovies));

router.post('/find', errorHandler.catchAsyncErrors(MovieCreateCtrl.getMovie));

module.exports = router;