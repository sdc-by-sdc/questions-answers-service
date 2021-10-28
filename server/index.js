const app = require('./app.js');
const db = require('../database/index.js');
const port = 3030;

// importQuestions(); //45 minutes, 3,518,963 questions
// importAnswers();
// importPhotosIntoAnswer();

app.listen(port, () => {
  console.log(`Q&A Servive listening at http://localhost:${port}`);
});


//this file runs the express server, database, we use this for development/production.