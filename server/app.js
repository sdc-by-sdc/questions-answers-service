const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qa', indexRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Used for testing
module.exports = app;

//this file only contains server logic, we can run npm test which will create a new testing db because the database file isn't loaded onto it
