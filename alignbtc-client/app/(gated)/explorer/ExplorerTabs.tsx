"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/app/components/ui";
import {
  fetchRecentBlocks,
  fetchRecentTransactions,
  relativeTime,
  truncateHash,
  txStatusLabel,
  txTypeLabel,
  type ExplorerBlock,
  type ExplorerTx,
} from "@/lib/stacks/api";

type TabId = "blocks" | "transactions" | "accounts";

const TABS: { id: TabId; label: string }[] = [
  { id: "blocks", label: "Blocks" },
  { id: "transactions", label: "Transactions" },
  { id: "accounts", label: "Accounts" },
];

const thClass =
  "py-sm px-md font-ui text-label-md uppercase tracking-wider text-on-surface-variant";

function StatusPill({ status }: { status: "Confirmed" | "Pending" | "Failed" }) {
  const cls =
    status === "Confirmed"
      ? "bg-tertiary-container/20 text-tertiary"
      : status === "Pending"
        ? "bg-primary-container/20 text-primary"
        : "bg-error-container/30 text-error";
  return <span className={`rounded-full px-2 py-1 font-ui text-label-md ${cls}`}>{status}</span>;
}

function Loading() {
  return (
    <div className="flex items-center justify-center gap-2 p-lg font-sans text-body-md text-on-surface-variant">
      <Icon name="sync" className="animate-spin text-base" />
      Loading live data from the Stacks network…
    </div>
  );
}

function ErrorRow({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-sm p-lg text-center font-sans text-body-md text-on-surface-variant">
      <Icon name="cloud_off" className="text-2xl" />
      Could not reach the Stacks API.
      <button
        onClick={onRetry}
        className="font-ui text-label-md uppercase tracking-wider text-primary hover:underline"
      >
        Retry
      </button>
    </div>
  );
}

export function ExplorerTabs() {
  const [active, setActive] = useState<TabId>("blocks");
  const [blocks, setBlocks] = useState<ExplorerBlock[] | null>(null);
  const [txs, setTxs] = useState<ExplorerTx[] | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(false);
    setBlocks(null);
    setTxs(null);
    Promise.all([fetchRecentBlocks(8), fetchRecentTransactions(8)])
      .then(([b, t]) => {
        if (cancelled) return;
        setBlocks(b);
        setTxs(t);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = () => setReloadKey((k) => k + 1);

  return (
    <section className="glass-panel mt-md flex flex-col overflow-hidden rounded-xl">
      {/* Tab navigation */}
      <div className="flex gap-lg overflow-x-auto border-b border-white/10 px-md pt-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`border-b-2 pb-xs font-display text-headline-md transition-colors ${
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1 self-center pb-xs font-ui text-label-md uppercase tracking-wider text-tertiary">
          <span className="size-1.5 animate-pulse rounded-full bg-tertiary" />
          Live
        </span>
      </div>

      {/* Blocks */}
      {active === "blocks" &&
        (error ? (
          <ErrorRow onRetry={retry} />
        ) : !blocks ? (
          <Loading />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-surface-container/50">
                  <th className={thClass}>Height</th>
                  <th className={thClass}>Hash</th>
                  <th className={`${thClass} text-right`}>Txs</th>
                  <th className={`${thClass} text-right`}>Time</th>
                </tr>
              </thead>
              <tbody className="font-mono text-mono-sm">
                {blocks.map((b, i) => (
                  <tr
                    key={b.hash}
                    className={`border-b border-white/5 transition-colors hover:bg-surface-container/30 ${
                      i % 2 === 1 ? "bg-surface-container/10" : ""
                    }`}
                  >
                    <td className="px-md py-md text-primary">{b.height.toLocaleString("en-US")}</td>
                    <td className="max-w-[220px] truncate px-md py-md text-on-surface">
                      {truncateHash(b.hash)}
                    </td>
                    <td className="px-md py-md text-right text-on-surface">{b.txCount}</td>
                    <td className="px-md py-md text-right text-on-surface-variant">
                      {relativeTime(b.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* Transactions */}
      {active === "transactions" &&
        (error ? (
          <ErrorRow onRetry={retry} />
        ) : !txs ? (
          <Loading />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-surface-container/50">
                  <th className={thClass}>Tx ID</th>
                  <th className={thClass}>Type</th>
                  <th className={thClass}>Status</th>
                  <th className={`${thClass} text-right`}>Value (STX)</th>
                  <th className={`${thClass} text-right`}>Time</th>
                </tr>
              </thead>
              <tbody className="font-mono text-mono-sm">
                {txs.map((t, i) => (
                  <tr
                    key={t.id}
                    className={`border-b border-white/5 transition-colors hover:bg-surface-container/30 ${
                      i % 2 === 1 ? "bg-surface-container/10" : ""
                    }`}
                  >
                    <td className="max-w-[150px] truncate px-md py-md text-primary">
                      {truncateHash(t.id)}
                    </td>
                    <td className="px-md py-md text-on-surface">{txTypeLabel(t.type)}</td>
                    <td className="px-md py-md">
                      <StatusPill status={txStatusLabel(t.status)} />
                    </td>
                    <td className="px-md py-md text-right text-on-surface">
                      {t.valueStx !== null ? t.valueStx.toLocaleString("en-US") : "—"}
                    </td>
                    <td className="px-md py-md text-right text-on-surface-variant">
                      {relativeTime(t.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* Accounts */}
      {active === "accounts" && (
        <div className="p-md text-center font-sans text-body-md text-on-surface-variant">
          Account lookup coming soon — search an address to view its activity.
        </div>
      )}
    </section>
  );
}
