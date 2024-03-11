import http from 'k6/http';

export let options = {
    vus: 8, // This is a VERY small load only because I'm running this on my local machine. In a real-world scenario, you'd want to increase this number.
    duration: '10m',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    }
};

export default function () {
    http.get('http://localhost:5222/api/v1/catalog/items');
}