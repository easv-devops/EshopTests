import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 8 }, // This is a VERY small load only because I'm running this on my local machine. In a real-world scenario, you'd want to increase this number.
        { duration: '9m40s', target: 8 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    }
};

export default function () {
    http.get('http://localhost:5222/api/v1/catalog/items');
    sleep(100);
}