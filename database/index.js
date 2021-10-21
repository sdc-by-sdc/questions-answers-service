//create a database
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const csvtojson = require('csvtojson');
const fs = require('fs');
const fastcsv = require('fast-csv');
mongoose.connect('mongodb://localhost/sdcQA', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connection successful!');
});

// csvtojson()
//   .fromFile('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/sample.csv')
//   .then(csvData => {
//     console.log(csvData);
//   });

//----- SAMPLE CSV IMPORT
let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/sample.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push({
      questionId: Number(data[0]),
      productId: Number(data[1]),
      questionBody: data[2],
      questionDate: data[3],
      askerName: data[4],
      askerEmail: data[5],
      reported: Number(data[6]),
      helpfulness: Number(data[7])
    });
  })
  .on('end', function () {
    // remove the first line: header
    csvData.shift();
    // console.log(csvData);

    // save to the MongoDB database collection
    let collectionName = 'sample';
    let collection = db.collection(collectionName);
    collection.insertMany(csvData, (err, results) => {
      if (err) {
        console.log('err adding to collection', err);
      } else {
        console.log('Import CSV into database successfully.');
      }
    });
  });

stream.pipe(csvStream);

// //------PHOTO CSV IMPORT
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/answers_photos.csv');
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', function (data) {
//     csvData.push({
//       photoId: data[0],
//       answerId: data[1],
//       url: data[2]
//     });
//   })
//   .on('end', function () {
//     // remove the first line: header
//     csvData.shift();
//     // console.log(csvData);

//     // save to the MongoDB database collection
//     let collectionName = 'photos';
//     let collection = db.collection(collectionName);
//     collection.insertMany(csvData, (err, results) => {
//       if (err) {
//         console.log('err adding to collection', err);
//       } else {
//         console.log('Import CSV into database successfully.');
//       }
//     });
//   });

// stream.pipe(csvStream);

// //------ANSWER CSV IMPORT
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/answers.csv');
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', function (data) {
//     csvData.push({
//       answerId: data[0],
//       questionId: data[1],
//       answerBody: data[2],
//       answerDate: data[3],
//       answererName: data[4],
//       answererEmail: data[5],
//       reported: data[6],
//       helpfulness: data[7]
//     });
//   })
//   .on('end', function () {
//     // remove the first line: header
//     csvData.shift();
//     // console.log(csvData);

//     // save to the MongoDB database collection
//     let collectionName = 'answers';
//     let collection = db.collection(collectionName);
//     collection.insertMany(csvData, (err, results) => {
//       if (err) {
//         console.log('err adding to collection', err);
//       } else {
//         console.log('Import CSV into database successfully.');
//       }
//     });
//   });

// stream.pipe(csvStream);

// //-----QUESTION CSV IMPORT
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/questions.csv');
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', function (data) {
//     csvData.push({
//       questionId: data[0],
//       productId: data[1],
//       questionBody: data[2],
//       questionDate: data[3],
//       askerName: data[4],
//       askerEmail: data[5],
//       reported: data[6],
//       helpfulness: data[7]
//     });
//   })
//   .on('end', function () {
//     // remove the first line: header
//     csvData.shift();
//     // console.log(csvData);

//     // save to the MongoDB database collection
//     let collectionName = 'questions';
//     let collection = db.collection(collectionName);
//     collection.insertMany(csvData, (err, results) => {
//       if (err) {
//         console.log('err adding to collection', err);
//       } else {
//         console.log('Import CSV into database successfully.');
//       }
//     });
//   });

// stream.pipe(csvStream);

// let questionSchema = new mongoose.Schema({
//   questionId: Number,
//   productId: Number,
//   questionBody: String,
//   questionDate: Date,
//   askerName: String,
//   askerEmail: String,
//   reported: Number,
//   helpfulness: Number
// });

// let answerSchema = new mongoose.Schema({
//   answerId: Number,
//   questionId: Number,
//   answerBody: String,
//   answerDate: Date,
//   answererName: String,
//   answererEmail: String,
//   reported: Number,
//   helpfulness: Number
// });

// let photoSchema = new mongoose.Schema({
//   photoId: Number,
//   answerId: Number,
//   url: String
// });


