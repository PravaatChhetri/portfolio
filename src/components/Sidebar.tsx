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
    <>
      {/* Desktop sidebar */}
      <nav className="fixed left-0 top-0 h-screen w-16 z-40 bg-surface-container-lowest/80 backdrop-blur-xl hidden lg:flex flex-col items-center py-8 gap-6">
        {/* Logo mark */}
        <Link
          href="/"
          className="w-10 h-10 bg-surface-container-high flex items-center justify-center mb-6"
        >
          <span className="font-headline text-[10px] font-black text-white tracking-tighter">
            PC
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
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-zinc-800 flex lg:hidden items-center justify-around px-2" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-3 py-2 ${
            pathname === "/" ? "text-white" : "text-zinc-500"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-headline text-[9px] font-bold tracking-wider">HOME</span>
        </Link>
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-2 ${
              isActive(item.href) ? "text-white" : "text-zinc-500"
            }`}
          >
            {isActive(item.href) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white" />
            )}
            <span className="material-symbols-outlined text-[22px]">
              {item.icon}
            </span>
            <span className="font-headline text-[9px] font-bold tracking-wider">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
