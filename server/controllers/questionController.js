const { getQuestionsForProduct } = require('../models/question.js');

//display a list of questions
const questionList = (req, res) => {
  console.log('reached /qa/questions endpoint');
  console.log('req.query: ', req.query);
  //req.query:  { product_id: '1', page: '1', count: '100' }
  const { product_id, page, count } = req.query;

  getQuestionsForProduct(product_id, page, count);

  res.end();
};

//adds a question for a given product
const questionCreatePost = (req, res) => {
  console.log('post question body', req.body);
  res.end();
};

//mark question as helpful
const questionHelpfulPut = (req, res) => {
  console.log('put question helpful params: ', req.params);
  res.end();
};

//report question
const questionReportPut = (req, res) => {
  console.log('put question report params: ', req.params);
  res.end();
};

module.exports = { questionList, questionCreatePost, questionHelpfulPut, questionReportPut };
