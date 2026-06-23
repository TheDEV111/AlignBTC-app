import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Button, Icon } from "@/app/components/ui";
import { YieldEstimator } from "./YieldEstimator";

export const metadata: Metadata = {
  title: "Staking — AlignBTC",
  description:
    "Participate in consensus and earn Bitcoin yield by locking your STX. Join a pool or stack solo.",
};

const CYCLE_STATS = [
  { label: "Time Remaining", value: "4d 12h", valueClass: "text-on-surface" },
  { label: "Current Yield (APY)", value: "~8.5%", valueClass: "text-primary" },
  { label: "Total STX Locked", value: "452.1M", valueClass: "text-on-surface" },
  { label: "Min Solo Amount", value: "90,000 STX", valueClass: "text-on-surface" },
];

const OPTIONS = [
  {
    icon: "groups",
    iconClass: "bg-secondary-container/20 text-secondary border-secondary/20",
    badge: "Recommended for most",
    title: "Join a Pool",
    body: "Delegate your STX to a trusted pool operator. Earn BTC yield without meeting the high minimum threshold for solo stacking.",
    points: [
      { icon: "check_circle", iconClass: "text-tertiary", text: "No minimum STX required" },
      { icon: "check_circle", iconClass: "text-tertiary", text: "Flexible lock-up periods (1+ cycles)" },
      { icon: "check_circle", iconClass: "text-tertiary", text: "Pool operator takes a small fee" },
    ],
    cta: "Browse Pools",
  },
  {
    icon: "person",
    iconClass: "bg-primary-container/20 text-primary border-primary/20",
    badge: "Advanced",
    title: "Stack Solo",
    body: "Run your own node or meet the minimum threshold to participate directly in consensus. Keep 100% of your BTC rewards.",
    points: [
      { icon: "warning", iconClass: "text-error", text: "Minimum 90,000 STX required" },
      { icon: "check_circle", iconClass: "text-tertiary", text: "Receive BTC directly to your wallet" },
      { icon: "check_circle", iconClass: "text-tertiary", text: "Zero fees, keep all rewards" },
    ],
    cta: "Setup Solo Stacking",
  },
];

export default function StakingPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Staking" showSearch searchPlaceholder="Search..." />

      <main className="mx-auto flex w-full max-w-page grow flex-col gap-xl px-sm py-xl md:px-xl">
        {/* Header */}
        <section className="flex flex-col items-start justify-between gap-md md:flex-row md:items-end">
          <div>
            <h1 className="mb-xs font-display text-display-lg text-on-surface">Stack &amp; Earn</h1>
            <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
              Participate in consensus and earn Bitcoin yield by locking your STX.
              Choose between joining a pool or stacking solo depending on your
              holdings.
            </p>
          </div>
          <div className="flex gap-sm">
            <Button variant="secondary" size="sm">
              <Icon name="history" className="text-sm" />
              History
            </Button>
            <Button size="sm">Start Stacking</Button>
          </div>
        </section>

        {/* Current cycle */}
        <section className="glass-panel relative overflow-hidden rounded-xl p-md md:p-lg">
          <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative z-10 w-full">
            <div className="mb-sm flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-headline-sm text-on-surface">
                <Icon name="cycle" className="text-primary" />
                Cycle #84
              </h2>
              <span className="rounded-full border border-tertiary/20 bg-tertiary/10 px-3 py-1 font-mono text-mono-sm text-tertiary-fixed-dim">
                Active
              </span>
            </div>

            <div className="mb-sm">
              <div className="mb-2 flex justify-between font-ui text-label-md text-on-surface-variant">
                <span>Progress</span>
                <span>65% Complete</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="h-full rounded-full bg-linear-to-r from-primary-container to-primary" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="mt-md grid grid-cols-2 gap-md md:grid-cols-4">
              {CYCLE_STATS.map((s) => (
                <div key={s.label}>
                  <p className="mb-1 font-ui text-label-md uppercase text-on-surface-variant">
                    {s.label}
                  </p>
                  <p className={`font-display text-headline-md ${s.valueClass}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stacking options */}
        <section className="grid grid-cols-1 gap-md lg:grid-cols-2">
          {OPTIONS.map((opt) => (
            <div
              key={opt.title}
              className="glass-panel flex h-full flex-col rounded-xl border-t border-white/5 bg-linear-to-b from-surface-container-high/50 to-transparent p-md md:p-lg"
            >
              <div className="mb-md flex items-start justify-between">
                <span className={`rounded-lg border p-3 ${opt.iconClass}`}>
                  <Icon name={opt.icon} className="text-2xl" />
                </span>
                <span className="rounded bg-surface-container px-2 py-1 font-ui text-label-md text-on-surface-variant">
                  {opt.badge}
                </span>
              </div>

              <h3 className="mb-2 font-display text-headline-md text-on-surface">{opt.title}</h3>
              <p className="mb-lg grow font-sans text-body-md text-on-surface-variant">
                {opt.body}
              </p>

              <ul className="mb-lg space-y-3">
                {opt.points.map((pt) => (
                  <li
                    key={pt.text}
                    className="flex items-center gap-3 font-sans text-body-sm text-on-surface"
                  >
                    <Icon name={pt.icon} className={`text-sm ${pt.iconClass}`} />
                    {pt.text}
                  </li>
                ))}
              </ul>

              <Button variant="secondary" className="w-full">
                {opt.cta}
              </Button>
            </div>
          ))}
        </section>

        {/* Yield estimator */}
        <YieldEstimator />
      </main>

      <SiteFooter />
    </div>
  );
}
