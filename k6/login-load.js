import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    ramping_login: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 25 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<700'],
  },
};

const API_BASE_URL = __ENV.API_BASE_URL || 'http://localhost:5000';
const USERNAME = __ENV.USERNAME || 'alex';
const PASSWORD = __ENV.PASSWORD || '123456';

export default function loginLoad() {
  const url = `${API_BASE_URL}/users?username=${encodeURIComponent(
    USERNAME
  )}&password=${encodeURIComponent(PASSWORD)}`;
  const res = http.get(url, { tags: { name: 'LoginQuery' } });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'user found': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data) && data.length > 0;
      } catch {
        return false;
      }
    },
  });

  sleep(Math.random() * 2 + 0.5);
}
