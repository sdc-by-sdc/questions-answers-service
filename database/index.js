const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdcQA', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connection successful!');
});

//create questionsTrack database, insert one document with total questions count

//collection = 'questionsTrack', idName = 'question_id'
const findIdForNextDocument = (collectionName, idName, callback) => {
  let incrementedDoc = db.collection(collectionName).findOneAndUpdate(
    { _id: idName },
    { $inc: { value: 1 } },
    { returnDocument: 'after' }
  );

  incrementedDoc
    .then(result => {
      console.log(result.value.value);
      callback(result.value.value);
    });
}

module.exports = { findIdForNextDocument };