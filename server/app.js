const express = require('express');
const app = express();
const { importQuestions, importAnswers, importPhotosIntoAnswer } = require('../database/import.js');
const indexRouter = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qa', indexRouter);

//Used for testing
module.exports = app;

//this file only contains server connection, we can run npm test which will create a new testing db because the database file isn't loaded onto it
