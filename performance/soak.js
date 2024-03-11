import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 }, // My normal load from the load test is 8 users - in your load test add a bit more.
        { duration: '29m40s', target: 10 },// The load test ran for 10 minutes - I'll keep this running for longer.
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

export default function () {
    http.get('http://localhost:5222/api/v1/catalog/items');
    sleep(100);
}