import { test, expect } from "@playwright/test";

/**
 * Security Headers Test Suite
 *
 * Verifies that all pages return correct HTTP security headers.
 * Currently next.config.js has NO security headers configured — these tests
 * will FAIL until headers are added. Use them as a to-fix checklist.
 *
 * Fix: add a `headers()` function to next.config.js (see README).
 */

const PAGES = ["/", "/work", "/intel", "/stack", "/contact"];

test.describe("Security Headers", () => {
  for (const path of PAGES) {
    test(`${path} — X-Frame-Options must be DENY or SAMEORIGIN`, async ({
      request,
    }) => {
      /**
       * Prevents the site from being embedded in an iframe (clickjacking).
       */
      const res = await request.get(path);
      const header = res.headers()["x-frame-options"];
      expect(
        header,
        `Missing X-Frame-Options on ${path}`
      ).toMatch(/^(DENY|SAMEORIGIN)$/i);
    });

    test(`${path} — X-Content-Type-Options must be nosniff`, async ({
      request,
    }) => {
      /**
       * Prevents browsers from MIME-sniffing the response away from declared type.
       */
      const res = await request.get(path);
      expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    });

    test(`${path} — Referrer-Policy must be strict`, async ({ request }) => {
      /**
       * Controls how much referrer info is sent with requests.
       * Acceptable values: strict-origin-when-cross-origin, no-referrer, same-origin.
       */
      const res = await request.get(path);
      const policy = res.headers()["referrer-policy"];
      expect(policy).toBeTruthy();
      expect(policy).toMatch(
        /strict-origin|no-referrer|same-origin/i
      );
    });

    test(`${path} — Permissions-Policy should restrict sensitive APIs`, async ({
      request,
    }) => {
      /**
       * Disables browser APIs this site doesn't need (camera, mic, geolocation).
       */
      const res = await request.get(path);
      const policy = res.headers()["permissions-policy"];
      expect(policy, `Missing Permissions-Policy on ${path}`).toBeTruthy();
    });
  }

  test("/ — HSTS header present (HTTPS only)", async ({ request }) => {
    /**
     * Strict-Transport-Security forces HTTPS for all future visits.
     * Only applies in production — skip if running on HTTP locally.
     */
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    if (baseUrl.startsWith("http://")) {
      test.skip();
      return;
    }
    const res = await request.get("/");
    const hsts = res.headers()["strict-transport-security"];
    expect(hsts, "Missing HSTS header").toBeTruthy();
    expect(hsts).toContain("max-age");
  });

  test("/ — X-Powered-By header must NOT be exposed", async ({ request }) => {
    /**
     * Hides the server technology stack from potential attackers.
     * Next.js exposes this by default — must be suppressed in config.
     */
    const res = await request.get("/");
    const powered = res.headers()["x-powered-by"];
    expect(powered, "X-Powered-By is leaking server info").toBeUndefined();
  });

  test("404 page — must not leak stack traces or server info", async ({
    request,
  }) => {
    /**
     * Error pages must not expose internal framework/path details.
     */
    const res = await request.get("/this-route-does-not-exist-xyzzy");
    const body = await res.text();
    expect(body).not.toMatch(/at\s+\w+\s+\(.*\.js:\d+/); // JS stack trace
    expect(body).not.toMatch(/ENOENT|EACCES/); // Node.js file errors
    expect(body).not.toContain("node_modules");
  });
});
