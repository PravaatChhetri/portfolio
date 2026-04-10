import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
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
  title: {
    default: "PRAVAAT CHHETRI — PROBOT",
    template: "%s — PROBOT",
  },
  description:
    "Software Engineer & IT Officer at Bhutan National Bank. Full-stack developer specializing in Next.js, React Native, Docker, and enterprise banking systems.",
  keywords: [
    "Pravaat Chhetri",
    "Software Engineer",
    "Bhutan",
    "Full Stack Developer",
    "Next.js",
    "React Native",
    "BNBL",
  ],
  authors: [{ name: "Pravaat Chhetri" }],
  openGraph: {
    title: "PRAVAAT CHHETRI — PROBOT",
    description: "Engineering precision in the void.",
    url: "https://pravaatchhetri.dev",
    siteName: "PROBOT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRAVAAT CHHETRI — PROBOT",
    description: "Engineering precision in the void.",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        <Navbar />
        <Sidebar />
        <main className="lg:pl-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
