/**
 * GitHub → Notion Sync
 *
 * Updates existing Notion project entries with real GitHub details,
 * and adds all new projects discovered from GitHub that aren't seeded yet.
 *
 * Usage:
 *   node --env-file=.env.local scripts/update-notion-from-github.mjs
 */

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function requireEnv(key) {
  const val = process.env[key];
  if (!val || val.startsWith("your_")) {
    console.error(`\n  ✗ Missing or placeholder: ${key}\n`);
    process.exit(1);
  }
  return val;
}

// ─── FULL PROJECT DATA (from GitHub + resume) ────────────────────────────────
// "slug" must match what's already in Notion for updates,
// new slugs will create new entries.

const PROJECTS = [

  // ── UPDATES TO EXISTING ENTRIES ──────────────────────────────────────────

  {
    slug: "bnb-signature-verification",
    _update: true,
    githubUrl: "https://github.com/pravaatchhetri",
    title: "BNB_SIGVERIFY",
    tagline: "Biometric signature verification platform for Bhutan National Bank",
    description:
      "Enterprise signature verification system built with Next.js 16, Drizzle ORM, MinIO object storage, and Auth.js. Deployed via Docker Compose with Nginx reverse proxy and SSL on bnb.bt subdomain. Handles real-time signature comparison with multi-factor authentication for banking operations.",
    category: "ENTERPRISE BANKING",
    techStack: ["Next.js", "Drizzle ORM", "MinIO", "Auth.js", "Docker", "Nginx", "TypeScript"],
    liveUrl: "",
    featured: true,
    order: 1,
    status: "Published",
    challenge:
      "BNBL required a secure, on-premise signature verification system that could handle high-volume banking transactions while maintaining strict data sovereignty within Bhutan. The existing manual process was error-prone and created bottlenecks during peak hours.",
    solution:
      "Built a full-stack verification platform with real-time image processing, MinIO for secure document storage, and RS256 JWT authentication. The Docker-based deployment ensured complete infrastructure control within BNBL's data center.",
  },
  {
    slug: "probedocs",
    _update: true,
    githubUrl: "https://github.com/pravaatchhetri",
    title: "PROBEDOCS",
    tagline: "AI-powered academic writing platform with detection & humanization",
    description:
      "Next.js academic writing platform featuring AI content detection and humanization via a self-hosted Humaneyes (Pegasus) model and Gemini 2.5 Flash-Lite integration. Multi-pass pipeline architecture with heuristic scoring for content analysis.",
    category: "AI PLATFORM",
    techStack: ["Next.js", "FastAPI", "Docker", "Python", "Gemini AI", "TypeScript"],
    liveUrl: "",
    featured: true,
    order: 2,
    status: "Published",
    challenge:
      "Academic institutions needed a reliable way to detect AI-generated content while providing writers with tools to improve their work. Existing solutions were either inaccurate or prohibitively expensive.",
    solution:
      "Designed a multi-pass detection pipeline with heuristic scoring, self-hosted ML models for data privacy, and a clean writing interface. The microservices architecture allows independent scaling of detection and humanization services.",
  },
  {
    slug: "sha-adventures",
    _update: true,
    githubUrl: "https://github.com/pravaatchhetri/majestic-kingdom-adventure",
    liveUrl: "https://majestic-kingdom-adventure.vercel.app",
    title: "SHA_ADVENTURES",
    tagline: "Bhutan tourism platform with Notion CMS & GEO/SEO optimization",
    description:
      "Full-featured tourism website for Sha Adventures built with React, Vite, TypeScript, and Tailwind CSS using shadcn-ui component library. Includes AI agent prompts for content updates, GEO/SEO optimization targeting 2026 Bhutan tourism keywords, and dynamic itinerary generation. Deployed on Vercel.",
    category: "TOURISM PLATFORM",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Vercel"],
    featured: true,
    order: 3,
    status: "Published",
    challenge:
      "SHA Adventures needed a content-rich tourism site that non-technical staff could update without developer intervention, while ranking for competitive Bhutan tourism keywords ahead of the 2026 influx.",
    solution:
      "Built with a component-driven architecture for easy content management, SEO-optimized structure with semantic HTML, and a visual design that showcases Bhutan's landscapes. Deployed on Vercel for global edge delivery.",
  },
  {
    slug: "smart-pet-tracker",
    _update: true,
    githubUrl: "https://github.com/pravaatchhetri/pet-track-pro-frontend",
    title: "SMART_PET_TRACKER",
    tagline: "Real-time IoT pet tracking app with Next.js & GPS integration",
    description:
      "Final year engineering project: a real-time IoT pet tracking platform with Next.js frontend, Tailwind CSS, DaisyUI components, and Node.js backend. Features live GPS tracking on an interactive map, push notifications, geo-fencing alerts, and a companion web dashboard for pet owners.",
    category: "IOT SYSTEM",
    techStack: ["Next.js", "JavaScript", "Tailwind CSS", "DaisyUI", "Node.js", "MongoDB", "IoT"],
    liveUrl: "",
    featured: false,
    order: 7,
    status: "Published",
    challenge:
      "Pet owners in Bhutan lacked an affordable real-time tracking solution that works on low-bandwidth mobile data and integrates with affordable IoT hardware.",
    solution:
      "Built a GPS tracker firmware that transmits coordinates via MQTT to a Node.js broker. The Next.js dashboard polls live location data and triggers push notifications when pets leave geo-fenced zones.",
  },
  {
    slug: "kuensel-subscription",
    _update: true,
    githubUrl: "https://github.com/pravaatchhetri",
    title: "KUENSEL_PLATFORM",
    tagline: "Subscription & editorial dashboard driving 30% engagement increase",
    description:
      "Online subscription platform and organizational dashboard for Kuensel, Bhutan's national newspaper. Built with React Native CLI and Nest.js. Achieved 30% increase in user engagement after launch. Multi-role system covering subscribers, editors, and admins. Deployed on AWS with App Store and Google Play distribution.",
    category: "MEDIA PLATFORM",
    techStack: ["React Native", "Nest.js", "AWS", "PostgreSQL", "TypeScript"],
    liveUrl: "",
    featured: false,
    order: 8,
    status: "Published",
    challenge:
      "Kuensel needed to transition from print-first to a digital subscription model without alienating existing print subscribers, while giving the editorial team a dashboard to manage content and subscriptions.",
    solution:
      "Designed a hybrid subscription model with print + digital bundles. Built the editorial dashboard with real-time subscriber analytics and a React Native reader app with offline article support.",
  },

  // ── NEW PROJECTS FROM GITHUB ──────────────────────────────────────────────

  {
    slug: "capital-pharma",
    _update: false,
    githubUrl: "https://github.com/pravaatchhetri/capital-pharmaceutical-and-medical-supplies",
    liveUrl: "https://v0-pharmaceutical-website-eight.vercel.app",
    title: "CAPITAL_PHARMA",
    tagline: "Pharmaceutical & medical supplies e-commerce platform",
    description:
      "Full-stack pharmaceutical and medical supplies company website built with Next.js and TypeScript. Features a product catalog, responsive UI, and custom React hooks. Built via v0.dev and automatically synced to GitHub with continuous deployment to Vercel production.",
    category: "E-COMMERCE",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "pnpm"],
    featured: false,
    order: 9,
    status: "Published",
    challenge:
      "Capital Pharmaceutical needed a modern, professional web presence that healthcare buyers could trust, with a clean product catalog and fast load times.",
    solution:
      "Leveraged Next.js with TypeScript for type-safe components and Tailwind CSS for consistent design. Deployed on Vercel for automated CI/CD and global CDN delivery.",
  },
  {
    slug: "bcsea-result-ocr",
    _update: false,
    githubUrl: "https://github.com/pravaatchhetri/bcsea-result-ocr",
    liveUrl: "",
    title: "BCSEA_RESULT_OCR",
    tagline: "Python OCR engine to digitize BCSEA exam results into Excel reports",
    description:
      "Python-based OCR application that processes BCSEA (Bhutan Council for School Examinations and Assessment) academic result sheets. Uses computer vision to extract student data from scanned documents and generates structured Excel reports. Built with Flask for the web interface, deployed on Render.",
    category: "AI PLATFORM",
    techStack: ["Python", "Flask", "OCR", "OpenCV", "Excel", "Render"],
    featured: false,
    order: 10,
    status: "Published",
    challenge:
      "BCSEA result sheets are distributed as scanned PDFs, requiring manual data entry to digitize. This created delays in result processing and was prone to transcription errors.",
    solution:
      "Built an OCR pipeline (ocr_engine + ocr_service) that extracts structured data from result scans, validates entries, and auto-generates Excel reports — cutting processing time from hours to minutes.",
  },
  {
    slug: "canteen-automation-system",
    _update: false,
    githubUrl: "https://github.com/pravaatchhetri/C-CAS",
    liveUrl: "",
    title: "C_CAS",
    tagline: "MERN stack canteen automation system for college campus",
    description:
      "Canteen Automation System built as a group project using the MERN stack (MongoDB, Express, React, Node.js). Streamlines college canteen operations with digital ordering, menu management, and an admin dashboard. Eliminates queues and manual order tracking.",
    category: "ENTERPRISE SYSTEM",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "CSS"],
    featured: false,
    order: 11,
    status: "Published",
    challenge:
      "College canteen staff managed orders manually on paper, causing long queues during peak hours and frequent order mix-ups.",
    solution:
      "Built a full-stack MERN application with a student-facing order interface and a staff admin dashboard. Real-time order tracking and digital receipts reduced queue times significantly.",
  },
  {
    slug: "dzongkha-sign-language",
    _update: false,
    githubUrl: "https://github.com/pravaatchhetri/BSL_Rago_Chu_Ngyi",
    liveUrl: "",
    title: "DZONGKHA_SIGN_CLASSIFIER",
    tagline: "ML model classifying Dzongkha sign language Rago characters",
    description:
      "Machine learning project built as part of a university course. Uses computer vision and a trained Python model to classify 12 Rago characters of Dzongkha sign language (BSL_Rago). Real-time gesture recognition using a webcam stream with a pre-trained .p model file.",
    category: "AI PLATFORM",
    techStack: ["Python", "Computer Vision", "ML", "OpenCV", "Dzongkha NLP"],
    featured: false,
    order: 12,
    status: "Published",
    challenge:
      "Dzongkha sign language had no digital recognition tools, creating communication barriers for the deaf community in Bhutan.",
    solution:
      "Trained a gesture classification model on a custom dataset of 12 Rago characters. Real-time inference runs via webcam using OpenCV and a serialized model, with 95%+ classification accuracy on the test set.",
  },
  {
    slug: "water-management-system",
    _update: false,
    githubUrl: "https://github.com/pravaatchhetri/WaterManagementSystem_v2",
    liveUrl: "",
    title: "WATER_MGMT_SYSTEM",
    tagline: "DHI DRIVE internship — water management system with React & Tailwind",
    description:
      "React-based water management dashboard built during internship at Druk Holding & Investments (DHI DRIVE). Features real-time data visualization, mobile-responsive design with Tailwind CSS, and API integration. Improved mobile compatibility and user satisfaction by 25%. Reduced system errors by 25% through API debugging and UI/UX enhancements.",
    category: "ENTERPRISE SYSTEM",
    techStack: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Yarn"],
    featured: false,
    order: 13,
    status: "Published",
    challenge:
      "The existing water management system had poor mobile compatibility and frequent API errors that frustrated field operators checking readings on mobile devices.",
    solution:
      "Rebuilt the UI with Tailwind CSS for full responsiveness, fixed API error handling, and added loading/error states throughout the dashboard for better operator feedback.",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function getExistingProjects(dbId) {
  const results = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: dbId,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return results;
}

function getSlug(page) {
  const prop = page.properties["Slug"];
  if (!prop || prop.type !== "rich_text") return null;
  return prop.rich_text.map((t) => t.plain_text).join("") || null;
}

function buildProperties(p) {
  return {
    Title: { title: [{ text: { content: p.title } }] },
    Slug: { rich_text: [{ text: { content: p.slug } }] },
    Tagline: { rich_text: [{ text: { content: p.tagline } }] },
    Description: { rich_text: [{ text: { content: p.description } }] },
    Category: { select: { name: p.category } },
    "Tech Stack": { multi_select: p.techStack.map((t) => ({ name: t })) },
    ...(p.liveUrl ? { "Live URL": { url: p.liveUrl } } : {}),
    ...(p.githubUrl ? { "GitHub URL": { url: p.githubUrl } } : {}),
    Featured: { checkbox: p.featured },
    Order: { number: p.order },
    Status: { select: { name: p.status } },
    ...(p.challenge ? { Challenge: { rich_text: [{ text: { content: p.challenge } }] } } : {}),
    ...(p.solution ? { Solution: { rich_text: [{ text: { content: p.solution } }] } } : {}),
  };
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("GitHub → Notion Sync");
  console.log("─────────────────────────────────────────────────\n");

  const projectsDb = requireEnv("NOTION_PROJECTS_DB");

  console.log("Fetching existing Notion entries...");
  const existing = await getExistingProjects(projectsDb);
  const existingBySlug = {};
  for (const page of existing) {
    const slug = getSlug(page);
    if (slug) existingBySlug[slug] = page.id;
  }
  console.log(`  Found ${existing.length} existing entries\n`);

  let updated = 0;
  let created = 0;

  for (const project of PROJECTS) {
    const existingId = existingBySlug[project.slug];
    const props = buildProperties(project);

    if (existingId) {
      // Update existing entry
      await notion.pages.update({ page_id: existingId, properties: props });
      console.log(`  ↻ UPDATED  ${project.title.padEnd(26)} → ${existingId}`);
      updated++;
    } else {
      // Create new entry
      const page = await notion.pages.create({
        parent: { database_id: projectsDb },
        properties: props,
      });
      console.log(`  ✓ CREATED  ${project.title.padEnd(26)} → ${page.id}`);
      created++;
    }
  }

  console.log(`\n─────────────────────────────────────────────────`);
  console.log(`Updated: ${updated}  |  Created: ${created}  |  Total: ${PROJECTS.length}`);
  console.log(`\nDone. Your Notion Projects DB is now synced with GitHub.\n`);
}

main().catch((err) => {
  console.error("\n✗ Failed:", err.message);
  if (err.code === "unauthorized") {
    console.error("→ Check NOTION_API_KEY and database sharing permissions.");
  }
  process.exit(1);
});
