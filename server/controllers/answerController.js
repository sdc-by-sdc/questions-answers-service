const { getAnswersForQuestion, markAnswerHelpful, reportAnswer } = require('../models/answer.js');

//display a list of answers for a given question
const answerList = (req, res) => {
  console.log('answerList invoked!');
  const { question_id } = req.params; //could be a potential issue, questionId? not sure.
  const { page, count } = req.query;
  //invoke getAnswersForQuestion(question_id, page, count)
  getAnswersForQuestion(question_id, page, count, (err, answers) => {
    if (err) {
      console.log('err logged in getAnswersForQuestion controllers/answerController', err);
      res.status(500).send(`Failed to get answers for question_id ${question_id}`);
    } else {
      console.log(`Answers for question_id ${question_id}: `, answers);
      res.status(200).send(answers);
    }
  });
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
  const { answer_id } = req.params;

  //invoke markAnswerHelpful(answer_id);
  markAnswerHelpful(answer_id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send(results);
    }
  });
};

//report an answer
const answerReportPut = (req, res) => {
  console.log('put answer report params: ', req.params);
  const { answer_id } = req.params;

  //invoke reportAnswer(answer_id)
  reportAnswer(answer_id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send(results);
    }
  });
};

module.exports = { answerList, answerCreatePost, answerHelpfulPut, answerReportPut };