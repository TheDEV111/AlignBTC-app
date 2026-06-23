"use client";

import { useState } from "react";
import { Icon } from "@/app/components/ui";

type TabId = "blocks" | "transactions" | "accounts";

const TABS: { id: TabId; label: string }[] = [
  { id: "blocks", label: "Blocks" },
  { id: "transactions", label: "Transactions" },
  { id: "accounts", label: "Accounts" },
];

const BLOCKS = [
  { height: "145,892", hash: "0x8f2a...391c", miner: "SP2M...4H8P", txs: "142", time: "2s ago" },
  { height: "145,891", hash: "0x3b1d...88f2", miner: "SP9K...1M2N", txs: "89", time: "10m ago" },
  { height: "145,890", hash: "0x1a9c...77e1", miner: "SP1A...9V3B", txs: "215", time: "21m ago" },
  { height: "145,889", hash: "0x9d4e...22a4", miner: "SP5F...7X6Z", txs: "65", time: "32m ago" },
];

const TRANSACTIONS = [
  { id: "0x5f...a1b2", type: "Contract Call", status: "Confirmed", value: "15.5", time: "1m ago" },
  { id: "0xc2...9d8e", type: "Token Transfer", status: "Pending", value: "1,250.0", time: "Just now" },
  { id: "0x11...44ff", type: "Smart Contract", status: "Confirmed", value: "0.0", time: "5m ago" },
] as const;

const thClass =
  "py-sm px-md font-ui text-label-md uppercase tracking-wider text-on-surface-variant";

export function ExplorerTabs() {
  const [active, setActive] = useState<TabId>("blocks");

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
      </div>

      {/* Blocks */}
      {active === "blocks" && (
        <div className="animate-[fadeIn_0.3s_ease-in-out]">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-surface-container/50">
                  <th className={thClass}>Height</th>
                  <th className={thClass}>Hash</th>
                  <th className={thClass}>Miner</th>
                  <th className={`${thClass} text-right`}>Txs</th>
                  <th className={`${thClass} text-right`}>Time</th>
                </tr>
              </thead>
              <tbody className="font-mono text-mono-sm">
                {BLOCKS.map((b, i) => (
                  <tr
                    key={b.height}
                    className={`border-b border-white/5 transition-colors hover:bg-surface-container/30 ${
                      i % 2 === 1 ? "bg-surface-container/10" : ""
                    }`}
                  >
                    <td className="px-md py-md text-primary">{b.height}</td>
                    <td className="max-w-[200px] truncate px-md py-md text-on-surface">{b.hash}</td>
                    <td className="px-md py-md text-secondary-fixed">{b.miner}</td>
                    <td className="px-md py-md text-right text-on-surface">{b.txs}</td>
                    <td className="px-md py-md text-right text-on-surface-variant">{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center border-t border-white/5 p-md">
            <button className="flex items-center gap-xs font-ui text-label-md uppercase tracking-wider text-primary transition-colors hover:text-primary-container">
              View All Blocks
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      )}

      {/* Transactions */}
      {active === "transactions" && (
        <div className="w-full animate-[fadeIn_0.3s_ease-in-out] overflow-x-auto">
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
              {TRANSACTIONS.map((t, i) => {
                const confirmed = t.status === "Confirmed";
                return (
                  <tr
                    key={t.id}
                    className={`border-b border-white/5 transition-colors hover:bg-surface-container/30 ${
                      i % 2 === 1 ? "bg-surface-container/10" : ""
                    }`}
                  >
                    <td className="max-w-[150px] truncate px-md py-md text-primary">{t.id}</td>
                    <td className="px-md py-md text-on-surface">{t.type}</td>
                    <td className="px-md py-md">
                      <span
                        className={`rounded-full px-2 py-1 font-ui text-label-md ${
                          confirmed
                            ? "bg-tertiary-container/20 text-tertiary"
                            : "bg-primary-container/20 text-primary"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-md py-md text-right text-on-surface">{t.value}</td>
                    <td className="px-md py-md text-right text-on-surface-variant">{t.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Accounts */}
      {active === "accounts" && (
        <div className="animate-[fadeIn_0.3s_ease-in-out] p-md text-center font-sans text-body-md text-on-surface-variant">
          Account data visualization loading...
        </div>
      )}
    </section>
  );
}
