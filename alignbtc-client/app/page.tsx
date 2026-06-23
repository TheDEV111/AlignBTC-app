import { Button, Icon } from "@/app/components/ui";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

const CLARITY_SNIPPET = `(define-read-only (get-collateral-ratio
    (trust-score uint))
  (if (> trust-score u70)
    u100   ;; prime
    (if (>= trust-score u40)
      u120   ;; standard
      u150)));; subprime`;

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader />

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="mx-auto flex w-full max-w-page flex-col gap-xl px-sm pt-32 pb-xl md:px-xl">
        {/* Hero */}
        <section className="fade-in-up flex min-h-[70vh] flex-col items-center justify-center gap-lg text-center">
          <div className="mb-sm inline-flex items-center gap-xs rounded-full border border-white/10 bg-surface px-sm py-base">
            <span className="size-2 animate-pulse rounded-full bg-stacks" />
            <span className="font-mono text-mono-sm text-on-surface-variant">
              Live on Stacks Testnet
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-display-lg text-on-surface md:text-[72px] md:leading-[80px]">
            Borrow more. <br />
            <span className="bg-linear-to-r from-stacks to-[#ff8c00] bg-clip-text text-transparent">
              Lock less.
            </span>
          </h1>

          <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
            AlignBTC reads your on-chain Stacks history and returns an AI trust
            score (0&ndash;100) &mdash; so a stronger wallet unlocks
            under-collateralised loans on Bitcoin DeFi.
          </p>

          <div className="mt-sm flex flex-col gap-md sm:flex-row">
            <Button cta href="/score">
              Get your score
              <Icon name="arrow_forward" filled />
            </Button>
            <Button cta variant="secondary" href="/docs">
              How it works
            </Button>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="fade-in-up delay-200 grid grid-cols-1 gap-gutter md:grid-cols-3">
          {/* Large Card — Bitcoin Finality */}
          <div className="group glass-panel hover-lift relative col-span-1 flex min-h-[320px] flex-col overflow-hidden rounded-xl md:col-span-2 md:flex-row md:items-stretch">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-stacks/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Text column — vertically centered so the copy fills, not stretches */}
            <div className="z-10 flex flex-col justify-center p-lg md:basis-1/2">
              <Icon name="neurology" filled className="mb-sm text-4xl text-stacks" />
              <h3 className="mb-xs font-display text-display-sm text-on-surface">
                AI Trust Score
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant">
                We turn your transaction history, Stacking participation, and
                stablecoin usage into a single 0&ndash;100 creditworthiness score
                &mdash; the credit signal Bitcoin DeFi never had.
              </p>
            </div>

            {/* Visual column — interlocking blocks rendered as glowing layers */}
            <div
              aria-hidden
              className="relative hidden items-center justify-center overflow-hidden md:flex md:basis-1/2"
            >
              <div className="pointer-events-none absolute -right-16 -bottom-16 size-64 rotate-12 rounded-3xl bg-linear-to-br from-stacks/30 to-transparent opacity-40 blur-2xl mix-blend-screen" />
              <div className="relative size-40">
                <div className="absolute inset-0 rotate-6 rounded-2xl border border-white/10 bg-surface-container/60 backdrop-blur-sm" />
                <div className="absolute inset-0 -rotate-6 rounded-2xl border border-stacks/40 bg-stacks/5 primary-glow" />
                <div className="absolute inset-0 grid place-items-center">
                  <Icon name="currency_bitcoin" filled className="text-6xl text-stacks" />
                </div>
              </div>
            </div>
          </div>

          {/* Small Card 1 — Sub-second Tx */}
          <div className="group glass-panel hover-lift relative flex flex-col overflow-hidden rounded-xl p-lg">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-tertiary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon name="trending_down" filled className="mb-sm text-3xl text-tertiary" />
            <h3 className="mb-xs font-display text-headline-md text-on-surface">
              Lower collateral
            </h3>
            <p className="font-sans text-body-sm text-on-surface-variant">
              A higher score cuts what you must lock &mdash; from 150% down to
              120%, or just 100% for prime wallets. Capital efficiency on Bitcoin.
            </p>
          </div>

          {/* Small Card 2 — sBTC Native */}
          <div className="group glass-panel hover-lift relative flex flex-col overflow-hidden rounded-xl p-lg">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-secondary-container/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon name="verified_user" filled className="mb-sm text-3xl text-secondary" />
            <h3 className="mb-xs font-display text-headline-md text-on-surface">
              No KYC. On-chain.
            </h3>
            <p className="font-sans text-body-sm text-on-surface-variant">
              Your score is computed only from public Stacks activity &mdash;
              auditable, permissionless, and never tied to off-chain identity.
            </p>
          </div>

          {/* Wide Card — Clarity Smart Contracts */}
          <div className="glass-panel hover-lift col-span-1 flex flex-col items-center justify-between gap-lg rounded-xl p-lg sm:flex-row md:col-span-2">
            <div>
              <h3 className="mb-xs font-display text-display-sm text-on-surface">
                Enforced on-chain
              </h3>
              <p className="mb-sm font-sans text-body-md text-on-surface-variant">
                Your collateral tier isn&apos;t a promise &mdash; it&apos;s priced
                by a Clarity escrow contract live on Stacks testnet.
              </p>
              <Button
                cta
                variant="ghost"
                href="/docs"
                className="px-0 py-0 text-stacks hover:text-white"
              >
                View the contract
                <Icon name="arrow_outward" className="text-sm" />
              </Button>
            </div>
            <pre className="w-full overflow-x-auto rounded-lg border border-white/10 bg-surface p-sm font-mono text-mono-sm text-tertiary shadow-inner sm:w-auto">
              {CLARITY_SNIPPET}
            </pre>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
