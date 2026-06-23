"use client";

import { useEffect, useState } from "react";
import { Button, Icon } from "@/app/components/ui";
import { ConnectWalletButton } from "@/app/components/layout/ConnectWalletButton";
import { useWallet } from "@/lib/wallet/WalletProvider";
import { DEMO_ADDRESS, getScore } from "@/lib/scoring/mockClient";
import type { ScoreResponse } from "@/lib/scoring/types";
import { ScoreGauge } from "./ScoreGauge";
import { FeatureBreakdown } from "./FeatureBreakdown";
import { LoanOffer } from "./LoanOffer";

const TIER_TEXT: Record<string, string> = {
  Prime: "text-tertiary",
  Standard: "text-primary",
  Subprime: "text-error",
};

export function ScoreExperience() {
  const { address } = useWallet();
  const [demo, setDemo] = useState<string | null>(null);
  const target = address ?? demo;

  const [score, setScore] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!target) {
      setScore(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getScore(target)
      .then((res) => !cancelled && setScore(res))
      .catch(() => !cancelled && setError("Could not retrieve a score for this wallet."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [target]);

  // Disconnected — entry prompt
  if (!target) {
    return (
      <div className="glass-panel mx-auto flex max-w-xl flex-col items-center gap-md rounded-xl p-lg text-center">
        <span className="grid size-16 place-items-center rounded-full bg-primary-container/15 text-primary">
          <Icon name="fingerprint" filled className="text-4xl" />
        </span>
        <h2 className="font-display text-headline-md text-on-surface">
          Connect a wallet to get scored
        </h2>
        <p className="max-w-md font-sans text-body-md text-on-surface-variant">
          We read your public Stacks wallet history — activity, Stacking, and
          stablecoin usage — and return a trust score with a simulated loan offer.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-sm">
          <ConnectWalletButton />
          <Button cta variant="ghost" onClick={() => setDemo(DEMO_ADDRESS)}>
            Try a demo wallet
          </Button>
        </div>
      </div>
    );
  }

  const short = `${target.slice(0, 6)}…${target.slice(-4)}`;

  return (
    <div className="flex flex-col gap-lg">
      {/* Scored address */}
      <div className="flex flex-wrap items-center gap-sm">
        <span className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
          Scoring
        </span>
        <span className="rounded-full border border-white/10 bg-surface-container px-3 py-1 font-mono text-mono-sm text-on-surface">
          {short}
        </span>
        {!address && (
          <span className="rounded-full bg-primary/10 px-3 py-1 font-ui text-label-md uppercase text-primary">
            Demo
          </span>
        )}
      </div>

      {loading && (
        <div className="glass-panel flex flex-col items-center gap-md rounded-xl p-lg py-xl">
          <div className="size-52 animate-pulse rounded-full bg-surface-container-high" />
          <p className="font-sans text-body-md text-on-surface-variant">
            Analysing on-chain history…
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="glass-panel rounded-xl p-lg text-center font-sans text-body-md text-error">
          {error}
        </div>
      )}

      {score && !loading && (
        <>
          {/* Result hero: gauge + summary side by side */}
          <div className="glass-panel flex flex-col items-center gap-lg rounded-xl p-md md:flex-row md:items-center md:gap-xl md:p-lg">
            <ScoreGauge score={score.trust_score} tier={score.collateral_tier} />
            <div className="flex flex-1 flex-col items-center gap-sm text-center md:items-start md:text-left">
              <span
                className={`rounded-full border px-3 py-0.5 font-ui text-label-md uppercase ${
                  TIER_TEXT[score.collateral_tier.label] ?? "text-primary"
                }`}
                style={{ borderColor: "currentColor" }}
              >
                {score.collateral_tier.label} tier
              </span>
              <h2 className="font-display text-headline-md text-on-surface">
                Your credit trust score
              </h2>
              <p className="max-w-md font-sans text-body-md text-on-surface-variant">
                A higher score unlocks a lower collateral requirement. At this tier you
                can borrow up to{" "}
                <span className="font-semibold text-on-surface">
                  {score.loan_offer.max_loan_stx.toLocaleString("en-US")} STX
                </span>{" "}
                against {score.collateral_tier.ratio * 100}% collateral.
              </p>
              <p className="font-mono text-mono-sm text-on-surface-variant">
                model {score.model_version}
              </p>
            </div>
          </div>

          <LoanOffer score={score.trust_score} tier={score.collateral_tier} offer={score.loan_offer} />
          <FeatureBreakdown features={score.features} />
        </>
      )}
    </div>
  );
}
