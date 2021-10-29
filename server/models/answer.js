// const db = require('../../database');
const { Answer } = require('../../database/schemas.js');

const getAnswersForQuestion = (question_id, page, count, callback) => {
  console.log('getAnswersForQuestion: ', question_id, page, count);

  let finalResponse = {
    question: question_id,
    page: page,
    count: count,
    results: []
  };

  Answer.find({ questionId: Number(question_id) }).limit(count)
    .then((response) => {
      // console.log('answers: ', response);
      //response is an array of answer objects for a question
      response.forEach((answerObj) => {
        const { answerId, answerBody, answerDate, answererName, helpfulness, photos, reported } = answerObj;
        if (reported === 0) {
          let finalPhotos = photos.map((photo) => {
            return {
              id: photo.photoId,
              url: photo.url
            };
          });
          // console.log('photos: ', photos);
          let answer = {
            answer_id: answerId,
            body: answerBody,
            date: answerDate,
            answerer_name: answererName,
            helpfulness: helpfulness,
            photos: finalPhotos
          };
          finalResponse.results.push(answer);
        }
      });
      // console.log('finalanswers: ', finalResponse);
      // console.log('finalphotos: ', finalResponse.results[0].photos);
      // console.log('answerid: 5', finalResponse.results[0]);
      callback(null, finalResponse);
    })
    .catch((err) => {
      console.log('err in getAnswersForQuestion mondels/answers', err);
      callback(err);
    });
};

const markAnswerHelpful = (answer_id, callback) => {
  Answer.findOneAndUpdate(
    { answerId: answer_id },
    { $inc: { helpfulness: 1 } }
  )
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
}

const reportAnswer = (answer_id, callback) => {
  Answer.findOneAndUpdate(
    { answerId: answer_id },
    { reported: 1 }
  )
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
}

module.exports = { getAnswersForQuestion, markAnswerHelpful, reportAnswer };

