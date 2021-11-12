const mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  questionId: { type: Number, unique: true },
  productId: { type: Number, index: true },
  questionBody: String,
  questionDate: Date,
  askerName: String,
  askerEmail: String,
  reported: Number,
  helpfulness: Number
});

let answerSchema = new mongoose.Schema({
  answerId: { type: Number, unique: true },
  questionId: { type: Number, index: true },
  answerBody: String,
  answerDate: Date,
  answererName: String,
  answererEmail: String,
  reported: Number,
  helpfulness: Number,
  photos: [
    {
      photoId: { type: Number, unique: true, sparse: true },
      answerId: Number,
      url: String
    }
  ]
});

let Question = mongoose.model('Question', questionSchema);
let Answer = mongoose.model('Answer', answerSchema);

module.exports = { Question, Answer };