// Live read-only data from the Hiro Stacks Blockchain API (public, no key).
// Network follows NEXT_PUBLIC_STACKS_NETWORK (defaults to testnet).

export const STACKS_NETWORK = (process.env.NEXT_PUBLIC_STACKS_NETWORK ?? "testnet") as
  | "testnet"
  | "mainnet";
const API_BASE = STACKS_NETWORK === "mainnet" ? "https://api.hiro.so" : "https://api.testnet.hiro.so";

export interface ExplorerBlock {
  height: number;
  hash: string;
  txCount: number;
  time: number; // unix seconds
}

export interface ExplorerTx {
  id: string;
  type: string; // raw tx_type
  status: string; // raw tx_status
  valueStx: number | null;
  time: number; // unix seconds
}

async function getJson(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Hiro API ${res.status}`);
  return res.json();
}

export async function fetchRecentBlocks(limit = 6): Promise<ExplorerBlock[]> {
  const data = await getJson(`/extended/v2/blocks?limit=${limit}`);
  return (data.results ?? []).map(
    (b: { height: number; hash: string; tx_count: number; burn_block_time: number }) => ({
      height: b.height,
      hash: b.hash,
      txCount: b.tx_count,
      time: b.burn_block_time,
    }),
  );
}

export async function fetchRecentTransactions(limit = 6): Promise<ExplorerTx[]> {
  const data = await getJson(`/extended/v1/tx?limit=${limit}`);
  return (data.results ?? []).map(
    (t: {
      tx_id: string;
      tx_type: string;
      tx_status: string;
      burn_block_time: number;
      token_transfer?: { amount: string };
    }) => ({
      id: t.tx_id,
      type: t.tx_type,
      status: t.tx_status,
      valueStx: t.token_transfer ? Number(t.token_transfer.amount) / 1_000_000 : null,
      time: t.burn_block_time,
    }),
  );
}

export interface NetworkStats {
  latestBlock: number;
  latestBlockTime: number; // unix seconds
  stackedStx: number | null;
}

export async function fetchNetworkStats(): Promise<NetworkStats> {
  const [blocks, pox] = await Promise.all([
    getJson(`/extended/v2/blocks?limit=1`),
    getJson(`/v2/pox`).catch(() => null),
  ]);
  const b = blocks.results?.[0];
  const stackedUstx = pox?.current_cycle?.stacked_ustx ?? pox?.next_cycle?.stacked_ustx ?? null;
  return {
    latestBlock: b?.height ?? 0,
    latestBlockTime: b?.burn_block_time ?? 0,
    stackedStx: stackedUstx != null ? Number(stackedUstx) / 1_000_000 : null,
  };
}

// --- formatting helpers ----------------------------------------------------

export function formatCompact(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString("en-US");
}

export function truncateHash(hash: string, start = 6, end = 4): string {
  if (hash.length <= start + end + 1) return hash;
  return `${hash.slice(0, start)}…${hash.slice(-end)}`;
}

export function relativeTime(unixSeconds: number): string {
  if (!unixSeconds) return "—";
  const diff = Math.max(0, Math.floor(Date.now() / 1000 - unixSeconds));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const TX_TYPE_LABELS: Record<string, string> = {
  token_transfer: "Token Transfer",
  contract_call: "Contract Call",
  smart_contract: "Smart Contract",
  coinbase: "Coinbase",
  tenure_change: "Tenure Change",
  poison_microblock: "Poison Microblock",
};

export function txTypeLabel(type: string): string {
  return TX_TYPE_LABELS[type] ?? type;
}

/** Normalises Hiro tx_status into Confirmed / Pending / Failed. */
export function txStatusLabel(status: string): "Confirmed" | "Pending" | "Failed" {
  if (status === "success") return "Confirmed";
  if (status === "pending") return "Pending";
  return "Failed";
}
