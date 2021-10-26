const express = require('express');
const app = express();
const db = require('../database/index.js');
const port = 3030;

app.get('/qa/questions', (req, res) => {
  console.log('reached /qa/questions endpoint');
  res.end();
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  //params should contain question_id, page, count
  console.log('get questions params', req.params);
  res.end();
});

app.post('/qa/questions', (req, res) => {
  console.log('post question body', req.body);
  res.end();
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('post answer params: ', req.params);
  console.log('post answer body: ', req.body);
  res.end();
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log('put question helpful params: ', req.params);
  res.end();
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log('put question report params: ', req.params);
  res.end();
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('put answer helpful params: ', req.params);
  res.end();
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log('put answer report params: ', req.params);
  res.end();
});

app.listen(port, () => {
  console.log(`Q&A Servive listening at http://localhost:${port}`);
});