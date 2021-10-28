// const db = require('../../database');
const { Question } = require('../../database/schemas.js');
const { findIdForNextDocument } = require('../../database/index.js');

const getQuestionsForProduct = (product_id, page = 1, count = 100, callback) => {
  // console.log('model getQuestionsForProduct invoked! ', product_id, page, count);
  // console.log(typeof product_id, typeof page, typeof count);

  let finalResponse = {
    product_id: product_id,
    results: []
  };

  Question.find({ productId: Number(product_id) }).limit(count)
    .then((response) => {
      // console.log(response);
      //response is an array of question objects
      response.forEach((questionObj) => {
        //create finalQuestion object
        const { questionId, questionBody, questionDate, askerName, askerEmail, reported, helpfulness } = questionObj;

        let reportedBoolean = reported === 0 ? false : true;

        let question = {
          question_id: questionId,
          question_body: questionBody,
          question_date: questionDate.toString(),
          asker_name: askerName,
          question_helpfulness: helpfulness,
          reported: reportedBoolean,
          answers: {}
        };

        finalResponse.results.push(question);
      });
      // console.log('FINAL RESPONSE: ', finalResponse);
      callback(null, finalResponse);
    })
    .catch((err) => {
      console.log('error in getQuestionsForProduct in models/question');
      callback(err);
    });
};

const createQuestionForProduct = (body, name, email, product_id, callback, reported = 0, helpfulness = 0) => {
  console.log('createQuestionForProduct invoked!');
  let isoDate = new Date().toISOString();

  findIdForNextDocument('questionsTrack', 'question_id');
  // console.log('newValue: ', newValue);
  // let newQuestionDocument = {
  //   questionId: findIdForNextDocument('questionsTrack', 'question_id'),
  //   productId: product_id,
  //   questionBody: body,
  //   questionDate: isoDate,
  //   askerName: name,
  //   askerEmail: email,
  //   reported: reported,
  //   helpfulness: helpfulness
  // }

  // Question.create(newQuestionDocument)
  //   .then(results => {
  //     console.log(results);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  // console.log(body, name, email, product_id, reported, helpfulness, isoDate)

}

module.exports = { getQuestionsForProduct, createQuestionForProduct };