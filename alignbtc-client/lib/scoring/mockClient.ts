import type { ScoreResponse, WalletFeatures } from "./types";
import { tierForScore } from "./types";

// Deterministic mock scoring service. Returns the same score for the same
// address so the UI is stable, until the real FastAPI service exists.
// Swap-out point: getScore() will hit NEXT_PUBLIC_SCORING_API_URL when set.

function seedFromAddress(addr: string): number {
  let h = 2166136261;
  for (let i = 0; i < addr.length; i++) {
    h ^= addr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Reference maxima used to normalise each feature to 0..1 for scoring.
const REFERENCE: Record<keyof WalletFeatures, number> = {
  tx_count_90d: 400,
  avg_tx_value_stx: 500,
  stacking_cycles: 12,
  stacking_streak: 12,
  usdcx_interactions: 150,
  wallet_age_days: 1200,
  defi_protocol_count: 15,
};

const WEIGHTS: Record<keyof WalletFeatures, number> = {
  tx_count_90d: 0.2,
  avg_tx_value_stx: 0.1,
  stacking_cycles: 0.2,
  stacking_streak: 0.15,
  usdcx_interactions: 0.1,
  wallet_age_days: 0.15,
  defi_protocol_count: 0.1,
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function buildScore(address: string): ScoreResponse {
  const rand = mulberry32(seedFromAddress(address));

  const cycles = Math.round(rand() * REFERENCE.stacking_cycles);
  const features: WalletFeatures = {
    tx_count_90d: Math.round(rand() * REFERENCE.tx_count_90d),
    avg_tx_value_stx: Math.round(rand() * REFERENCE.avg_tx_value_stx * 100) / 100,
    stacking_cycles: cycles,
    stacking_streak: Math.round(rand() * cycles), // streak <= cycles
    usdcx_interactions: Math.round(rand() * REFERENCE.usdcx_interactions),
    wallet_age_days: Math.round(rand() * REFERENCE.wallet_age_days),
    defi_protocol_count: Math.round(rand() * REFERENCE.defi_protocol_count),
  };

  const trust_score = Math.round(
    (Object.keys(WEIGHTS) as (keyof WalletFeatures)[]).reduce(
      (sum, k) => sum + WEIGHTS[k] * clamp01(features[k] / REFERENCE[k]),
      0,
    ) * 100,
  );

  const tier = tierForScore(trust_score);
  const collateral_held_stx = Math.round(features.avg_tx_value_stx * 20 + 1000);

  return {
    address,
    trust_score,
    features,
    collateral_tier: tier,
    loan_offer: {
      collateral_held_stx,
      max_loan_stx: Math.floor(collateral_held_stx / tier.ratio),
    },
    model_version: "rf-mock-0.1",
  };
}

/** Demo address for reviewers without a wallet (scores ~prime). */
export const DEMO_ADDRESS = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";

const API_URL = process.env.NEXT_PUBLIC_SCORING_API_URL;

export async function getScore(address: string): Promise<ScoreResponse> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/score?address=${encodeURIComponent(address)}`);
    if (!res.ok) throw new Error(`Scoring service error: ${res.status}`);
    return (await res.json()) as ScoreResponse;
  }
  // Mock path — small latency so the loading state is exercised.
  await new Promise((r) => setTimeout(r, 600));
  return buildScore(address);
}
