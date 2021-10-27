const db = require('../../database');
const { Question } = require('../../database/schemas.js');

const getQuestionsForProduct = (product_id, page = 1, count = 100) => {
  console.log('model getQuestionsForProduct invoked! ', product_id, page, count);
  console.log(typeof product_id, typeof page, typeof count);

  Question.find({ productId: Number(product_id) }).limit(count)
    .then((response) => {
      console.log(response);
    });

};

module.exports = { getQuestionsForProduct };