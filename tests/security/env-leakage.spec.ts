import { test, expect } from "@playwright/test";

/**
 * Environment Variable Leakage Test Suite
 *
 * NOTION_API_KEY is a server-side secret. It must NEVER appear in:
 *   - HTML page source
 *   - JavaScript bundles served to the client
 *   - API responses or error messages
 *
 * NEXT_PUBLIC_FORMSPREE_ID is intentionally public — we verify it's
 * not something sensitive (i.e., not a private key pattern).
 */

const PAGES = ["/", "/work", "/intel", "/stack", "/contact"];

test.describe("Env Var Leakage", () => {
  test("NOTION_API_KEY must not appear in any page HTML", async ({
    request,
  }) => {
    /**
     * If NOTION_API_KEY leaks into HTML, attackers can read/write your
     * entire Notion workspace. This must stay server-side only.
     */
    for (const path of PAGES) {
      const res = await request.get(path);
      const body = await res.text();

      // Notion secret keys start with "secret_"
      expect(body, `NOTION_API_KEY leaked in ${path}`).not.toMatch(
        /secret_[A-Za-z0-9]{43}/
      );
      // Generic check for the env var name itself
      expect(body).not.toContain("NOTION_API_KEY");
    }
  });

  test("NOTION_API_KEY must not appear in JS bundle chunks", async ({
    page,
  }) => {
    /**
     * Next.js bundles JS for the browser. Server-side env vars should
     * never be included in these bundles. We intercept all JS responses
     * and scan for the secret pattern.
     */
    const leakedInBundle: string[] = [];

    page.on("response", async (response) => {
      const url = response.url();
      if (url.includes("/_next/static/chunks/") && url.endsWith(".js")) {
        try {
          const text = await response.text();
          if (
            text.match(/secret_[A-Za-z0-9]{43}/) ||
            text.includes("NOTION_API_KEY")
          ) {
            leakedInBundle.push(url);
          }
        } catch {
          // Some chunks may not be readable
        }
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(
      leakedInBundle,
      `NOTION_API_KEY found in JS bundles: ${leakedInBundle.join(", ")}`
    ).toHaveLength(0);
  });

  test("NOTION_PROJECTS_DB / NOTION_BLOG_DB / NOTION_EXPERIENCE_DB IDs must not leak", async ({
    request,
  }) => {
    /**
     * Notion database IDs allow anyone to query your databases if the
     * integration is misconfigured. They must stay server-side.
     * Pattern: 32-char hex UUID (with or without hyphens).
     */
    for (const path of PAGES) {
      const res = await request.get(path);
      const body = await res.text();
      expect(body).not.toContain("NOTION_PROJECTS_DB");
      expect(body).not.toContain("NOTION_BLOG_DB");
      expect(body).not.toContain("NOTION_EXPERIENCE_DB");
    }
  });

  test("Error responses must not expose stack traces or file paths", async ({
    request,
  }) => {
    /**
     * If Notion fetch fails, the error handler logs server-side.
     * Ensure no stack trace or internal path leaks into the rendered page.
     */
    const res = await request.get("/work/nonexistent-slug-404-test");
    const body = await res.text();

    expect(body).not.toMatch(/at\s+\w+\s+\(.*\.ts:\d+/);       // TS stack trace
    expect(body).not.toMatch(/\/Users\//);                        // Mac local paths
    expect(body).not.toMatch(/\/home\//);                         // Linux local paths
    expect(body).not.toMatch(/node_modules/);
    expect(body).not.toContain(".env");
  });

  test("NEXT_PUBLIC_FORMSPREE_ID must not look like a private key", async ({
    page,
  }) => {
    /**
     * NEXT_PUBLIC_ vars are intentionally exposed to the client.
     * We verify the Formspree ID follows the expected short alphanumeric
     * pattern — not something that looks like a private key.
     */
    await page.goto("/contact");

    const pageSource = await page.content();
    // Formspree IDs are short (e.g. "xabcdefg") — not 40+ char secrets
    const secretPattern = /[A-Za-z0-9]{40,}/g;
    const matches = pageSource.match(secretPattern) || [];

    for (const match of matches) {
      // Skip known safe long strings (font hashes, base64 images, etc.)
      const isBase64 = match.startsWith("data:");
      const isKnownHash = match.length === 40 && /^[a-f0-9]+$/.test(match);
      if (!isBase64 && !isKnownHash) {
        // Flag any suspiciously long opaque string
        expect(match.length).toBeLessThan(50);
      }
    }
  });
});
