import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 8 },      // Normal load
        { duration: '10s', target: 8 },     // Stick to normal for a short while
        { duration: '5s', target: 25},      // Add more users to the systems...
        { duration: '30s', target: 25 },    // And wait for behavior to change (maybe)
        { duration: '5s', target: 50 },     // If nothing happens add even more users...
        { duration: '30s', target: 50 },    // And wait for behavior to change (maybe)
        { duration: '5s', target: 100 },    // Repeat...
        { duration: '30s', target: 100 },
        { duration: '5s', target: 150 },    // Repeat...
        { duration: '30s', target: 150 },
                                            // And may continue repeating until you know your upper limit.
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