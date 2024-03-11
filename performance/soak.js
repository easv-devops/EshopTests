import http from 'k6/http';

export let options = {
    vus: 10, // My normal load from the load test is 8 users - in your load test add a bit more.
    duration: '30m', // The load test ran for 10 minutes - I'll keep this running for longer.
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

export default function () {
    http.get('http://localhost:5222/api/v1/catalog/items');
}