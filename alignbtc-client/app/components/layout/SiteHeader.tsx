import Image from "next/image";
import { Icon } from "@/app/components/ui";
import { ConnectWalletButton } from "./ConnectWalletButton";

const NAV_LINKS = [
  { label: "Score", href: "/score" },
  { label: "Explorer", href: "/explorer" },
  { label: "Staking", href: "/staking" },
  { label: "Governance", href: "/governance" },
];

export interface SiteHeaderProps {
  /** Label of the nav link to mark as active. */
  activeNav?: string;
  /** Show the search field (authenticated / explorer / governance views). */
  showSearch?: boolean;
  /** Placeholder for the search field. */
  searchPlaceholder?: string;
}

export function SiteHeader({
  activeNav = "Explorer",
  showSearch = false,
  searchPlaceholder = "Search blocks, txs, accounts...",
}: SiteHeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-page items-center justify-between px-sm md:px-xl">
        <a href="/" className="flex items-center gap-sm">
          <Image
            src="/screen.png"
            alt="AlignBTC logo"
            width={40}
            height={40}
            priority
            className="size-10"
          />
          <span className="font-display text-display-sm font-bold text-on-surface">
            AlignBTC
          </span>
        </a>

        <nav className="hidden items-center gap-lg md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative font-display text-headline-sm transition-all duration-300 active:scale-95 ${
                link.label === activeNav
                  ? "text-primary after:absolute after:-bottom-2 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:content-['']"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          {showSearch && (
            <div className="relative hidden lg:flex">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant"
              />
              <input
                type="text"
                placeholder={searchPlaceholder}
                aria-label="Search"
                className="w-64 rounded-full border border-white/10 bg-surface-container-lowest py-2 pl-10 pr-4 font-sans text-body-sm text-on-surface shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all placeholder:text-on-surface-variant/50 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container/50"
              />
            </div>
          )}
          <ConnectWalletButton className="hidden rounded-full md:inline-flex" />
        </div>
      </div>
    </header>
  );
}
