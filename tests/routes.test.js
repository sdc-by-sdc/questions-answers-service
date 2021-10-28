const app = require('../server/app.js');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { Question } = require('../database/schemas.js');

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(done);
});

afterAll((done) => {
  mongoose.connection.close(done);
})

describe('testing', () => {
  test('GET /qa/questions', async () => {
    const post = await Question.create({
      questionId: 1,
      productId: 1,
      questionBody: 'testing',
      questionDate: new Date(),
      askerName: 'tester',
      askerEmail: 'test@gmail.com',
      reported: 0,
      helpfulness: 0
    });

    await supertest(app).get('/qa/questions?product_id=1&page=1&count=100')
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(!Array.isArray(response.body)).toBeTruthy();
        // expect(response.body.length).toEqual(1);

        // // Check data
        // expect(response.body[0]._id).toBe(post.id);
        // expect(response.body[0].questionBody).toBe(post.questionBody);
        // expect(response.body[0].askerName).toBe(post.askerName);
      })
  })
})