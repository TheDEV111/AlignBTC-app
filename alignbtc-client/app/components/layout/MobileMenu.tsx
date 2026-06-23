"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/app/components/ui";
import { ConnectWalletButton } from "./ConnectWalletButton";

const PRIMARY = [
  { label: "Score", href: "/score", icon: "fingerprint" },
  { label: "Explorer", href: "/explorer", icon: "travel_explore" },
  { label: "Staking", href: "/staking", icon: "cycle" },
  { label: "Governance", href: "/governance", icon: "how_to_vote" },
];

const APP = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Transactions", href: "/transactions", icon: "swap_horiz" },
  { label: "Assets", href: "/assets", icon: "toll" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const renderLink = (item: { label: string; href: string; icon: string }) => {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-sm rounded-lg px-sm py-3 font-display text-headline-sm transition-colors ${
          active
            ? "bg-primary-container/15 text-primary"
            : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
        }`}
      >
        <Icon name={item.icon} filled={active} className="text-xl" />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-lg text-on-surface transition-colors hover:bg-white/5"
      >
        <Icon name="menu" className="text-2xl" />
      </button>

      {/* Overlay (kept mounted for slide animation) */}
      <div className={`fixed inset-0 z-60 ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`glass-overlay absolute right-0 top-0 flex h-full w-72 max-w-[82vw] flex-col gap-md rounded-none p-md transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-headline-sm font-bold text-on-surface">
              Align<span className="text-primary">BTC</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>

          <ConnectWalletButton className="w-full justify-center" />

          <nav className="flex flex-col gap-1 overflow-y-auto">
            {PRIMARY.map(renderLink)}
            <div className="my-2 border-t border-white/5" />
            <span className="px-sm pb-1 font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
              Wallet
            </span>
            {APP.map(renderLink)}
          </nav>
        </aside>
      </div>
    </div>
  );
}
