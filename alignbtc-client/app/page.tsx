import { Button, Icon } from "@/app/components/ui";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

const CLARITY_SNIPPET = `(define-public (transfer
  (amount uint)
  (sender principal)
  (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender)
      ERR-NOT-AUTHORIZED)
    (ft-transfer? my-token amount
      sender recipient)
  )
)`;

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
              Nakamoto Release Live
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-display-lg text-on-surface md:text-[72px] md:leading-[80px]">
            DeFi on Bitcoin. <br />
            <span className="bg-linear-to-r from-stacks to-[#ff8c00] bg-clip-text text-transparent">
              Unleashed.
            </span>
          </h1>

          <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
            Experience the security of Bitcoin with the speed of Stacks. Build,
            trade, and earn in the most robust decentralized economy on the
            planet.
          </p>

          <div className="mt-sm flex flex-col gap-md sm:flex-row">
            <Button cta href="/dashboard">
              Start Building
              <Icon name="arrow_forward" filled />
            </Button>
            <Button cta variant="secondary" href="/docs">
              Read Docs
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
              <Icon name="shield_locked" filled className="mb-sm text-4xl text-stacks" />
              <h3 className="mb-xs font-display text-display-sm text-on-surface">
                Bitcoin Finality
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant">
                Every transaction on the Stacks layer is settled on the Bitcoin
                blockchain. Your assets are protected by the most secure computing
                network in history.
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
            <Icon name="bolt" filled className="mb-sm text-3xl text-tertiary" />
            <h3 className="mb-xs font-display text-headline-md text-on-surface">
              Sub-second Tx
            </h3>
            <p className="font-sans text-body-sm text-on-surface-variant">
              The Nakamoto upgrade brings fast blocks, enabling seamless UX for
              DeFi applications without compromising on base-layer security.
            </p>
          </div>

          {/* Small Card 2 — sBTC Native */}
          <div className="group glass-panel hover-lift relative flex flex-col overflow-hidden rounded-xl p-lg">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-secondary-container/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon name="currency_bitcoin" filled className="mb-sm text-3xl text-secondary" />
            <h3 className="mb-xs font-display text-headline-md text-on-surface">
              sBTC Native
            </h3>
            <p className="font-sans text-body-sm text-on-surface-variant">
              Move Bitcoin in and out of the Stacks layer trustlessly. Deploy your
              dormant BTC into productive decentralized finance protocols.
            </p>
          </div>

          {/* Wide Card — Clarity Smart Contracts */}
          <div className="glass-panel hover-lift col-span-1 flex flex-col items-center justify-between gap-lg rounded-xl p-lg sm:flex-row md:col-span-2">
            <div>
              <h3 className="mb-xs font-display text-display-sm text-on-surface">
                Clarity Smart Contracts
              </h3>
              <p className="mb-sm font-sans text-body-md text-on-surface-variant">
                Decidable, uncompiled, and secure by design. Read exactly what the
                contract does before execution.
              </p>
              <Button
                cta
                variant="ghost"
                className="px-0 py-0 text-stacks hover:text-white"
              >
                Explore Clarity
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
