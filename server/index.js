const express = require('express');
const app = express();
const db = require('../database/index.js');
const port = 3030;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Q&A Servive listening at http://localhost:${port}`);
});