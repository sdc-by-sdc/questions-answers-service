// const app = require('../server/index.js');
// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const { Question } = require('../database/schemas.js');

// beforeEach((done) => {
//   mongoose.connect('mongodb://localhost:27017/JestDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done());
//   });
// });

// describe('testing', () => {
//   test('GET /qa/questions', async () => {
//     const post = await Post.create({
//       questionId: 1,
//       productId: 1,
//       questionBody: 'testing',
//       questionDate: new Date(),
//       askerName: 'tester',
//       askerEmail: 'test@gmail.com',
//       reported: 0,
//       helpfulness: 0
//     });

//     await supertest(app).get('/qa/questions')
//       .expect(200)
//       .then((response) => {
//         expect(Array.isArray(response.body)).toBeTruthy();
//         expect(response.body.length).toEqual(1);

//         // Check data
//         expect(response.body[0]._id).toBe(post.id);
//         expect(response.body[0].questionBody).toBe(post.questionBody);
//         expect(response.body[0].askerName).toBe(post.askerName);
//       })
//   })
// })