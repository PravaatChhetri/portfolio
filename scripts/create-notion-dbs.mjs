/**
 * Notion Database Creator
 *
 * Creates the Projects, Blog, and Experience databases under a parent Notion page,
 * then writes the database IDs back into .env.local automatically.
 *
 * Usage:
 *   node --env-file=.env.local scripts/create-notion-dbs.mjs
 *
 * Prerequisites:
 *   1. Set NOTION_API_KEY in .env.local
 *   2. Set NOTION_PARENT_PAGE_ID in .env.local
 *      → Open a Notion page, share it with your integration, copy the ID from the URL
 *        e.g. notion.so/My-Page-abc123def456  →  NOTION_PARENT_PAGE_ID=abc123def456
 */

import { Client } from "@notionhq/client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ─── SETUP ───────────────────────────────────────────────────────────────────

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const ENV_PATH = resolve(process.cwd(), ".env.local");

function requireEnv(key) {
  const val = process.env[key];
  if (!val || val.startsWith("your_")) {
    console.error(`\n  ✗ Missing or placeholder: ${key}`);
    console.error(`    Set a real value in .env.local\n`);
    process.exit(1);
  }
  return val;
}

function updateEnvFile(updates) {
  let content = readFileSync(ENV_PATH, "utf8");
  for (const [key, value] of Object.entries(updates)) {
    // Replace the value of an existing key regardless of what it was
    content = content.replace(
      new RegExp(`^(${key}=).*$`, "m"),
      `$1${value}`
    );
  }
  writeFileSync(ENV_PATH, content);
}

// ─── DB SCHEMAS ──────────────────────────────────────────────────────────────

async function createProjectsDB(parentPageId) {
  const db = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Projects" } }],
    properties: {
      Title: { title: {} },
      Slug: { rich_text: {} },
      Tagline: { rich_text: {} },
      Description: { rich_text: {} },
      Category: {
        select: {
          options: [
            { name: "ENTERPRISE BANKING", color: "blue" },
            { name: "AI PLATFORM", color: "purple" },
            { name: "TOURISM PLATFORM", color: "green" },
            { name: "FINTECH API", color: "orange" },
            { name: "ENTERPRISE SYSTEM", color: "gray" },
            { name: "BROWSER EXTENSION", color: "yellow" },
          ],
        },
      },
      "Tech Stack": { multi_select: { options: [] } },
      Cover: { files: {} },
      "Live URL": { url: {} },
      "GitHub URL": { url: {} },
      Featured: { checkbox: {} },
      Order: { number: { format: "number" } },
      Status: {
        select: {
          options: [
            { name: "Published", color: "green" },
            { name: "Draft", color: "yellow" },
            { name: "Archived", color: "gray" },
          ],
        },
      },
      Challenge: { rich_text: {} },
      Solution: { rich_text: {} },
    },
  });
  return db.id;
}

async function createBlogDB(parentPageId) {
  const db = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Blog" } }],
    properties: {
      Title: { title: {} },
      Slug: { rich_text: {} },
      Excerpt: { rich_text: {} },
      Tags: { multi_select: { options: [] } },
      Published: { date: {} },
      Status: {
        select: {
          options: [
            { name: "Published", color: "green" },
            { name: "Draft", color: "yellow" },
          ],
        },
      },
      Priority: {
        select: {
          options: [
            { name: "URGENT", color: "red" },
            { name: "STABLE", color: "green" },
            { name: "DRAFT", color: "gray" },
          ],
        },
      },
      "Read Time": { rich_text: {} },
      Cover: { files: {} },
      "Has Code": { checkbox: {} },
    },
  });
  return db.id;
}

async function createExperienceDB(parentPageId) {
  const db = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Experience" } }],
    properties: {
      Role: { title: {} },
      Company: { rich_text: {} },
      Period: { rich_text: {} },
      Description: { rich_text: {} },
      "Tech Stack": { multi_select: { options: [] } },
      Order: { number: { format: "number" } },
    },
  });
  return db.id;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Notion DB Creator");
  console.log("─────────────────────────────────────────────────\n");

  const apiKey = requireEnv("NOTION_API_KEY");
  const parentPageId = requireEnv("NOTION_PARENT_PAGE_ID");

  // Validate the API key works
  try {
    await notion.users.me();
  } catch {
    console.error("  ✗ Could not authenticate. Check your NOTION_API_KEY.\n");
    process.exit(1);
  }

  console.log("Creating databases under parent page...\n");

  try {
    process.stdout.write("  Creating Projects DB... ");
    const projectsId = await createProjectsDB(parentPageId);
    console.log(`✓ ${projectsId}`);

    process.stdout.write("  Creating Blog DB...     ");
    const blogId = await createBlogDB(parentPageId);
    console.log(`✓ ${blogId}`);

    process.stdout.write("  Creating Experience DB... ");
    const experienceId = await createExperienceDB(parentPageId);
    console.log(`✓ ${experienceId}`);

    console.log("\nWriting IDs to .env.local...");
    updateEnvFile({
      NOTION_PROJECTS_DB: projectsId,
      NOTION_BLOG_DB: blogId,
      NOTION_EXPERIENCE_DB: experienceId,
    });
    console.log("  ✓ .env.local updated\n");

    console.log("─────────────────────────────────────────────────");
    console.log("Done. Your databases are ready.\n");
    console.log("Next step — seed them with data:");
    console.log("  node --env-file=.env.local scripts/seed-notion.mjs\n");
  } catch (err) {
    console.error("\n✗ Failed:", err.message);
    if (err.code === "object_not_found" || err.status === 404) {
      console.error(
        "\n→ Parent page not found. Make sure:\n" +
        "  1. NOTION_PARENT_PAGE_ID is correct\n" +
        "  2. The page is shared with your integration\n" +
        "     (Open page in Notion → ... → Connections → add your integration)\n"
      );
    }
    process.exit(1);
  }
}

main();
