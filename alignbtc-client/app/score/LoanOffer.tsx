"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/app/components/ui";
import {
  quoteCollateralOnChain,
  UNDERWRITER_CONTRACT_ID,
  UNDERWRITER_EXPLORER_URL,
} from "@/lib/contract/underwriter";
import type { CollateralTier, LoanOffer as LoanOfferType } from "@/lib/scoring/types";

type VerifyState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "ok"; onchain: number; matches: boolean }
  | { status: "error" };

export function LoanOffer({
  score,
  tier,
  offer,
}: {
  score: number;
  tier: CollateralTier;
  offer: LoanOfferType;
}) {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [verify, setVerify] = useState<VerifyState>({ status: "idle" });

  const ratioPct = Math.round(tier.ratio * 100);
  const localRequired = Math.round(loanAmount * tier.ratio);

  // Verify the required-collateral figure against the on-chain contract.
  useEffect(() => {
    if (loanAmount <= 0) return;
    let cancelled = false;
    setVerify({ status: "checking" });
    const t = setTimeout(async () => {
      try {
        const onchain = await quoteCollateralOnChain(loanAmount, score);
        if (!cancelled) setVerify({ status: "ok", onchain, matches: onchain === localRequired });
      } catch {
        if (!cancelled) setVerify({ status: "error" });
      }
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [loanAmount, score, localRequired]);

  return (
    <div className="glass-panel rounded-xl p-md md:p-lg">
      <h2 className="mb-md flex items-center gap-sm font-display text-headline-md text-on-surface">
        <Icon name="request_quote" className="text-primary" />
        Simulated loan offer
      </h2>

      <div className="grid gap-md md:grid-cols-3">
        <div className="rounded-lg border border-white/5 bg-surface-container-lowest p-md">
          <p className="font-ui text-label-md uppercase text-on-surface-variant">Collateral ratio</p>
          <p className="font-display text-display-sm text-primary">{ratioPct}%</p>
          <p className="font-sans text-body-sm text-on-surface-variant">{tier.label} tier</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-surface-container-lowest p-md">
          <p className="font-ui text-label-md uppercase text-on-surface-variant">Collateral held</p>
          <p className="font-display text-display-sm text-on-surface">
            {offer.collateral_held_stx.toLocaleString("en-US")}
          </p>
          <p className="font-sans text-body-sm text-on-surface-variant">STX (simulated)</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-surface-container-lowest p-md">
          <p className="font-ui text-label-md uppercase text-on-surface-variant">Max borrow</p>
          <p className="font-display text-display-sm text-tertiary">
            {offer.max_loan_stx.toLocaleString("en-US")}
          </p>
          <p className="font-sans text-body-sm text-on-surface-variant">STX at this tier</p>
        </div>
      </div>

      {/* Interactive quote, verified on-chain */}
      <div className="mt-md rounded-lg border border-white/5 bg-surface-container-lowest p-md">
        <label htmlFor="loan-amount" className="font-ui text-label-md uppercase text-on-surface-variant">
          Simulate a loan — I want to borrow
        </label>
        <div className="mt-2 flex flex-col gap-sm sm:flex-row sm:items-center">
          <div className="relative sm:w-56">
            <input
              id="loan-amount"
              type="number"
              min={0}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value) || 0))}
              className="input-dark w-full rounded-lg px-sm py-3 font-mono text-on-surface focus:ring-0"
            />
            <span className="absolute right-4 top-3 font-ui text-label-md text-on-surface-variant">
              STX
            </span>
          </div>
          <Icon name="arrow_forward" className="hidden text-on-surface-variant sm:block" />
          <div className="flex-1">
            <p className="font-sans text-body-sm text-on-surface-variant">Required collateral</p>
            <p className="font-display text-headline-md text-on-surface">
              {localRequired.toLocaleString("en-US")} STX
            </p>
          </div>
        </div>

        {/* On-chain verification badge */}
        <div className="mt-sm flex items-center gap-2 font-mono text-mono-sm">
          {verify.status === "checking" && (
            <span className="flex items-center gap-1 text-on-surface-variant">
              <Icon name="sync" className="animate-spin text-sm" />
              Verifying against testnet…
            </span>
          )}
          {verify.status === "ok" && (
            <span className={`flex items-center gap-1 ${verify.matches ? "text-tertiary" : "text-error"}`}>
              <Icon name={verify.matches ? "verified" : "error"} className="text-sm" />
              {verify.matches
                ? "Verified on-chain"
                : `On-chain says ${verify.onchain.toLocaleString("en-US")} STX`}
            </span>
          )}
          {verify.status === "error" && (
            <span className="flex items-center gap-1 text-on-surface-variant">
              <Icon name="cloud_off" className="text-sm" />
              Could not reach the contract
            </span>
          )}
          <a
            href={UNDERWRITER_EXPLORER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto truncate text-on-surface-variant transition-colors hover:text-primary"
            title={UNDERWRITER_CONTRACT_ID}
          >
            {UNDERWRITER_CONTRACT_ID.split(".")[1]} ↗
          </a>
        </div>
      </div>

      <p className="mt-sm font-sans text-body-sm text-on-surface-variant">
        Testnet proof-of-concept. No funds move — terms are priced by the on-chain{" "}
        <code className="font-mono text-mono-sm text-primary">initiate-loan</code> stub.
      </p>
    </div>
  );
}
