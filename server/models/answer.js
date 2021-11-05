// const db = require('../../database');
const { Answer } = require('../../database/schemas.js');
const { findIdForNextDocument } = require('../../database/index.js');

const getAnswersForQuestion = (question_id, page, count, callback) => {
  // console.log('getAnswersForQuestion: ', question_id, page, count);

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

const createAnswerForQuestion = (body, name, email, photos, question_id, callback, reported = 0, helpfulness = 0) => {
  let isoDate = new Date().toISOString();

  //would this run if photos is an empty array?
  let finalPhotosPromises = photos.map(url => {
    return createPhotoDocumentPromise(url);
  });

  findIdForNextDocument('answersTrack', 'answer_id', (newAnswerId) => {
    Promise.all(finalPhotosPromises)
      .then(finalPhotos => {
        let newAnswerDocument = {
          answerId: newAnswerId,
          questionId: question_id,
          answerBody: body,
          answerDate: isoDate,
          answererName: name,
          answererEmail: email,
          reported: reported,
          helpfulness: helpfulness,
          photos: finalPhotos
        };
        console.log(newAnswerDocument);
        Answer.create(newAnswerDocument)
          .then(result => {
            callback(null, result);
          })
          .catch(err => {
            callback(err);
          })
      })
      .catch(err => {
        callback(err);
      });
  });
};

const createPhotoDocumentPromise = (url) => {
  return new Promise((resolve, reject) => {
    findIdForNextDocument('photosTrack', 'photo_id', (newPhotoId) => {
      let photoObj = { photoId: newPhotoId, url: url };
      resolve(photoObj);
    })
  })
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

module.exports = { getAnswersForQuestion, markAnswerHelpful, reportAnswer, createAnswerForQuestion };

