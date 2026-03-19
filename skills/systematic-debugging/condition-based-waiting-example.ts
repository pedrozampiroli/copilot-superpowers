/**
 * Example: Test that polls for a condition before asserting.
 *
 * Problem this solves: Tests that `sleep(n)` for a fixed time are
 * brittle — too short on slow machines, too slow on fast ones.
 * Instead, poll until the condition is true or a timeout expires.
 */

import { page } from "@playwright/test";

/**
 * Wait until `condition` returns truthy, checking every `interval` ms.
 * Throws if `timeout` ms elapses first.
 */
async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  {
    timeout = 5000,
    interval = 100,
    message = "Condition not met within timeout",
  } = {}
): Promise<void> {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    if (await condition()) return;
    await new Promise((r) => setTimeout(r, interval));
  }

  throw new Error(`${message} (waited ${timeout}ms)`);
}

// ─── Example 1: DOM element appears ─────────────────────────────────────────

// Bad: fixed sleep
await new Promise((r) => setTimeout(r, 2000)); // ❌ fragile
const button = document.querySelector("#submit-btn");

// Good: condition-based wait
await waitForCondition(
  () => document.querySelector("#submit-btn") !== null,
  { message: "Submit button did not appear" }
);
const buttonGood = document.querySelector("#submit-btn")!;

// ─── Example 2: API response cached ─────────────────────────────────────────

let cache: Record<string, unknown> = {};

async function fetchAndCache(key: string): Promise<void> {
  cache[key] = await fetch(`/api/${key}`).then((r) => r.json());
}

// Start async operation
fetchAndCache("user-123");

// Wait for it to complete
await waitForCondition(() => "user-123" in cache, {
  timeout: 3000,
  message: "Cache not populated",
});

console.log(cache["user-123"]);

// ─── Example 3: File written by background process ───────────────────────────

import * as fs from "fs";

// Bad
await new Promise((r) => setTimeout(r, 1000)); // ❌
const contents = fs.readFileSync("/tmp/output.json", "utf8");

// Good
await waitForCondition(() => fs.existsSync("/tmp/output.json"), {
  timeout: 10_000,
  message: "/tmp/output.json not created by background process",
});
const contentsGood = fs.readFileSync("/tmp/output.json", "utf8");

// ─── Example 4: Playwright with built-in waiting ─────────────────────────────

// Playwright has this built in — use it instead of manual polling
await page.waitForSelector("#submit-btn", { timeout: 5000 }); // ✅ prefer this
await page.waitForFunction(() => window.__appReady === true, { timeout: 5000 });
