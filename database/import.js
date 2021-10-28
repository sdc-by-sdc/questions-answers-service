const mongoose = require('mongoose');
const { Question, Answer } = require('./schemas.js');
const fs = require('fs');
const fastcsv = require('fast-csv');

//------PHOTO CSV IMPORT
const importPhotosIntoAnswer = function () {
  let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/answers_photos.csv');
  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      csvStream.pause();

      let csvData = {
        photoId: Number(data[0]),
        answerId: Number(data[1]),
        url: data[2]
      };

      Answer.updateOne(
        { answerId: Number(data[1]) },
        { $push: { photos: csvData } }
      )
        .then(() => {
          console.log(`added photo ${data[0]} to ${data[1]}th answer`);
          csvStream.resume();
        })
        .catch((err) => {
          console.log('error in added photos to collection', err);
        });
    })
    .on('end', function () {
      console.log('FINISHED adding photos to answers collection');
    });

  stream.pipe(csvStream);
};


//------ANSWER CSV IMPORT
const importAnswers = function () {
  let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/answers.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      csvStream.pause();

      let csvData = {
        answerId: Number(data[0]),
        questionId: Number(data[1]),
        answerBody: data[2],
        answerDate: data[3],
        answererName: data[4],
        answererEmail: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7]),
        photos: []
      };

      Answer.insertMany(csvData, (err, results) => {
        if (err) {
          console.log('error inserting answer', err);
        } else {
          console.log(`inserted ${data[0]} answers`);
          csvStream.resume();
        }
      });
    })
    .on('end', function () {
      console.log('successfully inserted answers');
    });

  stream.pipe(csvStream);
};

//-----QUESTION CSV IMPORT
const importQuestions = function () {
  let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/questions.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      csvStream.pause();
      let csvData = {
        questionId: Number(data[0]),
        productId: Number(data[1]),
        questionBody: data[2],
        questionDate: data[3],
        askerName: data[4],
        askerEmail: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7])
      };

      Question.insertMany(csvData, (err, results) => {
        if (err) {
          console.log('err adding to collection', err);
        } else {
          console.log(`imported ${data[0]} questions`);
          csvStream.resume();
        }
      });

    })
    .on('end', function () {
      console.log('Finsihed inserting all questions');
    });

  stream.pipe(csvStream);
};

module.exports = { importPhotosIntoAnswer, importAnswers, importQuestions };