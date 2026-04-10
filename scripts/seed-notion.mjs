/**
 * Notion Database Seeder
 *
 * Seeds Projects, Blog, and Experience databases with data from resume.
 * Prints the Notion page IDs after creation so you can reference them.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-notion.mjs
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

// ─── SEED DATA ───────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "BNB_SIGVERIFY",
    slug: "bnb-signature-verification",
    tagline: "Biometric signature verification platform for Bhutan National Bank",
    description:
      "Enterprise signature verification system built with Next.js 16, Drizzle ORM, MinIO object storage, and Auth.js. Deployed via Docker Compose with Nginx reverse proxy and SSL on bnb.bt subdomain. Handles real-time signature comparison with multi-factor authentication for banking operations.",
    category: "ENTERPRISE BANKING",
    techStack: ["Next.js", "Drizzle ORM", "MinIO", "Auth.js", "Docker", "Nginx"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    order: 1,
    status: "Published",
    challenge:
      "BNBL required a secure, on-premise signature verification system that could handle high-volume banking transactions while maintaining strict data sovereignty within Bhutan. The existing manual process was error-prone and created bottlenecks during peak hours.",
    solution:
      "Built a full-stack verification platform with real-time image processing, MinIO for secure document storage, and RS256 JWT authentication. The Docker-based deployment ensured complete infrastructure control within BNBL's data center.",
  },
  {
    title: "PROBEDOCS",
    slug: "probedocs",
    tagline: "AI-powered academic writing platform with detection & humanization",
    description:
      "Next.js academic writing platform featuring AI content detection and humanization via a self-hosted Humaneyes (Pegasus) model and Gemini 2.5 Flash-Lite integration. Multi-pass pipeline architecture with heuristic scoring for content analysis.",
    category: "AI PLATFORM",
    techStack: ["Next.js", "FastAPI", "Docker", "Pegasus", "Gemini AI"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    order: 2,
    status: "Published",
    challenge:
      "Academic institutions needed a reliable way to detect AI-generated content while providing writers with tools to improve their work. Existing solutions were either inaccurate or prohibitively expensive.",
    solution:
      "Designed a multi-pass detection pipeline with heuristic scoring, self-hosted ML models for data privacy, and a clean writing interface. The microservices architecture allows independent scaling of detection and humanization services.",
  },
  {
    title: "SHA_ADVENTURES",
    slug: "sha-adventures",
    tagline: "Bhutan tourism platform with Notion CMS & GEO/SEO optimization",
    description:
      "Full-featured tourism website for Sha Adventures (shaadventure.com) built with Next.js and Notion as a headless CMS. Includes AI agent prompts for content updates, GEO/SEO optimization targeting 2026 tourism keywords, and dynamic itinerary generation.",
    category: "TOURISM PLATFORM",
    techStack: ["Next.js", "Notion CMS", "Tailwind", "Vercel", "SEO"],
    liveUrl: "https://shaadventure.com",
    githubUrl: "",
    featured: true,
    order: 3,
    status: "Published",
    challenge:
      "SHA Adventures needed a content-rich tourism site that non-technical staff could update without developer intervention, while ranking for competitive Bhutan tourism keywords ahead of the 2026 influx.",
    solution:
      "Used Notion as the CMS so the team can manage all itineraries and blog posts directly. Built a custom AI agent prompt workflow to keep SEO-optimized content fresh. ISR caching ensures fast loads with live Notion data.",
  },
  {
    title: "BNB_CONNECT",
    slug: "bnb-connect",
    tagline: "Bulk transaction API with FLEXCUBE integration & Redis caching",
    description:
      "Enterprise API layer bridging Oracle FLEXCUBE core banking with modern microservices. Features bulk transaction processing, Redis caching for account validation, RS256 JWT authentication, and full Docker containerization.",
    category: "FINTECH API",
    techStack: ["Node.js", "Redis", "Oracle", "Docker", "JWT"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 4,
    status: "Published",
    challenge:
      "BNBL's legacy FLEXCUBE core banking system needed a modern API bridge to support bulk transactions and real-time account validation without modifying the core banking infrastructure.",
    solution:
      "Built a stateless API middleware with Redis caching for account lookups, RS256 JWT for service-to-service auth, and idempotency keys to prevent double-processing on retries.",
  },
  {
    title: "E_PROCUREMENT",
    slug: "bnb-e-procurement",
    tagline: "Digital procurement portal for BNBL vendor management",
    description:
      "Full-stack procurement system handling vendor registration, bid management, and approval workflows. Deployed on bnb.bt with Nginx reverse proxy, SSL termination, and role-based access control.",
    category: "ENTERPRISE SYSTEM",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Docker", "Nginx"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 5,
    status: "Published",
    challenge:
      "BNBL's manual procurement process was slow, paper-heavy, and difficult to audit. Vendors had no self-service portal and approvals required physical sign-offs.",
    solution:
      "Delivered a multi-role portal with vendor self-registration, digital bid submission, and a structured approval chain. All actions are timestamped and stored for compliance auditing.",
  },
  {
    title: "AURA_FILL",
    slug: "aurafill",
    tagline: "AI-powered Chrome extension for intelligent form filling",
    description:
      "Chrome extension with multi-profile support, AES-GCM encryption, and confidence-level review modals. Uses AI to intelligently map user data to form fields with privacy-first architecture.",
    category: "BROWSER EXTENSION",
    techStack: ["Chrome APIs", "TypeScript", "AES-GCM", "AI"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 6,
    status: "Published",
    challenge:
      "Existing autofill tools store data in plaintext and blindly fill fields without context awareness, leading to data leaks and incorrect submissions.",
    solution:
      "Built a privacy-first extension that encrypts all profiles with AES-GCM, uses AI field-mapping to match intent not just field names, and shows a confidence review modal before submitting.",
  },
  {
    title: "SMART_PET_TRACKER",
    slug: "smart-pet-tracker",
    tagline: "Real-time IoT pet tracking app with React Native & MongoDB",
    description:
      "Built a real-time IoT pet tracking app using React Native, Next.js, MongoDB and Node.js. Features live GPS tracking on a map, push notifications, and a companion web dashboard.",
    category: "IOT SYSTEM",
    techStack: ["React Native", "Next.js", "MongoDB", "Node.js", "IoT"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 7,
    status: "Published",
    challenge: "",
    solution: "",
  },
  {
    title: "KUENSEL_PLATFORM",
    slug: "kuensel-subscription",
    tagline: "Subscription & dashboard platform driving 30% engagement increase",
    description:
      "Online subscription platform and organizational dashboard for Kuensel, Bhutan's national newspaper. Built with React Native CLI and Nest.js. Achieved 30% increase in user engagement after launch. Deployed on AWS with App Store and Google Play distribution.",
    category: "MEDIA PLATFORM",
    techStack: ["React Native", "Nest.js", "AWS", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 8,
    status: "Published",
    challenge:
      "Kuensel needed to transition from print-first to a digital subscription model without alienating existing print subscribers, while giving the editorial team a dashboard to manage content and subscriptions.",
    solution:
      "Designed a hybrid subscription model with print + digital bundles. Built the editorial dashboard with real-time subscriber analytics and a React Native reader app with offline article support.",
  },
];

const BLOG_POSTS = [
  {
    title: "DOCKER NETWORKING LESSONS FROM BNBL DEPLOYMENTS",
    slug: "docker-networking-bnbl",
    excerpt:
      "Hard-won debugging insights from deploying Next.js, MinIO, and Nginx on BNBL infrastructure. Container DNS resolution, bridge networks, and the SSL termination patterns that actually work.",
    tags: ["DOCKER", "DEVOPS", "ENTERPRISE"],
    publishedAt: "2025-06-15",
    status: "Published",
    priority: "STABLE",
    readTime: "8M",
    hasCode: true,
  },
  {
    title: "BUILDING A HEADLESS CMS WITH NOTION API",
    slug: "notion-cms-architecture",
    excerpt:
      "How I architected Sha Adventures' content layer using Notion databases as a CMS. API caching strategies, ISR patterns, and the AI agent that keeps content fresh.",
    tags: ["ARCHITECTURE", "NOTION", "NEXT.JS"],
    publishedAt: "2025-05-20",
    status: "Published",
    priority: "STABLE",
    readTime: "12M",
    hasCode: true,
  },
  {
    title: "DESIGNING AN AI CONTENT DETECTION PIPELINE",
    slug: "ai-detection-pipeline",
    excerpt:
      "From single-pass to multi-pass: evolving ProBeDocs' detection architecture. Heuristic scoring, self-hosted Pegasus models, and why Gemini 2.5 Flash-Lite changed everything.",
    tags: ["AI", "ML_PIPELINE", "ARCHITECTURE"],
    publishedAt: "2025-04-10",
    status: "Published",
    priority: "URGENT",
    readTime: "15M",
    hasCode: true,
  },
  {
    title: "ORACLE FLEXCUBE INTEGRATION PATTERNS",
    slug: "flexcube-integration-patterns",
    excerpt:
      "Bridging Oracle FLEXCUBE with modern Node.js microservices. Connection pooling, idempotency keys, and the Redis caching layer that cut account validation latency by 80%.",
    tags: ["FINTECH", "ORACLE", "NODE.JS"],
    publishedAt: "2025-03-05",
    status: "Published",
    priority: "STABLE",
    readTime: "10M",
    hasCode: true,
  },
  {
    title: "BHUTAN SAFE APP: GPS TRACKING ON A BUDGET",
    slug: "bhutan-safe-app",
    excerpt:
      "Building a safety app for women and children in Bhutan — GPS tracking, emergency alerts, and offline fallbacks on constrained mobile data. React Native architecture decisions.",
    tags: ["REACT NATIVE", "IOT", "MOBILE"],
    publishedAt: "2025-01-18",
    status: "Published",
    priority: "STABLE",
    readTime: "9M",
    hasCode: false,
  },
  {
    title: "BERT SPAM DETECTION: 95% ACCURACY AT TIJ-TECH",
    slug: "bert-spam-detection",
    excerpt:
      "How I fine-tuned BERT for ham vs spam classification handling 500+ emails per day. Dataset curation, tokenization tricks, and the Django integration that made it production-ready.",
    tags: ["AI", "PYTHON", "ML_PIPELINE"],
    publishedAt: "2024-12-01",
    status: "Published",
    priority: "STABLE",
    readTime: "11M",
    hasCode: true,
  },
];

const EXPERIENCE = [
  {
    role: "IT OFFICER",
    company: "BHUTAN NATIONAL BANK LIMITED",
    period: "JUL 2025 — PRESENT",
    description:
      "Digital Technology Department. Engineering enterprise banking systems including signature verification, e-procurement, and bulk transaction APIs. Managing Docker-based deployments on bnb.bt infrastructure with Oracle FLEXCUBE integration.",
    techStack: ["Next.js", "Docker", "Oracle", "Redis", "PostgreSQL", "Nginx"],
    order: 1,
  },
  {
    role: "TECH LEAD & CO-FOUNDER",
    company: "NABA TECH",
    period: "NOV 2024 — PRESENT",
    description:
      "Led development and successful launch of digital products, increasing user engagement by 30% and aligning with strategic goals. Developed and implemented best practices for workflows and system integration, boosting team efficiency by 30%.",
    techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL"],
    order: 2,
  },
  {
    role: "SOFTWARE ENGINEER",
    company: "ROMTECH — HIS MAJESTY'S SECRETARIAT",
    period: "JUL 2024 — JUN 2025",
    description:
      "Built and launched Kuensel's subscription platform driving 30% user engagement increase. Engineered biometric scanner driver in .NET for secure identity verification for the Department of Immigration. Deployed and maintained apps on AWS, App Store, and Google Play.",
    techStack: ["React Native", "Nest.js", ".NET", "AWS", "PostgreSQL"],
    order: 3,
  },
  {
    role: "FULL STACK DEVELOPER INTERN",
    company: "DRUK HOLDING & INVESTMENTS LIMITED",
    period: "DEC 2023 — MAR 2024",
    description:
      "Enhanced a water management system improving mobile compatibility and user satisfaction by 25%. Executed API debugging and implemented UI/UX enhancements, reducing system errors by 25%.",
    techStack: ["React.js", "Tailwind CSS", "React Native", "REST APIs"],
    order: 4,
  },
  {
    role: "FULL STACK DEVELOPER INTERN",
    company: "DRUK HOLDING & INVESTMENTS LIMITED",
    period: "DEC 2022 — FEB 2023",
    description:
      "Transformed the UI of a water management system, boosting user satisfaction by 30% through React.js and Tailwind CSS. Spearheaded development of a React Native app for smart agriculture, enhancing farmer productivity by 30% in the pilot phase.",
    techStack: ["React.js", "Tailwind CSS", "React Native", "Django"],
    order: 5,
  },
  {
    role: "FULL STACK DEVELOPER (REMOTE)",
    company: "BAKALAURS, CHENNAI, INDIA",
    period: "DEC 2023 — FEB 2024",
    description:
      "Designed and deployed an e-commerce platform, achieving a 20% reduction in page load times. Delivered a UK tourism guide website with interactive UI/UX elements, increasing user retention by 10%.",
    techStack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    order: 6,
  },
  {
    role: "SOFTWARE DEVELOPER INTERN",
    company: "TOKYO INSTITUTE OF JAPAN TECH (TIJ-TECH)",
    period: "JUN 2022 — JUL 2022",
    description:
      "Created a Django user management system automating email processes for 500+ daily emails, increasing efficiency by 30%. Developed a BERT-based application achieving 95% accuracy in ham vs spam detection.",
    techStack: ["Django", "Python", "BERT", "ML", "PostgreSQL"],
    order: 7,
  },
];

// ─── SEEDERS ─────────────────────────────────────────────────────────────────

async function seedProjects(dbId) {
  console.log("\n── PROJECTS ──────────────────────────────────────");
  const ids = {};

  for (const p of PROJECTS) {
    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
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
      },
    });

    ids[p.slug] = page.id;
    console.log(`  ✓ ${p.title.padEnd(22)} → ${page.id}`);
  }

  return ids;
}

async function seedBlogPosts(dbId) {
  console.log("\n── BLOG POSTS ────────────────────────────────────");
  const ids = {};

  for (const post of BLOG_POSTS) {
    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Title: { title: [{ text: { content: post.title } }] },
        Slug: { rich_text: [{ text: { content: post.slug } }] },
        Excerpt: { rich_text: [{ text: { content: post.excerpt } }] },
        Tags: { multi_select: post.tags.map((t) => ({ name: t })) },
        Published: { date: { start: post.publishedAt } },
        Status: { select: { name: post.status } },
        Priority: { select: { name: post.priority } },
        "Read Time": { rich_text: [{ text: { content: post.readTime } }] },
        "Has Code": { checkbox: post.hasCode },
      },
    });

    ids[post.slug] = page.id;
    console.log(`  ✓ ${post.slug.padEnd(32)} → ${page.id}`);
  }

  return ids;
}

async function seedExperience(dbId) {
  console.log("\n── EXPERIENCE ────────────────────────────────────");
  const ids = {};

  for (const exp of EXPERIENCE) {
    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Role: { title: [{ text: { content: exp.role } }] },
        Company: { rich_text: [{ text: { content: exp.company } }] },
        Period: { rich_text: [{ text: { content: exp.period } }] },
        Description: { rich_text: [{ text: { content: exp.description } }] },
        "Tech Stack": { multi_select: exp.techStack.map((t) => ({ name: t })) },
        Order: { number: exp.order },
      },
    });

    const key = `${exp.order}-${exp.role.toLowerCase().replace(/\s+/g, "-")}`;
    ids[key] = page.id;
    console.log(`  ✓ ${exp.role.padEnd(32)} → ${page.id}`);
  }

  return ids;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Notion Seeder — Pravaat Chhetri Portfolio");
  console.log("─────────────────────────────────────────────────");

  if (!process.env.NOTION_API_KEY) {
    console.error("NOTION_API_KEY is not set. Run with: node --env-file=.env.local scripts/seed-notion.mjs");
    process.exit(1);
  }

  const projectsDb = requireEnv("NOTION_PROJECTS_DB");
  const blogDb = requireEnv("NOTION_BLOG_DB");
  const experienceDb = requireEnv("NOTION_EXPERIENCE_DB");

  try {
    const projectIds = await seedProjects(projectsDb);
    const blogIds = await seedBlogPosts(blogDb);
    const experienceIds = await seedExperience(experienceDb);

    console.log("\n─────────────────────────────────────────────────");
    console.log("All IDs:\n");
    console.log("PROJECTS:");
    for (const [slug, id] of Object.entries(projectIds)) {
      console.log(`  ${slug}: ${id}`);
    }
    console.log("\nBLOG POSTS:");
    for (const [slug, id] of Object.entries(blogIds)) {
      console.log(`  ${slug}: ${id}`);
    }
    console.log("\nEXPERIENCE:");
    for (const [key, id] of Object.entries(experienceIds)) {
      console.log(`  ${key}: ${id}`);
    }
    console.log("\nDone. Run `npm run dev` to see the live data.\n");
  } catch (err) {
    console.error("\n✗ Seed failed:", err.message);
    if (err.code === "unauthorized") {
      console.error("→ Check your NOTION_API_KEY is valid and the integration has access to the databases.");
    } else if (err.code === "object_not_found") {
      console.error("→ Database not found. Make sure each database is shared with your integration.");
    }
    process.exit(1);
  }
}

main();
