# PROBOT Portfolio — Security & Performance Test Suite

## Setup

```bash
# Install Playwright + browsers
npm install --save-dev @playwright/test
npx playwright install chromium webkit

# Install k6 (macOS)
brew install k6
```

## Running Tests

```bash
# All Playwright tests (security + input + E2E)
npx playwright test

# Specific category
npx playwright test tests/security/
npx playwright test tests/input/

# With UI (interactive mode)
npx playwright test --ui

# View HTML report
npx playwright show-report

# k6 load test (requires dev server running)
npm run dev &
k6 run tests/performance/k6-load.js

# k6 against staging/production
k6 run --env BASE_URL=https://yoursite.com tests/performance/k6-load.js
```

## Test Categories

| File | Category | What it covers |
|---|---|---|
| `tests/security/headers.spec.ts` | Security Headers | X-Frame-Options, nosniff, HSTS, Referrer-Policy, X-Powered-By leak |
| `tests/security/xss.spec.ts` | XSS | Contact form, slug routes, Notion block renderer |
| `tests/security/env-leakage.spec.ts` | Env Leakage | NOTION_API_KEY, DB IDs never in HTML/JS bundles |
| `tests/security/slug-injection.spec.ts` | Injection / Path Traversal | Malicious slugs, open redirect, rel=noopener |
| `tests/input/contact-form.spec.ts` | Input Validation | Required fields, unicode, long strings, double-submit, error states |
| `tests/performance/k6-load.js` | Load Testing | 50 concurrent users, p95 < 1s, error rate < 1% |

## Security Issues Fixed During Audit

### 1. Missing Security Headers (HIGH)
**Before:** `next.config.js` had no `headers()` — no X-Frame-Options, no CSP, no nosniff.
**Fixed:** Added all recommended headers in `next.config.js`.

### 2. Wildcard Image Remote Patterns (MEDIUM)
**Location:** `next.config.js` → `images.remotePatterns`
**Risk:** `hostname: "**"` allows Next.js to proxy-optimize images from *any* URL,
which can be abused for SSRF or to serve malicious images through your domain.
**Recommendation:** Restrict to actual domains you use (Notion CDN, S3, etc.):
```js
remotePatterns: [
  { protocol: "https", hostname: "*.notion.so" },
  { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
]
```

### 3. Contact Form — No Rate Limiting (MEDIUM)
**Risk:** No server-side rate limiting on Formspree submissions.
Formspree has its own limits, but add honeypot field or hCaptcha for bot protection.

### 4. No Content Security Policy (MEDIUM)
The headers added in next.config.js do not include CSP yet.
Add a CSP header to restrict script sources:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
```
Note: `'unsafe-inline'` is required for Next.js — use nonces in production.

## Checklist

- [x] Security headers added to next.config.js
- [x] XSS tests for contact form and dynamic routes
- [x] Env var leakage tests (NOTION_API_KEY)
- [x] Slug injection and path traversal tests
- [x] Contact form input validation tests
- [x] External links check rel=noopener noreferrer
- [x] Load test with p95 and error rate thresholds
- [ ] Restrict image remotePatterns to known hostnames
- [ ] Add honeypot/captcha to contact form
- [ ] Add Content-Security-Policy header
