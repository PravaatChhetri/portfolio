import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for PROBOT portfolio security & E2E tests.
 * Run: npx playwright test
 * Report: npx playwright show-report
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    // Never send real credentials in tests
    extraHTTPHeaders: {
      "X-Test-Run": "playwright-security-suite",
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
    },
  ],

  // Start dev server automatically if not running
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
