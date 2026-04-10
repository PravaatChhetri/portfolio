# VANGUARD_OS — Pravaat Chhetri Portfolio

A brutalist, monochrome developer portfolio built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Notion as a headless CMS**.

Design system: "The Monochrome Ronin" — hard 0px corners, Space Grotesk + Inter typography, atmospheric dark surfaces, and terminal-inspired UI.

---

## Tech Stack

| Layer       | Technology                               |
| ----------- | ---------------------------------------- |
| Framework   | Next.js 14 (App Router, ISR)             |
| Styling     | Tailwind CSS + Custom Design Tokens      |
| Animation   | Framer Motion (parallax, reveals, stagger) |
| CMS         | Notion API (`@notionhq/client`)          |
| Fonts       | Space Grotesk, Inter, JetBrains Mono     |
| Deployment  | Vercel (recommended)                     |
| Contact     | Formspree (or custom API)                |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.local.example .env.local

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

> The site works with fallback data even without Notion configured. Set up Notion when you're ready to manage content dynamically.

---

## Notion Database Setup

Create **3 databases** in Notion and share each with your integration.

### 1. Projects Database (`NOTION_PROJECTS_DB`)

| Property     | Type         | Description                           |
| ------------ | ------------ | ------------------------------------- |
| Title        | Title        | Project name (e.g., "BNB_SIGVERIFY")  |
| Slug         | Rich Text    | URL slug (e.g., "bnb-signature-verification") |
| Tagline      | Rich Text    | One-line description                  |
| Description  | Rich Text    | Full description                      |
| Category     | Select       | e.g., "ENTERPRISE BANKING", "AI PLATFORM" |
| Tech Stack   | Multi-select | e.g., "Next.js", "Docker", "PostgreSQL" |
| Cover        | Files        | Cover image for the project card      |
| Live URL     | URL          | Deployed URL                          |
| GitHub URL   | URL          | Source code URL                       |
| Challenge    | Rich Text    | The problem being solved              |
| Solution     | Rich Text    | How you solved it                     |
| Featured     | Checkbox     | Show in featured section              |
| Order        | Number       | Display order (1, 2, 3...)            |
| Status       | Select       | "Published" / "Draft"                 |

### 2. Blog Database (`NOTION_BLOG_DB`)

| Property   | Type         | Description                          |
| ---------- | ------------ | ------------------------------------ |
| Title      | Title        | Post title                           |
| Slug       | Rich Text    | URL slug                             |
| Excerpt    | Rich Text    | Short preview text                   |
| Tags       | Multi-select | e.g., "DOCKER", "ARCHITECTURE"       |
| Published  | Date         | Publication date                     |
| Priority   | Select       | "URGENT" / "STABLE" / "DRAFT"        |
| Read Time  | Rich Text    | e.g., "8M"                           |
| Cover      | Files        | Optional cover image                 |
| Has Code   | Checkbox     | Whether it has code snippets         |
| Status     | Select       | "Published" / "Draft"                |

Write your blog content as normal Notion blocks (headings, text, code blocks, images, callouts, etc.). They'll be rendered automatically.

### 3. Experience Database (`NOTION_EXPERIENCE_DB`)

| Property    | Type         | Description                         |
| ----------- | ------------ | ----------------------------------- |
| Role        | Title        | Job title                           |
| Company     | Rich Text    | Company name                        |
| Period      | Rich Text    | e.g., "JUL 2025 — PRESENT"         |
| Description | Rich Text    | Role description                    |
| Tech Stack  | Multi-select | Technologies used                   |
| Order       | Number       | Display order (1 = most recent)     |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, nav, sidebar, footer)
│   ├── page.tsx                # Home (hero + experience + projects + passions)
│   ├── sections/               # Homepage section components
│   │   ├── HeroSection.tsx     # Parallax hero with text reveal
│   │   ├── ExperienceSection.tsx # Timeline with sticky heading
│   │   ├── ProjectsSection.tsx # Asymmetric project grid
│   │   └── PassionsSection.tsx # Beyond the Code section
│   ├── work/
│   │   └── [slug]/
│   │       ├── page.tsx        # Case study server component
│   │       └── CaseStudyContent.tsx # Case study with specs, metrics
│   ├── intel/
│   │   ├── page.tsx            # Blog server component
│   │   └── IntelFeedContent.tsx # Feed with tag filtering
│   └── contact/
│       ├── page.tsx            # Contact server component
│       └── ContactContent.tsx  # Terminal form + social nodes
├── components/
│   ├── Navbar.tsx              # Frosted obsidian top nav
│   ├── Sidebar.tsx             # Desktop icon sidebar
│   ├── Footer.tsx              # Minimal footer
│   ├── Animations.tsx          # Framer Motion wrappers
│   └── NotionBlockRenderer.tsx # Notion -> HTML converter
├── lib/
│   └── notion.ts               # Notion API client + types + fallback data
└── styles/
    └── globals.css              # Design system CSS + utilities
```

---

## Design System

- **Colors**: Strictly monotone. `#131313` base, surface hierarchy via tonal shifts
- **Borders**: 0px radius everywhere. No rounded corners.
- **Typography**: Space Grotesk (display/labels), Inter (body), JetBrains Mono (code)
- **Shadows**: Ambient only (64px blur, 4% opacity). No drop shadows.
- **Dividers**: Background color shifts only. No visible lines between sections.
- **Images**: Grayscale + reduced brightness. Scale on hover.

---

## Deployment

### Vercel (recommended)
```bash
# Connect repo and set env vars in Vercel dashboard
npm run build
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Adding Your Resume

Place your resume PDF at `public/resume.pdf`. The "RESUME" button in the navbar links to this file.

---

## Customization

- **Hero text**: Edit `src/app/sections/HeroSection.tsx` — change "DIGITAL SAMURAI" and tagline
- **Hero background**: Replace the gradient with your own image in `HeroSection.tsx`
- **Passions**: Edit the `PASSIONS` array in `PassionsSection.tsx`
- **Social links**: Edit `SOCIAL_LINKS` in `ContactContent.tsx`
- **Colors**: Modify `tailwind.config.ts` surface color tokens
- **Contact form**: Set `NEXT_PUBLIC_FORMSPREE_ID` or integrate your own API

---

## License

Private. Not for redistribution.
