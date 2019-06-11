'use strict';
require('dotenv').config({ path: './Config/.env' });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const con = require('./Database/Connection/Connection.js');
const errorHandler = require('./Api/Middleware/error');

const MoviesRouter = require('./Api/Router/Movie/MovieRouter');
const CommentsRouter = require('./Api/Router/Comment/CommentRouter');
const MovieChatRouter = require('./Api/Router/Chat/MovieChatRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(helmet.noCache());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'sameorigin' }));

//Routes **************************************************************
app.use('/api/movies', MoviesRouter);
app.use('/api/comments', CommentsRouter);
app.use('/api/chat', MovieChatRouter);

app.get('/', (req, res, next) => {
    res.render('index.ejs')
});



//Errors **************************************************************

app.use(errorHandler.notFound);
app.use(errorHandler.catchErrors);

module.exports = app; 