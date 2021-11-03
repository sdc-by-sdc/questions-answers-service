const app = require('./app.js');
const db = require('../database/index.js');
const { importQuestions, importAnswers, importPhotosIntoAnswer } = require('../database/import.js');
const port = 3030;

// importQuestions(); //45 minutes, 3,518,963 questions
// importAnswers();
// importPhotosIntoAnswer();

app.listen(port, () => {
  console.log(`Q&A Servive listening at http://localhost:${port}`);
});


//this file connects express server to port 3030, and connects sdcQA database. We use this for development/production.