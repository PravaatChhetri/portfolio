import { test, expect } from "@playwright/test";

/**
 * Slug Injection & Path Traversal Test Suite
 *
 * Dynamic routes /work/[slug] and /intel/[slug] pass the slug value
 * into Notion API queries. Tests verify that:
 *   1. Malicious slugs never cause 500 errors
 *   2. Path traversal attempts are blocked
 *   3. Special characters are handled safely
 *   4. Overly long slugs don't crash the server
 */

const TRAVERSAL_SLUGS = [
  "../../../etc/passwd",
  "..%2F..%2F..%2Fetc%2Fpasswd",
  "....//....//etc//passwd",
  "%2e%2e%2f%2e%2e%2fetc%2fpasswd",
  "..\\..\\..\\windows\\system32\\drivers\\etc\\hosts",
];

const INJECTION_SLUGS = [
  "' OR '1'='1",
  "' OR 1=1--",
  "; DROP TABLE projects; --",
  "${7*7}",                   // Template injection
  "{{7*7}}",                  // Jinja/Handlebars injection
  "#{7*7}",
  "__proto__[admin]=true",    // Prototype pollution
  "constructor.prototype.admin=true",
];

const SPECIAL_CHAR_SLUGS = [
  "null",
  "undefined",
  "NaN",
  "0",
  "-1",
  "true",
  "false",
  " ",
  "%20",
  "a".repeat(500),            // Very long slug
  "emoji-🔥-slug",
  "slug with spaces",
];

test.describe("Slug Injection — /work/[slug]", () => {
  for (const slug of TRAVERSAL_SLUGS) {
    test(`Path traversal blocked: /work/${slug.slice(0, 50)}`, async ({
      page,
    }) => {
      /**
       * Path traversal slugs must return 404, not expose server files.
       */
      const response = await page.goto(
        `/work/${encodeURIComponent(slug)}`
      );
      expect(response?.status()).not.toBe(500);
      const body = await page.content();
      expect(body).not.toContain("root:");             // /etc/passwd content
      expect(body).not.toContain("[extensions]");      // Windows hosts file
    });
  }

  for (const slug of INJECTION_SLUGS) {
    test(`Injection payload handled safely: /work/${slug.slice(0, 40)}`, async ({
      page,
    }) => {
      /**
       * SQL/NoSQL/template injection in slugs must not cause server errors.
       * Notion uses its own query language — these won't cause SQL injection,
       * but must not crash the app or leak errors.
       */
      const response = await page.goto(
        `/work/${encodeURIComponent(slug)}`
      );
      // Must be 404 (not found) or 200 (somehow matched), never 500
      expect(response?.status()).not.toBe(500);

      const body = await page.content();
      expect(body).not.toMatch(/syntax error/i);
      expect(body).not.toMatch(/unexpected token/i);
      expect(body).not.toContain("NOTION_API_KEY");
    });
  }

  for (const slug of SPECIAL_CHAR_SLUGS) {
    test(`Special chars handled: "${slug.slice(0, 30)}"`, async ({ page }) => {
      /**
       * Edge-case slugs (null, empty, very long, unicode) must not crash the server.
       */
      const response = await page.goto(
        `/work/${encodeURIComponent(slug)}`
      );
      expect(response?.status()).not.toBe(500);
    });
  }
});

test.describe("Slug Injection — /intel/[slug]", () => {
  for (const slug of TRAVERSAL_SLUGS) {
    test(`Path traversal blocked: /intel/${slug.slice(0, 50)}`, async ({
      page,
    }) => {
      const response = await page.goto(
        `/intel/${encodeURIComponent(slug)}`
      );
      expect(response?.status()).not.toBe(500);
      const body = await page.content();
      expect(body).not.toContain("root:");
    });
  }

  for (const slug of INJECTION_SLUGS) {
    test(`Injection payload handled: /intel/${slug.slice(0, 40)}`, async ({
      page,
    }) => {
      const response = await page.goto(
        `/intel/${encodeURIComponent(slug)}`
      );
      expect(response?.status()).not.toBe(500);
    });
  }
});

test.describe("Open Redirect", () => {
  test("External links use rel=noopener noreferrer", async ({ page }) => {
    /**
     * All external links (target=_blank) must have rel="noopener noreferrer"
     * to prevent tabnapping attacks where the opened page can redirect the
     * opener via window.opener.location.
     */
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    const externalLinks = await page
      .locator('a[target="_blank"]')
      .evaluateAll((els) =>
        els.map((el) => ({
          href: el.getAttribute("href"),
          rel: el.getAttribute("rel"),
        }))
      );

    for (const link of externalLinks) {
      expect(
        link.rel,
        `External link ${link.href} missing rel=noopener noreferrer`
      ).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    }
  });

  test("No open redirect via query params", async ({ request }) => {
    /**
     * Query params like ?redirect=https://evil.com must not cause a redirect
     * to external domains.
     */
    const res = await request.get("/?redirect=https://evil.example.com", {
      maxRedirects: 0,
    });
    const location = res.headers()["location"] || "";
    expect(location).not.toContain("evil.example.com");
  });
});
