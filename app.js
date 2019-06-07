'use strict';
require('dotenv').config({ path: './Config/.env' });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const con = require('./Database/Connection/Connection.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());

con.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(( err ) => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/', (req, res, next) => {
    res.send('Henlo')
});

module.exports = app; 