const { getQuestionsForProduct, createQuestionForProduct } = require('../models/question.js');
const { getAnswerForQuestion } = require('../models/answer.js');

//display a list of questions
const questionList = (req, res) => {
  // console.log('reached /qa/questions endpoint');
  // console.log('req.query: ', req.query);
  //req.query:  { product_id: '1', page: '1', count: '100' }
  const { product_id, page, count } = req.query;

  getQuestionsForProduct(product_id, page, count, (err, finalResponse) => {
    if (err) {
      console.log('err logged in getQuestionsForProduct controllers/questionController', err);
    } else {
      console.log('RESPONSE: ', finalResponse);
      //iterate over finalResponse.result
      //invoke getAnswerForQuestion(question_id, page, count)
    }
  });
  res.end();
};

//adds a question for a given product
const questionCreatePost = (req, res) => {
  console.log('post question body', req.body);
  const { body, name, email, product_id } = req.body;

  //invoke createQuestionForProduct(body, name, email, productId)
  createQuestionForProduct(body, name, email, product_id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(results);
    }
  })
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
