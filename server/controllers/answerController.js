const Answer = require('../models/answer.js');

//display a list of answers for a given question
const answerList = (req, res) => {
  console.log('get questions params', req.params);
  res.end();
};

//adds an answer to a given question
const answerCreatePost = (req, res) => {
  console.log('post answer params: ', req.params);
  console.log('post answer body: ', req.body);
  res.end();
};

//mark answer as helpful
const answerHelpfulPut = (req, res) => {
  console.log('put answer helpful params: ', req.params);
  res.end();
};

//report an answer
const answerReportPut = (req, res) => {
  console.log('put answer report params: ', req.params);
  res.end();
};

module.exports = { answerList, answerCreatePost, answerHelpfulPut, answerReportPut };