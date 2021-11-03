import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '15s', target: 10 },
//     { duration: '30s', target: 100 },
//     { duration: '15s', target: 0 }, //scale down. Recovery stage.
//   ]
// };

export let options = {
  scenarios:
  {
    constant_request_rate:
    {
      executor: "constant-arrival-rate",
      rate: 100,
      timeUnit: "1s", //change rate
      duration: "30s", //bump it up to 60s
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

// export default function () {
//   const BASE_URL = 'http://localhost:3030'; // make sure this is not production

//   const responses = http.batch([
//     ['GET', `${BASE_URL}/qa/questions?product_id=999999&page=1&count=100`, null],
//     ['GET', `${BASE_URL}/qa/questions?product_id=1000000&page=1&count=100`, null],
//     ['GET', `${BASE_URL}/qa/questions?product_id=800000&page=1&count=100`, null],
//     ['GET', `${BASE_URL}/qa/questions?product_id=999100&page=1&count=100`, null],
//   ]);

//   sleep(1);
// };

export default function () {
  let productId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
  const BASE_URL = `http://localhost:3030/qa/questions?product_id=${productId}&page=1&count=100`;
  http.get(`${BASE_URL}`);
};

