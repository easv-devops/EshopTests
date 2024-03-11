import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 8 },
        { duration: '30s', target: 8 },
        { duration: '5s', target: 25},      // First spike: Sudden ramp-up to 25 VUs
        { duration: '30s', target: 25 },    // First spike: Let's stick there for a while.
        { duration: '5s', target: 8 },      // First spike: Ramp down to normal load
        { duration: '5s', target: 30 },     // Second spike: Sudden ramp-up to 30 VUs - let the spikes increase slowly to see how the application behaves under pressure.
        { duration: '30s', target: 30 },    // Second spike: Hold the 30 VUs for a while
        { duration: '5s', target: 8 },      // Second spike: Ramp down to normal load
        { duration: '5s', target: 40 },     // Third spike: Sudden ramp-up to 40 VUs
        { duration: '30s', target: 40 },    // Third spike: Hold the 40 VUs for a while
        { duration: '5s', target: 8 },      // Third spike: Ramp down to normal load
        { duration: '30s', target: 8 }      // Stick to normal load to figure out if the system behaves normally after the spikes.
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    }
};

export default function () {
    http.get('http://localhost:5222/api/v1/catalog/items');
    sleep(1000);
}