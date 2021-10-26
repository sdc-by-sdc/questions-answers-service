//create a database
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const csvtojson = require('csvtojson');
const fs = require('fs');
const fastcsv = require('fast-csv');
mongoose.connect('mongodb://localhost/sdcQA', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const createIndex = function () {
  db.collection('answers').createIndex({ answerId: 1 });
  console.log('answers collection index created');
  db.collection('photos').createIndex({ answerId: 1 });
  console.log('photos collection index created');
};
//AGGREGATE FUNCTION
const aggregateTest = function () {
  console.log('aggregation pipeline running....');

  const pipeline = [
    {
      $lookup:
      {
        from: 'photos',
        localField: 'answerId',
        foreignField: 'answerId',
        as: 'photosList'
      }
    }
  ];

  // {/* // { $match: { productId: '5' } },
  // // { $group: { _id: '$askerEmail' } } */}
  db.collection('answers').aggregate(pipeline).toArray()
    .then((results) => {
      console.log('aggregation success');
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connection successful!');
  // createIndex();
  // aggregateTest();
});

// csvtojson()
//   .fromFile('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/sample.csv')
//   .then(csvData => {
//     console.log(csvData);
//   });


// //----- SAMPLE CSV IMPORT
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/sample.csv');
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on('data', function (data) {
//     csvData.push({
//       questionId: Number(data[0]),
//       productId: Number(data[1]),
//       questionBody: data[2],
//       questionDate: data[3],
//       askerName: data[4],
//       askerEmail: data[5],
//       reported: Number(data[6]),
//       helpfulness: Number(data[7])
//     });
//   })
//   .on('end', function () {
//     // remove the first line: header
//     csvData.shift();
//     // console.log(csvData);

//     // save to the MongoDB database collection
//     let collectionName = 'sample';
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

//------PHOTO CSV IMPORT
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

    db.collection('answers').update(
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


// //------ANSWER CSV IMPORT
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/answers.csv');

// let csvStream = fastcsv
//   .parse({ skipLines: 1 })
//   .on('data', function (data) {
//     csvStream.pause();

//     let csvData = {
//       answerId: Number(data[0]),
//       questionId: Number(data[1]),
//       answerBody: data[2],
//       answerDate: new Date(data[3]),
//       answererName: data[4],
//       answererEmail: data[5],
//       reported: Number(data[6]),
//       helpfulness: Number(data[7]),
//       photos: []
//     };

//     db.collection('answers').insertOne(csvData, (err, results) => {
//       if (err) {
//         console.log('error inserting answer', err);
//       } else {
//         console.log(`inserted ${data[0]} answers`);
//         csvStream.resume();
//       }
//     });
//   })
//   .on('end', function () {
//     console.log('successfully inserted answers');
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


// //------OTHER IMPLEMENTATION
// let stream = fs.createReadStream('/Users/christinanathan/Desktop/RPP30/questions-answers-service/database/sample.csv', { highWaterMark: 128 * 1024 });
// let csvData = [];
// let counter = 0;
// let csvStream = fastcsv
//   .parse({ headers: true })
//   .on('data', function (data) {
//     console.log('streaming...');
//     counter++;
//     csvData.push({
//       answerId: Number(data[0]),
//       questionId: Number(data[1]),
//       answerBody: data[2],
//       answerDate: new Date(data[3]),
//       answererName: data[4],
//       answererEmail: data[5],
//       reported: Number(data[6]),
//       helpfulness: Number(data[7])
//     });
//     if (csvData.length === 5000) {
//       if (counter <= 5000) {
//         csvData.shift();
//       }
//       const insert = async (chunk) => {
//         try {
//           await db.collection('answers').insertMany(chunk);
//           console.log('Import CSV into database successfully.');
//           csvData = [];
//         } catch (err) {
//           console.log('error insert: ', err);
//         }
//       }
//       insert(csvData);
//     }
//   })
//   .on('end', function () {
//     // remove the first line: header
//     // console.log(csvData);

//     // save to the MongoDB database collection
//     // let collectionName = 'answers';
//     // let collection = db.collection(collectionName);
//     // let dataLength = csvData.length;
//     // for (let i = 0; i < dataLength; i += 5000) {
//     //   let chunk = csvData.slice(i, i + 5000);

//     // }
//   });