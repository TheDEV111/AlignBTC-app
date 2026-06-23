import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ExplorerTabs } from "./ExplorerTabs";
import { ExplorerStats } from "./ExplorerStats";

export const metadata: Metadata = {
  title: "Explorer — AlignBTC",
  description:
    "Real-time insights into the Stacks network. Monitor blocks, track transactions, and verify account activity.",
};

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

        {/* Live network stats */}
        <ExplorerStats />

        {/* Data explorer */}
        <ExplorerTabs />
      </main>

      <SiteFooter />
    </div>
  );
}
