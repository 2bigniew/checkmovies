'use strict';
require('dotenv').config({ path: './Config/.env' });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const con = require('./Database/Connection/Connection.js');
const errorHandler = require('./Api/Middleware/error');

const MoviesRouter = require('./Api/Router/Movie/MovieRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Routes **************************************************************
app.use('/api/movies', MoviesRouter);

con.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(( err ) => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/', (req, res, next) => {
    res.render('index.ejs')
});

//Errors **************************************************************

app.use(errorHandler.notFound);
app.use(errorHandler.catchErrors);

module.exports = app; 