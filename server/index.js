const express = require('express');
const app = express();
const db = require('../database/index.js');
const { importQuestions, importAnswers, importPhotosIntoAnswer } = require('../database/import.js');
const indexRouter = require('./routes/index.js');
const port = 3030;

// importQuestions(); //45 minutes, 3,518,963 questions
// importAnswers();
// importPhotosIntoAnswer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qa', indexRouter);

app.listen(port, () => {
  console.log(`Q&A Servive listening at http://localhost:${port}`);
});

