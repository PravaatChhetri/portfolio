"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ITEMS = [
  { href: "/work", icon: "terminal", label: "PROJECTS" },
  { href: "/intel", icon: "article", label: "JOURNAL" },
  { href: "/stack", icon: "memory", label: "STACK" },
  { href: "/contact", icon: "alternate_email", label: "CONNECT" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-16 z-40 bg-surface-container-lowest/80 backdrop-blur-xl hidden lg:flex flex-col items-center py-8 gap-6">
      {/* Logo mark */}
      <Link
        href="/"
        className="w-10 h-10 bg-surface-container-high flex items-center justify-center mb-6"
      >
        <span className="font-headline text-[10px] font-black text-white tracking-tighter">
          V_OS
        </span>
      </Link>

      {/* Nav Icons */}
      <div className="flex flex-col gap-4 flex-1">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative p-3 transition-none ${
              isActive(item.href)
                ? "bg-white text-black font-bold"
                : "text-zinc-600 hover:bg-zinc-900"
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {item.icon}
            </span>
            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-[10px] font-headline font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom avatar */}
      <div className="mt-auto">
        <div className="w-8 h-8 bg-surface-container-high ghost-border flex items-center justify-center">
          <span className="text-[10px] font-headline font-bold text-zinc-400">
            PC
          </span>
        </div>
      </div>
    </nav>
  );
}
