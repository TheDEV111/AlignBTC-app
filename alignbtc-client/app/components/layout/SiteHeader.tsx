import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/components/ui";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export interface SiteHeaderProps {
  /** @deprecated The active nav link is now derived from the current route. */
  activeNav?: string;
  /** Show the search field (authenticated / explorer / governance views). */
  showSearch?: boolean;
  /** Placeholder for the search field. */
  searchPlaceholder?: string;
}

export function SiteHeader({
  showSearch = false,
  searchPlaceholder = "Search blocks, txs, accounts...",
}: SiteHeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-page items-center justify-between px-sm md:px-xl">
        <Link href="/" className="flex items-center gap-sm">
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
        </Link>

        <NavLinks />

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
          <ConnectWalletButton className="hidden rounded-full lg:inline-flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
