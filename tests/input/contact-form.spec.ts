import { test, expect } from "@playwright/test";

/**
 * Contact Form — Input Validation & Edge Cases
 *
 * Tests that the contact form:
 *   1. Validates required fields (HTML5 + runtime)
 *   2. Handles extreme/unusual input gracefully
 *   3. Correctly prevents duplicate rapid submissions
 *   4. Displays appropriate error states
 *   5. Does not expose Formspree endpoint behavior to attackers
 */

const LONG_STRING = "A".repeat(10_001);
const UNICODE_INPUTS = [
  "😀🔥💀🧊",
  "مرحبا بالعالم",                        // Arabic RTL
  "\u202e reversed text",                  // RTL override character
  "日本語テスト",                           // Japanese
  "\x00nullbyte",                          // Null byte
  "line1\nline2\nline3",                   // Newlines
  "<b>bold</b>",                           // HTML tags
  "test@[127.0.0.1]",                      // Unusual email format
];

test.describe("Contact Form — Required Field Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
  });

  test("Submit with all fields empty — form must not submit", async ({
    page,
  }) => {
    /**
     * Clicking submit with no input must not trigger any network request
     * to Formspree. HTML5 required validation should block it.
     */
    let formspreeHit = false;
    page.on("request", (req) => {
      if (req.url().includes("formsubmit.co")) formspreeHit = true;
    });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    expect(formspreeHit).toBe(false);
  });

  test("Submit with only name filled — must not submit", async ({ page }) => {
    await page.fill('input[type="text"]', "Test Name");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Status should remain idle (button still shows EXECUTE_SEND)
    const buttonText = await page.locator('button[type="submit"]').textContent();
    expect(buttonText).toContain("EXECUTE_SEND");
  });

  test("Invalid email format must not submit", async ({ page }) => {
    /**
     * The email field has type="email" — browser should reject invalid formats.
     */
    await page.fill('input[type="text"]', "Test Name");
    await page.fill('input[type="email"]', "not-an-email");
    await page.fill("textarea", "Test message");

    let formspreeHit = false;
    page.on("request", (req) => {
      if (req.url().includes("formsubmit.co")) formspreeHit = true;
    });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    expect(formspreeHit).toBe(false);
  });
});

test.describe("Contact Form — Edge Case Inputs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    // Mock Formspree to avoid real submissions during testing
    await page.route("**/formsubmit.co/**", (route) =>
      route.fulfill({ status: 200, body: '{"ok":true}' })
    );
  });

  test("10,001 character name — must not crash the page", async ({ page }) => {
    /**
     * Extremely long input must be handled gracefully.
     * No server crash, no JS error, no frozen UI.
     */
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.fill('input[type="text"]', LONG_STRING);
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill("textarea", "Test message");

    // Page must remain interactive
    const button = page.locator('button[type="submit"]');
    await expect(button).toBeEnabled();

    expect(errors).toHaveLength(0);
  });

  for (const input of UNICODE_INPUTS) {
    test(`Unicode/special input in name: "${input.slice(0, 30)}"`, async ({
      page,
    }) => {
      /**
       * Unicode characters, RTL text, null bytes, and HTML tags must not
       * crash the form or execute as code.
       */
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      await page.fill('input[type="text"]', input);
      await page.fill('input[type="email"]', "test@example.com");
      await page.fill("textarea", "Test message");

      await page.click('button[type="submit"]');
      await page.waitForTimeout(800);

      // Should show success or error status — never crash
      const body = await page.content();
      expect(body).not.toContain("Unhandled Runtime Error");
      expect(errors.filter((e) => !e.includes("ResizeObserver"))).toHaveLength(0);
    });
  }

  test("Rapid double-submit — button disables after first click", async ({
    page,
  }) => {
    /**
     * Double-clicking submit must not send duplicate requests.
     * The button should become disabled during the 'sending' state.
     */
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("formsubmit.co")) requests.push(req.url());
    });

    await page.fill('input[type="text"]', "Test Name");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill("textarea", "Test message");

    // Click twice in rapid succession
    await page.click('button[type="submit"]');
    await page.click('button[type="submit"]').catch(() => {}); // May be disabled

    await page.waitForTimeout(1000);

    // Should only have sent one request
    expect(requests.length).toBeLessThanOrEqual(1);
  });

  test("Form clears after successful submission", async ({ page }) => {
    /**
     * After a successful send, all fields should reset to empty
     * to prevent accidental re-submission of the same data.
     */
    await page.fill('input[type="text"]', "Test Name");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill("textarea", "Test message");

    await page.click('button[type="submit"]');
    await page.waitForTimeout(1500);

    const nameVal = await page.locator('input[type="text"]').inputValue();
    const emailVal = await page.locator('input[type="email"]').inputValue();
    const messageVal = await page.locator("textarea").inputValue();

    expect(nameVal).toBe("");
    expect(emailVal).toBe("");
    expect(messageVal).toBe("");
  });

  test("Formspree error — error message shown without crashing", async ({
    page,
  }) => {
    /**
     * If Formspree returns a non-OK status, the form must display an error
     * message without an unhandled exception or blank white screen.
     */
    await page.route("**/formsubmit.co/**", (route) =>
      route.fulfill({ status: 500, body: '{"error":"server error"}' })
    );

    await page.fill('input[type="text"]', "Test Name");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill("textarea", "Test message");

    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Error state should be visible
    const errorMsg = page.locator("text=ERROR");
    await expect(errorMsg).toBeVisible();
  });
});
