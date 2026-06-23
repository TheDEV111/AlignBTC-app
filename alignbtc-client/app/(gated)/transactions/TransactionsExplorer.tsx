"use client";

import { useState } from "react";
import { Icon } from "@/app/components/ui";

type TypeFilter = "All Types" | "Contract Calls" | "STX Transfers" | "Mints";
type Status = "Confirmed" | "Pending";

interface Detail {
  label: string;
  value: string;
  kind: "link" | "code" | "memo" | "plain";
}

interface Tx {
  id: string;
  type: string;
  typeFilter: Exclude<TypeFilter, "All Types">;
  status: Status;
  icon: string;
  iconClass: string;
  txid: string;
  amount: string;
  amountClass: string;
  time: string;
  details: Detail[];
}

const TXS: Tx[] = [
  {
    id: "tx1",
    type: "Contract Call",
    typeFilter: "Contract Calls",
    status: "Confirmed",
    icon: "code_blocks",
    iconClass: "bg-tertiary/10 text-tertiary",
    txid: "0x8f7d9a...2b4c1e",
    amount: "-",
    amountClass: "text-on-surface",
    time: "2 mins ago",
    details: [
      { label: "Contract", value: "SP2ZNG...swap-v1", kind: "link" },
      { label: "Function", value: "swap-exact-x-for-y", kind: "code" },
      { label: "Fee", value: "0.0024 STX", kind: "plain" },
    ],
  },
  {
    id: "tx2",
    type: "STX Transfer",
    typeFilter: "STX Transfers",
    status: "Pending",
    icon: "send",
    iconClass: "bg-secondary/10 text-secondary",
    txid: "0x3a1b4c...9d8e7f",
    amount: "- 1,250.00 STX",
    amountClass: "text-primary font-bold",
    time: "15 mins ago",
    details: [
      { label: "To", value: "SP3K8B...9x7z", kind: "link" },
      { label: "Memo", value: '"Invoice #1024"', kind: "memo" },
      { label: "Fee", value: "0.0008 STX", kind: "plain" },
    ],
  },
  {
    id: "tx3",
    type: "NFT Mint",
    typeFilter: "Mints",
    status: "Confirmed",
    icon: "diamond",
    iconClass: "bg-primary-container/20 text-primary-container",
    txid: "0x5c2d1a...7f4e9b",
    amount: "+ 1 NFT",
    amountClass: "text-tertiary font-bold",
    time: "2 hrs ago",
    details: [
      { label: "Collection", value: "StacksPunks", kind: "link" },
      { label: "Token ID", value: "#4092", kind: "code" },
      { label: "Fee", value: "0.0500 STX", kind: "plain" },
    ],
  },
];

const TYPE_FILTERS: TypeFilter[] = ["All Types", "Contract Calls", "STX Transfers", "Mints"];

function DetailValue({ d }: { d: Detail }) {
  switch (d.kind) {
    case "link":
      return (
        <span className="cursor-pointer font-mono text-mono-sm text-primary hover:underline">
          {d.value}
        </span>
      );
    case "code":
      return (
        <span className="w-fit rounded bg-surface-container px-2 py-0.5 font-mono text-mono-sm text-on-surface">
          {d.value}
        </span>
      );
    case "memo":
      return <span className="font-sans text-body-sm italic text-on-surface-variant">{d.value}</span>;
    default:
      return <span className="font-mono text-mono-sm text-on-surface">{d.value}</span>;
  }
}

function TxRow({ tx }: { tx: Tx }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(tx.txid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      onClick={() => setOpen((v) => !v)}
      className={`cursor-pointer border-l-2 transition-colors hover:bg-white/[0.02] ${
        open ? "border-stacks bg-white/[0.03]" : "border-transparent"
      }`}
    >
      <div className="grid grid-cols-1 items-center gap-4 p-4 md:grid-cols-12">
        {/* Type & status */}
        <div className="flex items-center gap-3 md:col-span-3">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tx.iconClass}`}>
            <Icon name={tx.icon} filled />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-body-md font-semibold text-on-surface">{tx.type}</span>
            {tx.status === "Confirmed" ? (
              <span className="flex items-center gap-1 font-ui text-label-md text-tertiary">
                <Icon name="check_circle" className="text-sm" />
                Confirmed
              </span>
            ) : (
              <span className="flex items-center gap-1 font-ui text-label-md text-outline">
                <Icon name="sync" className="animate-spin text-sm" />
                Pending
              </span>
            )}
          </div>
        </div>

        {/* TxID */}
        <div className="flex items-center gap-2 md:col-span-4">
          <span className="truncate font-mono text-mono-sm text-on-surface-variant">{tx.txid}</span>
          <button
            aria-label="Copy TxID"
            onClick={copy}
            className="p-1 text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name={copied ? "check" : "content_copy"} className="text-base" />
          </button>
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between md:col-span-2 md:justify-end">
          <span className="font-ui text-label-md text-on-surface-variant md:hidden">Amount:</span>
          <span className={`font-mono text-mono-sm ${tx.amountClass}`}>{tx.amount}</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-between md:col-span-2 md:justify-end">
          <span className="font-ui text-label-md text-on-surface-variant md:hidden">Time:</span>
          <span className="font-sans text-body-sm text-on-surface-variant">{tx.time}</span>
        </div>

        {/* Chevron */}
        <div className="col-span-1 hidden items-center justify-center md:flex">
          <Icon
            name="expand_more"
            className={`text-on-surface-variant transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Expanded details */}
      <div data-open={open} className="tx-details border-t border-white/5 bg-surface-container-lowest/50 px-4 md:px-16">
        <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
          {tx.details.map((d) => (
            <div key={d.label} className="flex flex-col gap-1">
              <span className="font-ui text-label-md uppercase text-on-surface-variant">{d.label}</span>
              <DetailValue d={d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TransactionsExplorer() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All Types");
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);

  const visible = TXS.filter((tx) => {
    const matchesType = typeFilter === "All Types" || tx.typeFilter === typeFilter;
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || tx.txid.toLowerCase().includes(q) || tx.type.toLowerCase().includes(q);
    return matchesType && matchesStatus && matchesQuery;
  });

  const chipBase =
    "rounded-full border px-4 py-1.5 font-ui text-label-md transition-colors";
  const chipOff =
    "border-white/5 bg-surface-container-high text-on-surface-variant hover:bg-surface-variant hover:text-on-surface";

  return (
    <div className="flex flex-col gap-md">
      {/* Header + search/filter */}
      <div className="mb-xs flex flex-col items-start justify-between gap-md md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-display-lg tracking-tight text-on-surface">
            Transaction History
          </h1>
          <p className="mt-2 font-sans text-body-md text-on-surface-variant">
            View and track all on-chain activities linked to your wallet.
          </p>
        </div>
        <div className="flex w-full flex-col gap-xs sm:flex-row md:w-auto">
          <div className="relative w-full sm:w-[320px]">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search TxID, Address, or Contract"
              className="h-12 w-full rounded-lg border border-white/10 bg-surface-container-lowest pl-10 pr-4 font-mono text-mono-sm text-on-surface shadow-inner outline-none transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-container-lowest px-4 font-sans text-body-sm text-on-surface transition-all hover:border-white/20 hover:bg-surface-variant">
            <Icon name="filter_list" className="text-xl" />
            Filters
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mb-sm flex flex-wrap gap-xs">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`${chipBase} ${
              typeFilter === f ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20" : chipOff
            }`}
          >
            {f}
          </button>
        ))}

        <div className="mx-2 h-6 w-px self-center bg-white/10" />

        {(["Confirmed", "Pending"] as Status[]).map((s) => {
          const active = statusFilter === s;
          const activeClass =
            s === "Confirmed"
              ? "border-tertiary/20 bg-tertiary/10 text-tertiary hover:bg-tertiary/20"
              : "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20";
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(active ? null : s)}
              className={`${chipBase} ${active ? activeClass : chipOff}`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="glass-panel flex flex-col overflow-hidden rounded-xl">
        <div className="hidden grid-cols-12 gap-4 border-b border-white/5 bg-surface-container-highest/30 p-4 font-ui text-label-md uppercase tracking-wider text-on-surface-variant md:grid">
          <div className="col-span-3">Type &amp; Status</div>
          <div className="col-span-4">Transaction ID</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Time</div>
          <div className="col-span-1" />
        </div>

        <div className="flex flex-col divide-y divide-white/5">
          {visible.length > 0 ? (
            visible.map((tx) => <TxRow key={tx.id} tx={tx} />)
          ) : (
            <div className="p-8 text-center font-sans text-body-md text-on-surface-variant">
              No transactions match your filters.
            </div>
          )}
        </div>

        <div className="flex justify-center border-t border-white/5 bg-surface-container-highest/20 p-4">
          <button className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 font-sans text-body-sm text-on-surface transition-all hover:border-primary hover:bg-white/5">
            Load More
            <Icon name="arrow_downward" className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
