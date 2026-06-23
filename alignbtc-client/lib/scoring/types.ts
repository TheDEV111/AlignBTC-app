// The off-chain scoring API contract — shared shape between the FastAPI
// service, the in-app mock, and the UI. Mirrors PRD §5.3 / §5.6.

export interface WalletFeatures {
  tx_count_90d: number;
  avg_tx_value_stx: number;
  stacking_cycles: number;
  stacking_streak: number;
  usdcx_interactions: number;
  wallet_age_days: number;
  defi_protocol_count: number;
}

export type CollateralRatio = 1.0 | 1.2 | 1.5;

export interface CollateralTier {
  ratio: CollateralRatio; // 1.0 / 1.2 / 1.5 — matches the on-chain contract (100/120/150%)
  label: string;
}

export interface LoanOffer {
  collateral_held_stx: number; // simulated wallet collateral
  max_loan_stx: number; // collateral_held / ratio
}

export interface ScoreResponse {
  address: string;
  trust_score: number; // 0–100
  features: WalletFeatures;
  collateral_tier: CollateralTier;
  loan_offer: LoanOffer;
  model_version: string;
}

/** Trust score → collateral tier. Must stay in lockstep with the Clarity contract. */
export function tierForScore(score: number): CollateralTier {
  if (score > 70) return { ratio: 1.0, label: "Prime" };
  if (score >= 40) return { ratio: 1.2, label: "Standard" };
  return { ratio: 1.5, label: "Subprime" };
}
