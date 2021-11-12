import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios:
  {
    constant_request_rate:
    {
      executor: "constant-arrival-rate",
      rate: 1000,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 200,
      maxVUs: 200,
    },
  },
};

// //GET QUESTIONS
// export default function () {
//   let productId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
//   const BASE_URL = `http://localhost:3030/qa/questions?product_id=${productId}&page=1&count=100`;
//   http.get(`${BASE_URL}`);
// };

// //GET ANSWERS
// export default function () {
//   let questionId = Math.floor(Math.random() * (3500000 - 2000000) + 2000000);
//   const BASE_URL = `http://localhost:3030/qa/questions/${questionId}/answers?page=1&count=100`;
//   http.get(`${BASE_URL}`);
// };

// //POST QUESTIONS
// export default function () {
//   const BASE_URL = `http://localhost:3030/qa/questions`;
//   const data = JSON.stringify({
//     name: 'christina',
//     body: 'Am I using k6 right?',
//     email: 'christina@gmail.com',
//     product_id: 999
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   http.post(`${BASE_URL}`, data, params);
// };

// //POST ANSWERS
// export default function () {
//   let questionId = Math.floor(Math.random() * (3500000 - 2000000) + 2000000);
//   const BASE_URL = `http://localhost:3030/qa/questions/${questionId}/answers`;
//   const data = JSON.stringify({
//     name: 'christina',
//     body: 'Am I using k6 right?',
//     email: 'christina@gmail.com',
//     photos: ['https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80']
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   http.post(`${BASE_URL}`, data, params);
// };

