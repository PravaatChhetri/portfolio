import { ContactContent } from "./ContactContent";

export const metadata = {
  title: "Contact — Hire Pravaat Chhetri",
  description:
    "Get in touch with Pravaat Chhetri — Software Engineer and Full Stack Developer based in Thimphu, Bhutan. Available for freelance projects, remote work, and technical collaborations in Next.js, React Native, AI, and enterprise systems.",
  alternates: { canonical: "https://pravaatchhetri.dev/contact" },
  openGraph: {
    title: "Contact Pravaat Chhetri — Hire a Software Engineer",
    description:
      "Available for freelance projects and remote work. Software Engineer specializing in Next.js, React Native, TypeScript, AI, and enterprise systems.",
    url: "https://pravaatchhetri.dev/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
