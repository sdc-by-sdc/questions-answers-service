// const db = require('../../database');
const { Question, Answer } = require('../../database/schemas.js');
const { findIdForNextDocument } = require('../../database/index.js');
const { getAnswersForQuestion } = require('./answer.js');

const getQuestionsForProduct = (product_id, page = 1, count = 100, callback) => {
  // console.log('model getQuestionsForProduct invoked! ', product_id);
  // console.log(typeof product_id, typeof page, typeof count);

  let finalResponse = {
    product_id: product_id,
    results: []
  };

  Question.find({ productId: Number(product_id), reported: 0 }).hint({ productId: 1 }).limit(count)
    .then((response) => {
      // console.log(response);
      //response is an array of question objects
      const pending = [];

      response.forEach((questionObj) => {
        //create finalQuestion object
        const { questionId, questionBody, questionDate, askerName, askerEmail, reported, helpfulness } = questionObj;

        let answer = Answer.aggregate().match({ questionId: questionObj.questionId, reported: 0 }).exec();

        pending.push(answer);
      });

      Promise.all(pending)
        .then(answers => {
          // console.log('ANSWERS: ', answers);
          response.forEach(questionObj => {

            const { questionId, questionBody, questionDate, askerName, askerEmail, reported, helpfulness } = questionObj;

            let question = {
              question_id: questionId,
              question_body: questionBody,
              question_date: questionDate,
              asker_name: askerName,
              question_helpfulness: helpfulness,
              reported: Boolean(reported),
              answers: {}
            };

            let finalAnswers = {};

            answers.forEach(answersArr => {
              if (answersArr.length > 0) {
                answersArr.forEach(answer => {
                  if (answer.questionId === questionObj.questionId) {
                    let photosWithUrlsOnly = answer.photos.map(photo => photo.url);

                    finalAnswers[answer.answerId] = {
                      id: answer.answerId,
                      body: answer.answerBody,
                      date: answer.answerDate,
                      answerer_name: answer.answererName,
                      helpfulness: answer.helpfulness,
                      photos: photosWithUrlsOnly
                    };

                    question.answers = finalAnswers;
                  }
                })
              }

            });
            finalResponse.results.push(question);

          });

          callback(null, finalResponse);
        })
        .catch(err => {
          callback(err);
        });
    })
    .catch((err) => {
      console.log('error in getQuestionsForProduct in models/question', err);
      callback(err);
    });
};

//getAnswersForQuestion in this one needs to return urls in photo array, currently returns id and url.
// const getFinalAnswersPromise = (questionId, page, count, finalAnswers = {}) => {
//   return new Promise((resolve, reject) => {
//     getAnswersForQuestion(questionId, page, count, (err, answersObj) => {
//       let answersCollection = answersObj.results;
//       answersCollection.forEach(answer => {
//         let photosWithUrlsOnly = answer.photos.map(photo => photo.url);
//         let answerWithId = {
//           id: answer.answer_id,
//           body: answer.body,
//           date: answer.date,
//           answerer_name: answer.answerer_name,
//           helpfulness: answer.helpfulness,
//           photos: photosWithUrlsOnly
//         }
//         // delete Object.assign(answerWithId, answer, { id: answer.answer_id }).answer_id;
//         finalAnswers[answerWithId.id] = answerWithId;
//       });
//       // console.log('final answersssss: ', finalAnswers);
//       resolve(finalAnswers);
//     });
//   })
// }

const createQuestionForProduct = (body, name, email, product_id, callback, reported = 0, helpfulness = 0) => {
  // console.log('createQuestionForProduct invoked!');
  let isoDate = new Date().toISOString();

  findIdForNextDocument('questionsTrack', 'question_id', (newId) => {
    let newQuestionDocument = {
      questionId: newId,
      productId: product_id,
      questionBody: body,
      questionDate: isoDate,
      askerName: name,
      askerEmail: email,
      reported: reported,
      helpfulness: helpfulness
    };
    Question.create(newQuestionDocument)
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      })
  });
}

const markQuestionHelpful = (question_id, callback) => {
  Question.findOneAndUpdate(
    { questionId: question_id },
    { $inc: { helpfulness: 1 } }
  )
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    })
}

const reportQuestion = (question_id, callback) => {
  Question.findOneAndUpdate(
    { questionId: question_id },
    { reported: 1 }
  )
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
}

module.exports = { getQuestionsForProduct, createQuestionForProduct, markQuestionHelpful, reportQuestion };