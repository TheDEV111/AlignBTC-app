import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Button, Icon } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Dashboard — AlignBTC",
  description: "Your Stacks portfolio at a glance — balance, staking yield, NFTs, and activity.",
};

const SIDEBAR_NAV = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard", active: true },
  { label: "Transactions", icon: "swap_horiz", href: "/transactions", active: false },
  { label: "Assets", icon: "toll", href: "/assets", active: false },
  { label: "Settings", icon: "settings", href: "/settings", active: false },
];

const NFTS = [
  { src: "/Image-asset1.png", name: "Megapont Ape #1042", collection: "Megapont Ape Club" },
  { src: "/Image-asset2.png", name: "Bitcoin Bird #008", collection: "Bitcoin Birds" },
];

const ACTIVITY = [
  {
    icon: "call_received",
    iconClass: "bg-primary/10 text-primary",
    title: "Received STX",
    sub: "From SP3J...9K2L",
    status: "Confirmed",
    statusClass: "bg-tertiary-container/10 text-tertiary-container",
    amount: "+ 500.00",
    amountClass: "text-tertiary",
  },
  {
    icon: "smart_toy",
    iconClass: "bg-surface-container-highest text-on-surface-variant",
    title: "Contract Call",
    sub: "ALEX DEX Swap",
    status: "Confirmed",
    statusClass: "bg-tertiary-container/10 text-tertiary-container",
    amount: "- 12.50 STX",
    amountClass: "text-on-surface",
  },
  {
    icon: "account_balance_wallet",
    iconClass: "bg-primary-container text-on-primary-container",
    title: "Stake STX",
    sub: "Cycle 72",
    status: "Pending",
    statusClass: "bg-primary/10 text-primary",
    amount: "- 10,000.00",
    amountClass: "text-on-surface",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Explorer" />

      <main className="mx-auto mb-xl mt-24 grid w-full max-w-page flex-1 grid-cols-1 gap-gutter px-sm md:px-xl lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-sm lg:col-span-3 lg:flex">
          <div className="glass-panel flex flex-col gap-md rounded-xl p-md">
            <div className="flex items-center gap-sm border-b border-white/5 pb-sm">
              <div className="flex size-12 items-center justify-center rounded-full bg-surface-container-high">
                <Icon name="wallet" filled className="text-primary" />
              </div>
              <div>
                <p className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                  My Wallet
                </p>
                <p className="w-32 truncate font-mono text-mono-sm text-on-surface">SP2P...8N4X</p>
              </div>
            </div>
            <nav className="flex flex-col gap-xs">
              {SIDEBAR_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-sm rounded-lg px-sm py-xs font-display text-headline-sm transition-colors ${
                    item.active
                      ? "hover-lift bg-surface-container-high text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <Icon name={item.icon} filled={item.active} />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
          {/* Portfolio summary */}
          <div className="glass-panel hover-lift flex min-h-[240px] flex-col justify-between rounded-xl p-lg md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-xs font-sans text-body-sm uppercase tracking-widest text-on-surface-variant">
                  Total Balance
                </h2>
                <div className="flex items-baseline gap-sm">
                  <span className="font-display text-display-lg text-on-surface">14,205.50</span>
                  <span className="font-display text-headline-md text-primary">STX</span>
                </div>
                <p className="mt-xs font-sans text-body-md text-on-surface-variant">
                  ≈ $24,149.35 USD
                </p>
              </div>
              <span className="flex items-center gap-base rounded bg-primary/10 px-xs py-base font-ui text-label-md text-primary">
                <Icon name="trending_up" filled className="text-sm" />
                +5.2%
              </span>
            </div>
            <div className="mt-lg flex gap-md">
              <Button cta className="flex-1">
                <Icon name="account_balance_wallet" filled />
                Stake STX
              </Button>
              <Button cta variant="secondary" className="flex-1 border-white">
                <Icon name="send" />
                Send
              </Button>
            </div>
          </div>

          {/* Staking APY highlight */}
          <div className="glass-overlay hover-lift group relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-md text-center">
            <div className="absolute inset-0 z-0 bg-primary/5 transition-colors group-hover:bg-primary/10" />
            <div className="relative z-10 flex flex-col items-center">
              <Icon name="local_fire_department" filled className="mb-sm text-4xl text-primary" />
              <h3 className="mb-xs font-display text-headline-sm text-on-surface-variant">
                Current Staking APY
              </h3>
              <p className="font-display text-display-lg text-primary">8.4%</p>
              <p className="mt-xs font-sans text-body-sm text-on-surface-variant">
                Paid in Bitcoin (BTC)
              </p>
            </div>
          </div>

          {/* Recent NFTs */}
          <div className="glass-panel hover-lift flex flex-col rounded-xl p-md">
            <div className="mb-md flex items-center justify-between border-b border-white/5 pb-xs">
              <h3 className="font-display text-headline-sm text-on-surface">Recent NFTs</h3>
              <a href="/assets" className="font-ui text-label-md text-primary hover:underline">
                View All
              </a>
            </div>
            <div className="flex flex-1 flex-col gap-sm">
              {NFTS.map((nft) => (
                <div
                  key={nft.name}
                  className="flex cursor-pointer items-center gap-sm rounded-lg p-xs transition-colors hover:bg-surface-container-low"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded bg-surface-container-high">
                    <Image src={nft.src} alt={nft.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-headline-sm text-on-surface">
                      {nft.name}
                    </p>
                    <p className="truncate font-sans text-body-sm text-on-surface-variant">
                      {nft.collection}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass-panel hover-lift rounded-xl p-md md:col-span-2">
            <div className="mb-md flex items-center justify-between border-b border-white/5 pb-xs">
              <h3 className="font-display text-headline-sm text-on-surface">Recent Activity</h3>
              <button className="flex items-center gap-xs font-ui text-label-md text-on-surface-variant transition-colors hover:text-primary">
                Filter
                <Icon name="filter_list" className="text-base" />
              </button>
            </div>
            <div className="flex flex-col">
              {ACTIVITY.map((tx, i) => (
                <div
                  key={tx.title}
                  className={`grid grid-cols-4 items-center rounded px-xs py-sm transition-colors hover:bg-surface-container-low ${
                    i < ACTIVITY.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div className="col-span-2 flex items-center gap-sm">
                    <div className={`flex size-10 items-center justify-center rounded-full ${tx.iconClass}`}>
                      <Icon name={tx.icon} filled />
                    </div>
                    <div>
                      <p className="font-display text-headline-sm text-on-surface">{tx.title}</p>
                      <p className="font-mono text-mono-sm text-on-surface-variant">{tx.sub}</p>
                    </div>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className={`rounded px-xs py-base font-ui text-label-md ${tx.statusClass}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <p className={`font-display text-headline-md ${tx.amountClass}`}>{tx.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
