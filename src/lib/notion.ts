import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ─── CLIENT ───
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ─── TYPES ───
export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  techStack: string[];
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  specs: Record<string, string>;
  // Case study fields
  challenge?: string;
  solution?: string;
  metrics?: { label: string; value: string; unit: string; description: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  status: "URGENT" | "STABLE" | "DRAFT";
  readTime: string;
  coverImage?: string;
  hasCodeSnippet: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
  order: number;
}

// ─── HELPERS ───
function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

function extractProperty(page: PageObjectResponse, key: string): any {
  const prop = page.properties[key];
  if (!prop) return null;

  switch (prop.type) {
    case "title":
      return extractPlainText(prop.title);
    case "rich_text":
      return extractPlainText(prop.rich_text);
    case "number":
      return prop.number;
    case "select":
      return prop.select?.name || "";
    case "multi_select":
      return prop.multi_select.map((s) => s.name);
    case "checkbox":
      return prop.checkbox;
    case "url":
      return prop.url || "";
    case "date":
      return prop.date?.start || "";
    case "files":
      if (prop.files.length > 0) {
        const file = prop.files[0];
        if (file.type === "file") return file.file.url;
        if (file.type === "external") return file.external.url;
      }
      return "";
    default:
      return null;
  }
}

// ─── FETCH PROJECTS ───
export async function getProjects(): Promise<Project[]> {
  const dbId = process.env.NOTION_PROJECTS_DB;
  if (!dbId) return getFallbackProjects();

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const p = page as PageObjectResponse;
      return {
        id: p.id,
        slug: extractProperty(p, "Slug") || p.id,
        title: extractProperty(p, "Title") || "Untitled",
        tagline: extractProperty(p, "Tagline") || "",
        description: extractProperty(p, "Description") || "",
        category: extractProperty(p, "Category") || "",
        techStack: extractProperty(p, "Tech Stack") || [],
        coverImage: extractProperty(p, "Cover") || "",
        liveUrl: extractProperty(p, "Live URL") || "",
        githubUrl: extractProperty(p, "GitHub URL") || "",
        featured: extractProperty(p, "Featured") || false,
        order: extractProperty(p, "Order") || 0,
        specs: {},
        challenge: extractProperty(p, "Challenge") || "",
        solution: extractProperty(p, "Solution") || "",
      };
    });
  } catch (error) {
    console.error("Notion projects fetch failed:", error);
    return getFallbackProjects();
  }
}

// ─── FETCH SINGLE PROJECT ───
export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const dbId = process.env.NOTION_PROJECTS_DB;
  if (!dbId) return getFallbackProjects().find((p) => p.slug === slug) || null;

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    if (response.results.length === 0) return null;

    const p = response.results[0] as PageObjectResponse;
    return {
      id: p.id,
      slug: extractProperty(p, "Slug") || p.id,
      title: extractProperty(p, "Title") || "Untitled",
      tagline: extractProperty(p, "Tagline") || "",
      description: extractProperty(p, "Description") || "",
      category: extractProperty(p, "Category") || "",
      techStack: extractProperty(p, "Tech Stack") || [],
      coverImage: extractProperty(p, "Cover") || "",
      liveUrl: extractProperty(p, "Live URL") || "",
      githubUrl: extractProperty(p, "GitHub URL") || "",
      featured: extractProperty(p, "Featured") || false,
      order: extractProperty(p, "Order") || 0,
      specs: {},
      challenge: extractProperty(p, "Challenge") || "",
      solution: extractProperty(p, "Solution") || "",
    };
  } catch (error) {
    console.error("Notion project fetch failed:", error);
    return getFallbackProjects().find((p) => p.slug === slug) || null;
  }
}

// ─── FETCH BLOG POSTS ───
export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB;
  if (!dbId) return getFallbackBlogPosts();

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: "Status",
        select: { does_not_equal: "Draft" },
      },
      sorts: [{ property: "Published", direction: "descending" }],
    });

    return response.results.map((page) => {
      const p = page as PageObjectResponse;
      return {
        id: p.id,
        slug: extractProperty(p, "Slug") || p.id,
        title: extractProperty(p, "Title") || "Untitled",
        excerpt: extractProperty(p, "Excerpt") || "",
        tags: extractProperty(p, "Tags") || [],
        publishedAt: extractProperty(p, "Published") || "",
        status: extractProperty(p, "Priority") || "STABLE",
        readTime: extractProperty(p, "Read Time") || "5M",
        coverImage: extractProperty(p, "Cover") || "",
        hasCodeSnippet: extractProperty(p, "Has Code") || false,
      };
    });
  } catch (error) {
    console.error("Notion blog fetch failed:", error);
    return getFallbackBlogPosts();
  }
}

// ─── FETCH PAGE BLOCKS (for blog post content) ───
export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  try {
    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: cursor,
      });

      blocks.push(...(response.results as BlockObjectResponse[]));
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error("Notion blocks fetch failed:", error);
    return [];
  }
}

// ─── FETCH EXPERIENCE ───
export async function getExperience(): Promise<Experience[]> {
  const dbId = process.env.NOTION_EXPERIENCE_DB;
  if (!dbId) return getFallbackExperience();

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const p = page as PageObjectResponse;
      return {
        id: p.id,
        role: extractProperty(p, "Role") || "",
        company: extractProperty(p, "Company") || "",
        period: extractProperty(p, "Period") || "",
        description: extractProperty(p, "Description") || "",
        techStack: extractProperty(p, "Tech Stack") || [],
        order: extractProperty(p, "Order") || 0,
      };
    });
  } catch (error) {
    console.error("Notion experience fetch failed:", error);
    return getFallbackExperience();
  }
}

// ─── FALLBACK DATA (when Notion is not configured) ───
function getFallbackProjects(): Project[] {
  return [
    {
      id: "1",
      slug: "bnb-signature-verification",
      title: "BNB_SIGVERIFY",
      tagline: "Biometric signature verification platform for Bhutan National Bank",
      description:
        "Enterprise signature verification system built with Next.js 16, Drizzle ORM, MinIO object storage, and Auth.js. Deployed via Docker Compose with Nginx reverse proxy and SSL on bnb.bt subdomain. Handles real-time signature comparison with multi-factor authentication for banking operations.",
      category: "ENTERPRISE BANKING",
      techStack: ["Next.js", "Drizzle ORM", "MinIO", "Auth.js", "Docker", "Nginx"],
      coverImage: "",
      liveUrl: "",
      githubUrl: "",
      featured: true,
      order: 1,
      specs: {
        STACK: "NEXT.JS_16",
        STORAGE: "MINIO_S3",
        AUTH: "AUTH.JS_V5",
        DEPLOY: "DOCKER_COMPOSE",
      },
      challenge:
        "BNBL required a secure, on-premise signature verification system that could handle high-volume banking transactions while maintaining strict data sovereignty within Bhutan. The existing manual process was error-prone and created bottlenecks during peak hours.",
      solution:
        "Built a full-stack verification platform with real-time image processing, MinIO for secure document storage, and RS256 JWT authentication. The Docker-based deployment ensured complete infrastructure control within BNBL's data center.",
      metrics: [
        { label: "VERIFICATION_SPEED", value: "2.1", unit: "SEC", description: "Average signature verification time" },
        { label: "ACCURACY", value: "99.7", unit: "%", description: "Verification accuracy rate" },
        { label: "DAILY_OPS", value: "1.2K", unit: "TXN", description: "Daily transaction throughput" },
      ],
    },
    {
      id: "2",
      slug: "probedocs",
      title: "PROBEDOCS",
      tagline: "AI-powered academic writing platform with detection & humanization",
      description:
        "Next.js academic writing platform featuring AI content detection and humanization via a self-hosted Humaneyes (Pegasus) model and Gemini 2.5 Flash-Lite integration. Multi-pass pipeline architecture with heuristic scoring for content analysis.",
      category: "AI PLATFORM",
      techStack: ["Next.js", "FastAPI", "Docker", "Pegasus", "Gemini AI"],
      coverImage: "",
      featured: true,
      order: 2,
      specs: {
        ENGINE: "PEGASUS_ML",
        API: "FASTAPI",
        AI: "GEMINI_2.5",
        ARCH: "MICROSERVICES",
      },
      challenge:
        "Academic institutions needed a reliable way to detect AI-generated content while providing writers with tools to improve their work. Existing solutions were either inaccurate or prohibitively expensive.",
      solution:
        "Designed a multi-pass detection pipeline with heuristic scoring, self-hosted ML models for data privacy, and a clean writing interface. The microservices architecture allows independent scaling of detection and humanization services.",
      metrics: [
        { label: "DETECTION_RATE", value: "96.4", unit: "%", description: "AI content detection accuracy" },
        { label: "LATENCY", value: "1.8", unit: "SEC", description: "Average analysis response time" },
        { label: "MODELS", value: "3", unit: "ACTIVE", description: "Concurrent ML models in pipeline" },
      ],
    },
    {
      id: "3",
      slug: "sha-adventures",
      title: "SHA_ADVENTURES",
      tagline: "Bhutan tourism platform with Notion CMS & GEO/SEO optimization",
      description:
        "Full-featured tourism website for Sha Adventures (shaadventure.com) built with Next.js and Notion as a headless CMS. Includes AI agent prompts for content updates, GEO/SEO optimization targeting 2026 tourism keywords, and dynamic itinerary generation.",
      category: "TOURISM PLATFORM",
      techStack: ["Next.js", "Notion CMS", "Tailwind", "Vercel", "SEO"],
      coverImage: "",
      featured: true,
      order: 3,
      specs: {
        CMS: "NOTION_API",
        DEPLOY: "VERCEL_EDGE",
        SEO: "GEO_OPTIMIZED",
        AI: "CONTENT_AGENT",
      },
    },
    {
      id: "4",
      slug: "bnb-connect",
      title: "BNB_CONNECT",
      tagline: "Bulk transaction API with FLEXCUBE integration & Redis caching",
      description:
        "Enterprise API layer bridging Oracle FLEXCUBE core banking with modern microservices. Features bulk transaction processing, Redis caching for account validation, RS256 JWT authentication, and full Docker containerization.",
      category: "FINTECH API",
      techStack: ["Node.js", "Redis", "Oracle", "Docker", "JWT"],
      coverImage: "",
      featured: false,
      order: 4,
      specs: {
        CORE: "FLEXCUBE",
        CACHE: "REDIS_CLUSTER",
        AUTH: "RS256_JWT",
        DEPLOY: "DOCKER",
      },
    },
    {
      id: "5",
      slug: "bnb-e-procurement",
      title: "E_PROCUREMENT",
      tagline: "Digital procurement portal for BNBL vendor management",
      description:
        "Full-stack procurement system handling vendor registration, bid management, and approval workflows. Deployed on bnb.bt with Nginx reverse proxy, SSL termination, and role-based access control.",
      category: "ENTERPRISE SYSTEM",
      techStack: ["Next.js", "PostgreSQL", "Prisma", "Docker", "Nginx"],
      coverImage: "",
      featured: false,
      order: 5,
      specs: {
        ORM: "PRISMA",
        DB: "POSTGRESQL",
        PROXY: "NGINX_SSL",
        RBAC: "CUSTOM",
      },
    },
    {
      id: "6",
      slug: "aurafill",
      title: "AURA_FILL",
      tagline: "AI-powered Chrome extension for intelligent form filling",
      description:
        "Chrome extension with multi-profile support, AES-GCM encryption, and confidence-level review modals. Uses AI to intelligently map user data to form fields with privacy-first architecture.",
      category: "BROWSER EXTENSION",
      techStack: ["Chrome APIs", "TypeScript", "AES-GCM", "AI"],
      coverImage: "",
      featured: false,
      order: 6,
      specs: {
        PLATFORM: "CHROME_V3",
        CRYPTO: "AES-GCM",
        AI: "FIELD_MAPPING",
        PROFILES: "MULTI",
      },
    },
  ];
}

function getFallbackBlogPosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "docker-networking-bnbl",
      title: "DOCKER NETWORKING LESSONS FROM BNBL DEPLOYMENTS",
      excerpt:
        "Hard-won debugging insights from deploying Next.js, MinIO, and Nginx on BNBL infrastructure. Container DNS resolution, bridge networks, and the SSL termination patterns that actually work.",
      tags: ["DOCKER", "DEVOPS", "ENTERPRISE"],
      publishedAt: "2025-06-15",
      status: "STABLE",
      readTime: "8M",
      hasCodeSnippet: true,
    },
    {
      id: "2",
      slug: "notion-cms-architecture",
      title: "BUILDING A HEADLESS CMS WITH NOTION API",
      excerpt:
        "How I architected Sha Adventures' content layer using Notion databases as a CMS. API caching strategies, ISR patterns, and the AI agent that keeps content fresh.",
      tags: ["ARCHITECTURE", "NOTION", "NEXT.JS"],
      publishedAt: "2025-05-20",
      status: "STABLE",
      readTime: "12M",
      hasCodeSnippet: true,
    },
    {
      id: "3",
      slug: "ai-detection-pipeline",
      title: "DESIGNING AN AI CONTENT DETECTION PIPELINE",
      excerpt:
        "From single-pass to multi-pass: evolving ProBeDocs' detection architecture. Heuristic scoring, self-hosted Pegasus models, and why Gemini 2.5 Flash-Lite changed everything.",
      tags: ["AI", "ML_PIPELINE", "ARCHITECTURE"],
      publishedAt: "2025-04-10",
      status: "URGENT",
      readTime: "15M",
      hasCodeSnippet: true,
    },
  ];
}

function getFallbackExperience(): Experience[] {
  return [
    {
      id: "1",
      role: "IT OFFICER",
      company: "BHUTAN NATIONAL BANK LIMITED",
      period: "JUL 2025 — PRESENT",
      description:
        "Digital Technology Department. Engineering enterprise banking systems including signature verification, e-procurement, and bulk transaction APIs. Managing Docker-based deployments on bnb.bt infrastructure with Oracle FLEXCUBE integration.",
      techStack: ["Next.js", "Docker", "Oracle", "Redis", "PostgreSQL"],
      order: 1,
    },
    {
      id: "2",
      role: "SOFTWARE ENGINEER",
      company: "ROMTECH — HIS MAJESTY'S SECRETARIAT",
      period: "JUL 2024 — JUN 2025",
      description:
        "Built and launched Kuensel's subscription platform driving 30% user engagement increase. Engineered biometric scanner driver in .NET for Department of Immigration. Deployed and maintained apps on AWS, App Store, and Google Play.",
      techStack: ["React Native", "Nest.js", ".NET", "AWS"],
      order: 2,
    },
    {
      id: "3",
      role: "FULL STACK DEVELOPER INTERN",
      company: "DRUK HOLDING & INVESTMENTS",
      period: "DEC 2023 — MAR 2024",
      description:
        "Enhanced water management system improving mobile compatibility and user satisfaction by 25%. Executed API debugging and UI/UX enhancements, reducing system errors by 25%.",
      techStack: ["React.js", "Tailwind CSS", "React Native", "REST APIs"],
      order: 3,
    },
    {
      id: "4",
      role: "SOFTWARE DEVELOPER INTERN",
      company: "TIJ-TECH — TOKYO INSTITUTE OF JAPAN",
      period: "JUN 2022 — JUL 2022",
      description:
        "Created Django user management system automating email processes for 500+ daily emails. Developed BERT-based application achieving 95% accuracy in spam detection.",
      techStack: ["Django", "Python", "BERT", "ML"],
      order: 4,
    },
  ];
}
