import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios:
  {
    constant_request_rate:
    {
      executor: "constant-arrival-rate",
      rate: 100,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 200,
      maxVUs: 200,
    },
  },
};

export default function () {
  let productId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
  const BASE_URL = `http://localhost:3030/qa/questions?product_id=${productId}&page=1&count=100`;
  http.get(`${BASE_URL}`);
};

