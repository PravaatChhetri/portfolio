// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Playwright configuration for PROBOT portfolio security & E2E tests.
 * Run: npx playwright test
 * Report: npx playwright show-report
 */
module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
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

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
