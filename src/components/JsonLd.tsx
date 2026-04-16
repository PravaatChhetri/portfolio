/**
 * JSON-LD structured data for Google, Bing, and AI-powered search engines.
 * Implements Person, WebSite, and BreadcrumbList schemas.
 */

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://pravaat-chhetri.vercel.app/#person",
  name: "Pravaat Chhetri",
  givenName: "Pravaat",
  familyName: "Chhetri",
  alternateName: [
    "PROBOT",
    "pravat",
    "Pravaat",
    "Parvath",
    "Parvat",
    "Prabhat",
    "Prabath",
    "Prabat",
    "Parbhat",
    "Parbat",
    "Pravaatchhetri",
    "Pravat Chhetri",
    "Pravaat Chetri",
    "Pravat Chetri",
    "pravaatchhetri",
    "pravath chetri",
    "pravath Chhetri",
    "prav Chhetri",
    "prav chetri",
    "prabhat Chhetri",
    "prabhat chetri",
    "prabat Chhetri",
    "prabat chetri",
    "parbhat Chhetri",
    "parbhat chetri",
    "parbat Chhetri",
    "parbat chetri",
    "Parbath Chhetri",
    "Parbath chetri",
  ],
  disambiguatingDescription:
    "Software Engineer and IT Officer at Bhutan National Bank, based in Thimphu, Bhutan. Not to be confused with other individuals sharing a similar name.",
  url: "https://pravaat-chhetri.vercel.app",
  image: "https://pravaat-chhetri.vercel.app/ronin.png",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer and IT Officer at Bhutan National Bank. Full-stack developer specializing in Next.js, React Native, TypeScript, AI/ML integration, Docker, and enterprise banking systems. B.E. in Information Technology from the Royal University of Bhutan. Available for freelance and remote software engineering projects.",
  email: "pravaatchhetri66@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thimphu",
    addressCountry: "BT",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "College of Science and Technology, Royal University of Bhutan",
  },
  worksFor: {
    "@type": "Organization",
    name: "Bhutan National Bank Limited",
    url: "https://www.bnb.bt",
  },
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "AI Engineering",
    "Machine Learning",
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS",
    "Enterprise Banking Systems",
    "Oracle FLEXCUBE",
    "Microservices Architecture",
    "IoT Systems",
    "DevOps",
    "Nginx",
    "NestJS",
    "Django",
    "FastAPI",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationLocation: {
      "@type": "Country",
      name: "Bhutan",
    },
    skills:
      "Next.js, React Native, TypeScript, Python, Docker, PostgreSQL, AI/ML integration, Enterprise systems",
  },
  sameAs: [
    "https://github.com/pravaatchhetri",
    "https://linkedin.com/in/pravaat-chhetri",
    "https://twitter.com/pravaat",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pravaat-chhetri.vercel.app/#website",
  url: "https://pravaat-chhetri.vercel.app",
  name: "Pravaat Chhetri — Software Engineer",
  description:
    "Portfolio of Pravaat Chhetri — Software Engineer, AI Engineer, and Full Stack Developer based in Thimphu, Bhutan.",
  author: { "@id": "https://pravaat-chhetri.vercel.app/#person" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://pravaat-chhetri.vercel.app/intel?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://pravaat-chhetri.vercel.app/#profilepage",
  url: "https://pravaat-chhetri.vercel.app",
  name: "Pravaat Chhetri — Software Engineer Portfolio",
  mainEntity: { "@id": "https://pravaat-chhetri.vercel.app/#person" },
};

export function RootJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_PAGE_SCHEMA),
        }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  publishedAt,
  url,
  tags,
}: {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  tags: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    datePublished: publishedAt,
    url,
    keywords: tags.join(", "),
    author: { "@id": "https://pravaat-chhetri.vercel.app/#person" },
    publisher: { "@id": "https://pravaat-chhetri.vercel.app/#person" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectJsonLd({
  title,
  description,
  url,
  techStack,
}: {
  title: string;
  description: string;
  url: string;
  techStack: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    url,
    applicationCategory: "BusinessApplication",
    keywords: techStack.join(", "),
    author: { "@id": "https://pravaat-chhetri.vercel.app/#person" },
    programmingLanguage: techStack,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
