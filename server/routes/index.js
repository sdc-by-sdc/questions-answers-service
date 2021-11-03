const express = require('express');
const router = express.Router();

//controller modules
const { questionList, questionCreatePost, questionHelpfulPut, questionReportPut } = require('../controllers/questionController.js');
const { answerList, answerCreatePost, answerHelpfulPut, answerReportPut } = require('../controllers/answerController.js');

//QUESTION ROUTES
router.get('/questions', questionList);
router.post('/questions', questionCreatePost);
router.put('/questions/:question_id/helpful', questionHelpfulPut);
router.put('/questions/:question_id/report', questionReportPut);

//ANSWER ROUTES
router.get('/questions/:question_id/answers', answerList);
router.post('/questions/:question_id/answers', answerCreatePost);
router.put('/answers/:answer_id/helpful', answerHelpfulPut);
router.put('/answers/:answer_id/report', answerReportPut);

module.exports = router;