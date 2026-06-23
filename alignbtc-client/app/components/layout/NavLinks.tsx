"use client";

import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Score", href: "/score" },
  { label: "Explorer", href: "/explorer" },
  { label: "Staking", href: "/staking" },
  { label: "Governance", href: "/governance" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-lg lg:flex">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <a
            key={link.label}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative font-display text-headline-sm transition-all duration-300 active:scale-95 ${
              active
                ? "text-primary after:absolute after:-bottom-2 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:content-['']"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
