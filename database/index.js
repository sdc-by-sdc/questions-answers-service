//create a database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questions', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connection successful!');
});

let qaSchema = new mongoose.Schema({
  productId: Number,
  questions: [{
    questionId: Number,
    questionBody: String,
    questionDate: Date,
    askerName: String,
    askerEmail: String,
    helpfulness: Number,
    reported: Number,
    answers: [{
      answerId: Number,
      answerBody: String,
      answerDate: Date,
      answererName: String,
      answererEmail: String,
      helpfulness: Number,
      reported: Number,
      photos: [{
        photoId: Number,
        url: String
      }]
    }]
  }]
});

const Question = mongoose.model('Question', qaSchema);

