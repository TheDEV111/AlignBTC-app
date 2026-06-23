"use client";

import { useState } from "react";

// Mock market constants — tuned so the defaults (10,000 STX / 6 cycles)
// reproduce the design's reference figures (~0.0142 BTC ≈ $852.40, 8.5% APY).
const DAYS_PER_CYCLE = 14;
const STX_PER_BTC = 13775;
const BTC_PRICE_USD = 60028;

/** Longer locks earn a slightly higher effective APY (8.5% at 6 cycles). */
function apyForCycles(cycles: number) {
  return 7 + cycles * 0.25;
}

export function YieldEstimator() {
  const [amount, setAmount] = useState(10000);
  const [cycles, setCycles] = useState(6);

  const apy = apyForCycles(cycles);
  const rewardStx = amount * (apy / 100) * ((cycles * DAYS_PER_CYCLE) / 365);
  const rewardBtc = rewardStx / STX_PER_BTC;
  const rewardUsd = rewardBtc * BTC_PRICE_USD;

  return (
    <section className="glass-panel rounded-xl border-t border-white/5 p-md md:p-lg">
      <h3 className="mb-xs font-display text-headline-md text-on-surface">Yield Estimator</h3>
      <p className="mb-lg font-sans text-body-sm text-on-surface-variant">
        Calculate your potential BTC returns based on current network conditions.
      </p>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        {/* Inputs */}
        <div className="space-y-md md:col-span-2">
          <div>
            <label
              htmlFor="stx-amount"
              className="mb-2 block font-ui text-label-md uppercase text-on-surface-variant"
            >
              STX Amount
            </label>
            <div className="relative">
              <input
                id="stx-amount"
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                placeholder="0"
                className="w-full rounded-lg border border-white/10 bg-surface-container-lowest px-4 py-3 font-mono text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="absolute right-4 top-3 font-ui text-label-md text-on-surface-variant">
                STX
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="lock-cycles"
              className="mb-2 block font-ui text-label-md uppercase text-on-surface-variant"
            >
              Lock Duration (Cycles)
            </label>
            <div className="flex items-center gap-4">
              <input
                id="lock-cycles"
                type="range"
                min={1}
                max={12}
                value={cycles}
                onChange={(e) => setCycles(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-primary"
              />
              <span className="w-12 text-right font-mono text-mono-sm text-on-surface">{cycles}</span>
            </div>
            <div className="mt-2 flex justify-between font-ui text-label-md text-on-surface-variant/50">
              <span>1 Cycle (~14 days)</span>
              <span>12 Cycles (~6 months)</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center rounded-lg border border-white/5 bg-surface-container-lowest p-md">
          <p className="mb-sm text-center font-ui text-label-md uppercase text-on-surface-variant">
            Estimated Rewards
          </p>
          <div className="mb-4 text-center">
            <span className="font-display text-display-sm text-primary">{rewardBtc.toFixed(4)}</span>{" "}
            <span className="font-display text-headline-sm text-on-surface">BTC</span>
          </div>
          <div className="text-center font-sans text-body-sm text-on-surface-variant">
            ≈ ${rewardUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
          </div>
          <div className="mt-md border-t border-white/10 pt-md text-center">
            <p className="mb-1 font-ui text-label-md text-on-surface-variant">Effective APY</p>
            <p className="font-mono text-mono-sm text-tertiary">{apy.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
