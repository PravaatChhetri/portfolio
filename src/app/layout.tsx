import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { RootJsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pravaat-chhetri.vercel.app"),
  title: {
    default:
      "Pravaat Chhetri — Software Engineer & Full Stack Developer | Thimphu, Bhutan",
    template: "%s | Pravaat Chhetri",
  },
  description:
    "Pravaat Chhetri is a Software Engineer and IT Officer at Bhutan National Bank, specializing in Next.js, React Native, TypeScript, AI/ML integration, Docker, and enterprise banking systems. Available for freelance projects.",
  keywords: [
    "Pravaat Chhetri",
    "Software Engineer Bhutan",
    "Full Stack Developer Bhutan",
    "AI Engineer Bhutan",
    "Next.js Developer",
    "React Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Python Developer",
    "Enterprise Software Engineer",
    "Banking Software Engineer",
    "Freelance Developer Bhutan",
    "IT Officer Bhutan National Bank",
    "Full Stack Engineer for hire",
    "Web Developer Thimphu",
    "AI Integration Developer",
    "Docker Developer",
    "Software Engineer for hire",
    "PROBOT developer",
  ],
  authors: [
    { name: "Pravaat Chhetri", url: "https://pravaat-chhetri.vercel.app" },
  ],
  creator: "Pravaat Chhetri",
  publisher: "Pravaat Chhetri",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Pravaat Chhetri — Software Engineer & Full Stack Developer | Bhutan",
    description:
      "Project Officer (Full Stack Developer) at Bhutan National Bank. Building enterprise banking systems, AI platforms, and scalable full-stack applications with Next.js, React Native, and TypeScript. Open to freelance work.",
    url: "https://pravaat-chhetri.vercel.app",
    siteName: "Pravaat Chhetri — PROBOT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pravaat Chhetri — Software Engineer & Full Stack Developer | Bhutan",
    description:
      "Project Officer (Full Stack Developer) at Bhutan National Bank. Next.js, React Native, AI & enterprise systems developer. Open to freelance work.",
    creator: "@pravaat",
  },
  alternates: {
    canonical: "https://pravaat-chhetri.vercel.app",
  },
  verification: {
    google: "o63EwyNpFF1QjMfP4SMBTGjVD71lfbTBTPy9U2kpwYE",
    // yandex: "PASTE_IF_NEEDED",
    // bing verification is done via XML file in /public, not meta tag
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <meta
          name="google-site-verification"
          content="o63EwyNpFF1QjMfP4SMBTGjVD71lfbTBTPy9U2kpwYE"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        <RootJsonLd />
        <Navbar />
        <Sidebar />
        <main className="lg:pl-16 pb-[72px] lg:pb-0">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
