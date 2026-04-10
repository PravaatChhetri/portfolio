import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-12 py-12">
        <div className="mb-8 md:mb-0">
          <div className="text-white font-black font-headline text-[10px] tracking-widest uppercase mb-2">
            PROBOT
          </div>
          <div className="text-zinc-600 font-label text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} PRAVAAT CHHETRI // ALL_RIGHTS_RESERVED
          </div>
        </div>
        <div className="flex gap-12 font-label text-[10px] tracking-widest uppercase">
          <a
            href="https://github.com/pravaatchhetri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/pravaat-chhetri-717a05232"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
          <Link
            href="/contact"
            className="text-zinc-600 hover:text-white transition-colors"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </footer>
  );
}
