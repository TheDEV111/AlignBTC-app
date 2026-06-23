"use client";

import { useEffect, useState } from "react";
import {
  fetchNetworkStats,
  formatCompact,
  relativeTime,
  STACKS_NETWORK,
  type NetworkStats,
} from "@/lib/stacks/api";

function StatCard({ label, value, note, noteClass }: {
  label: string;
  value: string;
  note: string;
  noteClass: string;
}) {
  return (
    <div className="glass-panel flex flex-col gap-xs rounded-xl p-md">
      <span className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>
      <div className="flex items-end gap-sm">
        <span className="font-display text-display-sm text-on-surface">{value}</span>
        <span className={`mb-1 font-sans text-body-sm ${noteClass}`}>{note}</span>
      </div>
    </div>
  );
}

export function ExplorerStats() {
  const [stats, setStats] = useState<NetworkStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchNetworkStats()
      .then((s) => !cancelled && setStats(s))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const dash = "—";

  return (
    <section className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Latest Block"
        value={stats ? stats.latestBlock.toLocaleString("en-US") : dash}
        note={stats ? relativeTime(stats.latestBlockTime) : "loading"}
        noteClass="text-tertiary-fixed"
      />
      <StatCard
        label="Total Stacked"
        value={stats?.stackedStx != null ? formatCompact(stats.stackedStx) : dash}
        note="STX"
        noteClass="text-primary"
      />
      <StatCard
        label="Network"
        value={STACKS_NETWORK}
        note="Hiro API"
        noteClass="text-secondary-fixed"
      />
      <StatCard label="Data" value="Live" note="on-chain" noteClass="text-tertiary" />
    </section>
  );
}
