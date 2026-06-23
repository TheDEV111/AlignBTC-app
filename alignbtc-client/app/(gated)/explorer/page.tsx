import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ExplorerTabs } from "./ExplorerTabs";

export const metadata: Metadata = {
  title: "Explorer — AlignBTC",
  description:
    "Real-time insights into the Stacks network. Monitor blocks, track transactions, and verify account activity.",
};

const STATS = [
  { label: "Latest Block", value: "145,892", note: "+2s ago", noteClass: "text-tertiary-fixed" },
  { label: "TPS (Last 24h)", value: "12.4", note: "avg", noteClass: "text-on-surface-variant" },
  { label: "Total Staked", value: "450.2M", note: "STX", noteClass: "text-primary" },
  { label: "Active Miners", value: "342", note: "nodes", noteClass: "text-secondary-fixed" },
];

export default function ExplorerPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Explorer" showSearch />

      <main className="mx-auto flex w-full max-w-page flex-col gap-lg px-sm pt-32 pb-xl md:px-xl">
        {/* Header */}
        <header className="flex flex-col gap-sm">
          <h1 className="font-display text-display-lg text-on-surface">
            Blockchain{" "}
            <span className="bg-linear-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Explorer
            </span>
          </h1>
          <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
            Real-time insights into the Stacks network. Monitor blocks, track
            transactions, and verify account activity with precision.
          </p>
        </header>

        {/* Stats bento grid */}
        <section className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-panel flex flex-col gap-xs rounded-xl p-md">
              <span className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                {stat.label}
              </span>
              <div className="flex items-end gap-sm">
                <span className="font-display text-display-sm text-on-surface">{stat.value}</span>
                <span className={`mb-1 font-sans text-body-sm ${stat.noteClass}`}>{stat.note}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Data explorer */}
        <ExplorerTabs />
      </main>

      <SiteFooter />
    </div>
  );
}
