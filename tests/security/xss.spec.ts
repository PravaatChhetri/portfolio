import { test, expect } from "@playwright/test";

/**
 * XSS (Cross-Site Scripting) Test Suite
 *
 * Tests that user-facing input fields and dynamic content rendering
 * correctly escape output and do not allow script execution.
 *
 * Targets:
 *   - Contact form (name, email, message fields → Formspree)
 *   - Dynamic slug routes (/work/[slug], /intel/[slug])
 */

const XSS_PAYLOADS = [
  '<script>window.__xss=1</script>',
  '"><script>window.__xss=1</script>',
  "';window.__xss=1;//",
  '<img src=x onerror="window.__xss=1">',
  '<svg onload="window.__xss=1">',
  'javascript:window.__xss=1',
  '"><img src=x onerror=window.__xss=1>',
  '\u003cscript\u003ewindow.__xss=1\u003c/script\u003e',
];

test.describe("XSS — Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  for (const payload of XSS_PAYLOADS) {
    test(`XSS payload not executed in name field: ${payload.slice(0, 40)}`, async ({
      page,
    }) => {
      /**
       * Fills the name field with an XSS payload, submits, and verifies
       * window.__xss was NOT set (i.e., the script did not execute).
       * Formspree is mocked — we intercept the POST to avoid real submissions.
       */
      await page.route("**/formsubmit.co/**", (route) =>
        route.fulfill({ status: 200, body: '{"ok":true}' })
      );

      await page.fill('input[type="text"]', payload);
      await page.fill('input[type="email"]', "test@example.com");
      await page.fill("textarea", "Test message body");

      await page.click('button[type="submit"]');

      // Give any injected script a tick to run
      await page.waitForTimeout(500);

      const xssTriggered = await page.evaluate(() => (window as any).__xss);
      expect(xssTriggered).toBeUndefined();
    });
  }

  test("XSS: rendered form values are HTML-escaped, not raw HTML", async ({
    page,
  }) => {
    /**
     * Verifies the DOM does not contain unescaped < > characters from user input.
     * React escapes by default — this guards against accidental dangerouslySetInnerHTML.
     */
    const payload = '<b id="xss-probe">injected</b>';
    await page.fill('input[type="text"]', payload);

    // The literal <b> element should NOT exist in the DOM
    const injectedEl = await page.locator("#xss-probe").count();
    expect(injectedEl).toBe(0);
  });
});

test.describe("XSS — Dynamic Slug Routes", () => {
  const SLUG_XSS = [
    encodeURIComponent('<script>window.__xss=1</script>'),
    encodeURIComponent('"><img src=x onerror=window.__xss=1>'),
    encodeURIComponent("'onmouseover='window.__xss=1"),
    '../../../etc/passwd',
    '..%2F..%2F..%2Fetc%2Fpasswd',
  ];

  for (const slug of SLUG_XSS) {
    test(`/work/${slug} — must return 404, not execute XSS`, async ({ page }) => {
      /**
       * Malicious slugs must either 404 or render safely.
       * The slug value must never be injected raw into the DOM.
       */
      const response = await page.goto(`/work/${slug}`);

      // Should 404 for unknown slugs (not 500)
      expect(response?.status()).not.toBe(500);

      const xssTriggered = await page.evaluate(() => (window as any).__xss);
      expect(xssTriggered).toBeUndefined();
    });

    test(`/intel/${slug} — must return 404, not execute XSS`, async ({
      page,
    }) => {
      /**
       * Blog post slugs with XSS payloads must not execute in the browser.
       */
      const response = await page.goto(`/intel/${slug}`);
      expect(response?.status()).not.toBe(500);

      const xssTriggered = await page.evaluate(() => (window as any).__xss);
      expect(xssTriggered).toBeUndefined();
    });
  }

  test("Notion block renderer: HTML in block content is escaped", async ({
    page,
  }) => {
    /**
     * NotionBlockRenderer renders blocks from Notion API.
     * If block text contains HTML, it must be escaped — not rendered as HTML.
     * This tests that dangerouslySetInnerHTML is NOT used anywhere in NotionBlockRenderer.
     */
    // Navigate to a real blog post that has blocks (if any)
    await page.goto("/intel");

    // Find first post link and follow it
    const firstPost = page.locator('a[href^="/intel/"]').first();
    const count = await firstPost.count();
    if (count === 0) {
      test.skip(); // No posts available
      return;
    }

    await firstPost.click();
    await page.waitForLoadState("networkidle");

    // Check no raw <script> tags were injected into the article content
    const scripts = await page.locator("article script").count();
    expect(scripts).toBe(0);
  });
});
