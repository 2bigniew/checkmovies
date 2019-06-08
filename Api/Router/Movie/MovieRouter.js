const express = require('express');
const router = express.Router();
const errorHandler = require('../../Middleware/error');

const MovieReadCtrl = require('../../Controller/Movie/MovieReadController');
const MovieCreateCtrl = require('../../Controller/Movie/MovieCreateController');

router.get('/', errorHandler.catchAsyncErrors(MovieReadCtrl.getAllMovies));

router.post('/', errorHandler.catchAsyncErrors(MovieCreateCtrl.getMovie));

module.exports = router;