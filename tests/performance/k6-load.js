/**
 * k6 Load Test — PROBOT Portfolio
 *
 * Tests performance under simulated concurrent users.
 * Run: k6 run tests/performance/k6-load.js
 * With env: k6 run --env BASE_URL=https://yoursite.com tests/performance/k6-load.js
 *
 * Install k6: brew install k6
 */

import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend } from "k6/metrics";

const errorRate = new Rate("errors");
const notionFetchTime = new Trend("notion_fetch_ms");

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "30s", target: 10 },   // Ramp up to 10 users
    { duration: "1m", target: 25 },    // Hold at 25 users (realistic portfolio traffic)
    { duration: "30s", target: 50 },   // Spike to 50 (e.g., Reddit traffic burst)
    { duration: "30s", target: 0 },    // Ramp down
  ],
  thresholds: {
    // p95 of all requests must complete within 1s (ISR-cached pages should be fast)
    http_req_duration: ["p(95)<1000"],
    // p95 for Notion-backed pages (data may be ISR-cached)
    notion_fetch_ms: ["p(95)<2000"],
    // Error rate must stay below 1%
    errors: ["rate<0.01"],
    // All requests must complete successfully
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  group("Static/ISR pages", () => {
    group("Home page", () => {
      const res = http.get(`${BASE_URL}/`);
      const ok = check(res, {
        "home page 200": (r) => r.status === 200,
        "home page < 800ms": (r) => r.timings.duration < 800,
      });
      errorRate.add(!ok);
    });

    group("Work archive page", () => {
      const res = http.get(`${BASE_URL}/work`);
      const ok = check(res, {
        "work page 200": (r) => r.status === 200,
        "work page < 1000ms": (r) => r.timings.duration < 1000,
      });
      notionFetchTime.add(res.timings.duration);
      errorRate.add(!ok);
    });

    group("Intel feed page", () => {
      const res = http.get(`${BASE_URL}/intel`);
      const ok = check(res, {
        "intel page 200": (r) => r.status === 200,
        "intel page < 1000ms": (r) => r.timings.duration < 1000,
      });
      notionFetchTime.add(res.timings.duration);
      errorRate.add(!ok);
    });

    group("Stack page", () => {
      const res = http.get(`${BASE_URL}/stack`);
      const ok = check(res, {
        "stack page 200": (r) => r.status === 200,
        "stack page < 800ms": (r) => r.timings.duration < 800,
      });
      errorRate.add(!ok);
    });

    group("Contact page", () => {
      const res = http.get(`${BASE_URL}/contact`);
      const ok = check(res, {
        "contact page 200": (r) => r.status === 200,
        "contact page < 800ms": (r) => r.timings.duration < 800,
      });
      errorRate.add(!ok);
    });
  });

  group("Dynamic project pages", () => {
    const slugs = [
      "bnb-signature-verification",
      "probedocs",
      "sha-adventures",
      "bnb-connect",
    ];

    for (const slug of slugs) {
      const res = http.get(`${BASE_URL}/work/${slug}`);
      const ok = check(res, {
        [`/work/${slug} 200 or 404`]: (r) =>
          r.status === 200 || r.status === 404,
        [`/work/${slug} < 1500ms`]: (r) => r.timings.duration < 1500,
      });
      notionFetchTime.add(res.timings.duration);
      errorRate.add(!ok);
    }
  });

  group("404 handling", () => {
    const res = http.get(`${BASE_URL}/this-page-does-not-exist`);
    const ok = check(res, {
      "404 returns 404": (r) => r.status === 404,
      "404 page < 500ms": (r) => r.timings.duration < 500,
    });
    errorRate.add(!ok);
  });

  group("Static assets", () => {
    const res = http.get(`${BASE_URL}/resume.pdf`);
    const ok = check(res, {
      "resume.pdf 200": (r) => r.status === 200,
      "resume.pdf < 2000ms": (r) => r.timings.duration < 2000,
    });
    errorRate.add(!ok);
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    stdout: JSON.stringify(data, null, 2),
    "tests/performance/k6-results.json": JSON.stringify(data, null, 2),
  };
}
