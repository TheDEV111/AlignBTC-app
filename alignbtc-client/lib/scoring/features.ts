import type { WalletFeatures } from "./types";

interface FeatureMeta {
  label: string;
  icon: string; // Material Symbol
  description: string;
  /** How heavily this feature pushes the trust score (for the UI breakdown). */
  weight: number;
  format: (v: number) => string;
}

const int = (v: number) => Math.round(v).toLocaleString("en-US");

// Ordered for display; weights sum to 1 and match the mock scoring model.
export const FEATURE_META: Record<keyof WalletFeatures, FeatureMeta> = {
  wallet_age_days: {
    label: "Wallet Age",
    icon: "schedule",
    description: "Days since first on-chain activity",
    weight: 0.15,
    format: (v) => `${int(v)} days`,
  },
  tx_count_90d: {
    label: "Activity (90d)",
    icon: "bolt",
    description: "Transactions in the last 90 days",
    weight: 0.2,
    format: int,
  },
  avg_tx_value_stx: {
    label: "Avg Tx Value",
    icon: "payments",
    description: "Mean STX moved per transaction",
    weight: 0.1,
    format: (v) => `${v.toLocaleString("en-US", { maximumFractionDigits: 2 })} STX`,
  },
  stacking_cycles: {
    label: "Stacking Cycles",
    icon: "cycle",
    description: "Completed Stacking cycles",
    weight: 0.2,
    format: int,
  },
  stacking_streak: {
    label: "Stacking Streak",
    icon: "local_fire_department",
    description: "Consecutive cycles without interruption",
    weight: 0.15,
    format: (v) => `${int(v)} cycles`,
  },
  usdcx_interactions: {
    label: "Stablecoin Usage",
    icon: "account_balance",
    description: "USDCx send/receive events",
    weight: 0.1,
    format: int,
  },
  defi_protocol_count: {
    label: "DeFi Footprint",
    icon: "hub",
    description: "Distinct DeFi contracts used",
    weight: 0.1,
    format: int,
  },
};

export const FEATURE_ORDER = Object.keys(FEATURE_META) as (keyof WalletFeatures)[];
