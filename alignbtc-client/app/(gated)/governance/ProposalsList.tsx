"use client";

import { useState } from "react";
import { Button, Icon } from "@/app/components/ui";

type Category = "Core" | "Treasury";

interface Proposal {
  sip: string;
  category: Category;
  endsIn: string;
  title: string;
  summary: string;
  forPct: number;
  totalVotes: string;
}

const PROPOSALS: Proposal[] = [
  {
    sip: "SIP-025",
    category: "Core",
    endsIn: "Ends in 2 days",
    title: "Nakamoto Release Activation",
    summary:
      "This proposal outlines the activation parameters for the Nakamoto upgrade, introducing faster blocks and Bitcoin finality to the Stacks network. It specifies the block height for activation and the required node upgrades.",
    forPct: 85,
    totalVotes: "12.5M STX",
  },
  {
    sip: "SIP-026",
    category: "Treasury",
    endsIn: "Ends in 5 days",
    title: "Treasury Grant: Developer Tooling Q3",
    summary:
      "Allocation of 500,000 STX from the foundation treasury to fund three core developer tooling teams focusing on Clarity smart contract testing frameworks and IDE integrations.",
    forPct: 62,
    totalVotes: "4.2M STX",
  },
];

const FILTERS = ["All", "Core", "Treasury"] as const;

function ProposalCard({ p }: { p: Proposal }) {
  return (
    <article className="group glass-panel relative overflow-hidden rounded-xl p-lg">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-md md:flex-row">
        <div className="grow">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-sm border border-stacks/20 bg-stacks/10 px-2 py-0.5 font-mono text-mono-sm text-primary">
              {p.sip}
            </span>
            <span className="rounded-sm border border-tertiary/20 bg-tertiary/10 px-2 py-0.5 font-ui text-label-md text-tertiary">
              Active
            </span>
            <span className="flex items-center gap-1 font-sans text-body-sm text-on-surface-variant">
              <Icon name="schedule" className="text-sm" />
              {p.endsIn}
            </span>
          </div>

          <h3 className="mb-2 font-display text-headline-md text-on-surface transition-colors group-hover:text-primary">
            {p.title}
          </h3>
          <p className="mb-md line-clamp-2 font-sans text-body-sm text-on-surface-variant">
            {p.summary}
          </p>

          {/* Voting progress */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-mono-sm">
              <span className="text-primary">For: {p.forPct}%</span>
              <span className="text-on-surface-variant">Against: {100 - p.forPct}%</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full border border-white/8 bg-surface-container-lowest">
              <div className="progress-fill h-full" style={{ width: `${p.forPct}%` }} />
              <div className="h-full bg-surface-variant" style={{ width: `${100 - p.forPct}%` }} />
            </div>
            <div className="pt-1 font-sans text-body-sm text-on-surface-variant">
              Total votes: {p.totalVotes}
            </div>
          </div>
        </div>

        {/* Voting actions */}
        <div className="flex min-w-[140px] justify-center gap-3 border-t border-white/10 pt-4 md:flex-col md:border-l md:border-t-0 md:pl-md md:pt-0">
          <Button cta size="sm" className="group/btn flex-1">
            <Icon name="thumb_up" className="transition-transform group-hover/btn:-translate-y-0.5" />
            For
          </Button>
          <Button cta variant="secondary" size="sm" className="group/btn flex-1 text-white">
            <Icon name="thumb_down" className="transition-transform group-hover/btn:translate-y-0.5" />
            Against
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProposalsList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = PROPOSALS.filter((p) => filter === "All" || p.category === filter);

  return (
    <div className="space-y-md lg:col-span-2">
      <div className="mb-sm flex items-center justify-between">
        <h2 className="font-display text-headline-md text-on-surface">Active Votes</h2>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md border px-3 py-1 font-sans text-body-sm transition-colors hover:bg-white/5 ${
                filter === f
                  ? "border-white/10 bg-surface-container-high text-on-surface"
                  : "border-transparent text-on-surface-variant"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.map((p) => (
        <ProposalCard key={p.sip} p={p} />
      ))}
    </div>
  );
}
