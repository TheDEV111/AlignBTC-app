import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Icon } from "@/app/components/ui";
import { FEATURE_META, FEATURE_ORDER } from "@/lib/scoring/features";
import { UNDERWRITER_CONTRACT_ID, UNDERWRITER_EXPLORER_URL } from "@/lib/contract/underwriter";

export const metadata: Metadata = {
  title: "Docs — AlignBTC",
  description:
    "How AlignBTC works: AI on-chain credit scoring for Bitcoin DeFi on Stacks — architecture, trust score, collateral tiers, and the testnet contract.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "architecture", label: "How It Works" },
  { id: "trust-score", label: "Trust Score" },
  { id: "collateral-tiers", label: "Collateral Tiers" },
  { id: "contract", label: "Smart Contract" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "roadmap", label: "Roadmap" },
  { id: "faq", label: "FAQ" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/5 pt-lg first:border-t-0 first:pt-0">
      <h2 className="mb-sm font-display text-headline-md text-on-surface">{title}</h2>
      <div className="space-y-sm font-sans text-body-md text-on-surface-variant">{children}</div>
    </section>
  );
}

const ARCHITECTURE = [
  {
    icon: "database",
    title: "1 · Data pipeline (Python)",
    body: "Aggregates on-chain wallet metrics from the Stacks Extended API — full transaction history, Stacking participation, and USDCx stablecoin transfers — into a feature vector per address.",
  },
  {
    icon: "neurology",
    title: "2 · ML scoring engine (scikit-learn)",
    body: "A Random Forest classifier (max_depth 6, 100 estimators, 5-fold CV) trained on labelled wallet profiles outputs a probability normalised to a 0–100 trust score. Target AUC-ROC ≥ 0.72.",
  },
  {
    icon: "captive_portal",
    title: "3 · Presentation (Next.js + Clarity)",
    body: "A FastAPI service serves the score as JSON. This frontend renders the score, feature breakdown, and a simulated loan offer — priced by a Clarity escrow stub deployed on Stacks testnet.",
  },
];

const TIERS = [
  { range: "Below 40", ratio: "150%", label: "Subprime", tone: "text-error" },
  { range: "40 – 70", ratio: "120%", label: "Standard", tone: "text-primary" },
  { range: "Above 70", ratio: "100%", label: "Prime", tone: "text-tertiary" },
];

const TECH = [
  { area: "Data pipeline", stack: "Python 3.11 · pandas · requests · scikit-learn" },
  { area: "Model serving", stack: "FastAPI — REST endpoint returning the trust score as JSON" },
  { area: "Smart contract", stack: "Clarity · Clarinet CLI · Stacks testnet" },
  { area: "Frontend", stack: "Next.js · TypeScript · Tailwind CSS · Stacks.js" },
  { area: "Deployment", stack: "Vercel (web) · Railway/Render (API) · GitHub (MIT)" },
];

const ROADMAP = [
  {
    ms: "M1",
    weeks: "Weeks 1–4",
    title: "Data pipeline & dataset",
    body: "Parsing scripts aggregating wallet metrics; an exported labelled dataset of ≥ 500 records.",
  },
  {
    ms: "M2",
    weeks: "Weeks 5–8",
    title: "Trained model & serving",
    body: "Random Forest producing a 0–100 score with AUC-ROC ≥ 0.72; FastAPI scoring service. (50% tranche.)",
  },
  {
    ms: "M3",
    weeks: "Weeks 9–12",
    title: "Frontend, contract & demo",
    body: "Leather wallet integration showing score + simulated loan offer; Clarity escrow stub on testnet; demo video. (Final tranche.)",
  },
];

const FAQ = [
  {
    q: "Is this live on mainnet with real funds?",
    a: "No. This is a testnet proof-of-concept. No mainnet loan origination or capital deployment happens in the grant period — and no funds move in the contract stub.",
  },
  {
    q: "Does AlignBTC use KYC or off-chain identity?",
    a: "No. Scoring uses purely public, on-chain Stacks signals — there is no identity or KYC integration.",
  },
  {
    q: "Which chains are supported?",
    a: "Stacks only. Non-Stacks chains and sBTC bridge interactions are out of scope for this grant.",
  },
  {
    q: "Is this a lending protocol?",
    a: "No — it is a scoring primitive. The goal is infrastructure any Stacks lending protocol (e.g. Zest, Granite) could integrate to offer differentiated collateral requirements.",
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Docs" />

      <main className="mx-auto w-full max-w-page flex-1 px-sm pt-32 pb-xl md:px-xl">
        <header className="mb-lg flex flex-col gap-sm">
          <span className="font-ui text-label-md uppercase tracking-wider text-primary">
            Documentation
          </span>
          <h1 className="font-display text-display-lg text-on-surface">
            How AlignBTC works
          </h1>
          <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
            An AI-native credit-risk underwriter for Bitcoin DeFi. It scores a
            borrower&apos;s on-chain Stacks history to unlock capital-efficient,
            under-collateralised lending — built for the Stacks Endowment grant.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-xl lg:grid-cols-[200px_1fr]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 flex flex-col gap-1">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-lg px-sm py-2 font-sans text-body-sm text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="max-w-3xl space-y-lg">
            <Section id="overview" title="Overview">
              <p>
                Stacks-based lending protocols today require heavy
                over-collateralisation because no on-chain credit profiling exists.
                AlignBTC closes that gap: a machine-learning model parses a wallet&apos;s
                historical behaviour — transaction frequency, Stacking participation,
                and stablecoin usage — to generate an autonomous{" "}
                <span className="text-primary">trust score (0–100)</span>.
              </p>
              <p>
                That score is surfaced here and connected to a Clarity escrow contract
                on testnet, demonstrating a credible path to under-collateralised
                micro-lending on Bitcoin and increasing capital efficiency across sBTC
                markets.
              </p>
            </Section>

            <Section id="problem" title="The Problem">
              <p>
                Bitcoin DeFi on Stacks is structurally constrained by the absence of
                native credit infrastructure. Current protocols operate fully
                collateralised — borrowers must lock sBTC or STX worth more than the
                loan. This:
              </p>
              <ul className="ml-md list-disc space-y-1">
                <li>Excludes users with strong repayment histories but little collateral</li>
                <li>Locks capital inefficiently, reducing the velocity of sBTC</li>
                <li>Makes micro-lending economically unviable at current ratios</li>
              </ul>
              <p>
                The data exists — every Stacks address has a public, auditable history —
                but no tooling aggregates and scores it in a lending-relevant format.
              </p>
            </Section>

            <Section id="architecture" title="How It Works">
              <p>Three independently testable layers turn wallet history into a loan offer:</p>
              <div className="grid gap-md sm:grid-cols-3">
                {ARCHITECTURE.map((layer) => (
                  <div key={layer.title} className="glass-panel rounded-xl p-md">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary-container/15 text-primary">
                      <Icon name={layer.icon} />
                    </span>
                    <h3 className="mt-sm font-display text-headline-sm text-on-surface">
                      {layer.title}
                    </h3>
                    <p className="mt-1 font-sans text-body-sm text-on-surface-variant">
                      {layer.body}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="trust-score" title="Trust Score">
              <p>
                The model encodes each wallet as a feature vector across seven
                dimensions. Each contributes a weighted share of the final score:
              </p>
              <div className="grid gap-sm sm:grid-cols-2">
                {FEATURE_ORDER.map((key) => {
                  const meta = FEATURE_META[key];
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-sm rounded-lg border border-white/5 bg-surface-container-lowest p-sm"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-container/15 text-primary">
                        <Icon name={meta.icon} className="text-base" />
                      </span>
                      <div>
                        <p className="font-display text-headline-sm text-on-surface">
                          {meta.label}{" "}
                          <span className="font-ui text-label-md text-on-surface-variant">
                            · {Math.round(meta.weight * 100)}%
                          </span>
                        </p>
                        <p className="font-sans text-body-sm text-on-surface-variant">
                          {meta.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="collateral-tiers" title="Collateral Tiers">
              <p>
                The trust score maps to a required collateral ratio. A higher score
                unlocks a lower requirement — the core of the capital-efficiency thesis.
                These tiers are enforced on-chain.
              </p>
              <div className="overflow-hidden rounded-xl border border-white/8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container/50 font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                      <th className="p-sm">Trust score</th>
                      <th className="p-sm">Collateral</th>
                      <th className="p-sm">Tier</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-mono-sm">
                    {TIERS.map((t) => (
                      <tr key={t.range} className="border-t border-white/5">
                        <td className="p-sm text-on-surface">{t.range}</td>
                        <td className={`p-sm font-bold ${t.tone}`}>{t.ratio}</td>
                        <td className="p-sm text-on-surface-variant">{t.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="contract" title="Smart Contract">
              <p>
                A Clarity escrow stub is deployed on Stacks testnet. Its{" "}
                <code className="font-mono text-mono-sm text-primary">initiate-loan</code>{" "}
                function accepts a trust score and enforces the tiered collateral above;{" "}
                <code className="font-mono text-mono-sm text-primary">quote-collateral</code>{" "}
                prices a loan without writing state. No funds move — this is a
                read-only/parameter-reading MVP; full escrow logic is post-grant.
              </p>
              <div className="glass-panel rounded-xl p-md">
                <p className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                  Deployed contract
                </p>
                <p className="mt-1 break-all font-mono text-mono-sm text-on-surface">
                  {UNDERWRITER_CONTRACT_ID}
                </p>
                <a
                  href={UNDERWRITER_EXPLORER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-sm inline-flex items-center gap-1 font-ui text-label-md uppercase tracking-wider text-primary hover:underline"
                >
                  View on explorer <Icon name="open_in_new" className="text-sm" />
                </a>
              </div>
            </Section>

            <Section id="tech-stack" title="Tech Stack">
              <div className="overflow-hidden rounded-xl border border-white/8">
                <table className="w-full text-left">
                  <tbody className="font-sans text-body-sm">
                    {TECH.map((row) => (
                      <tr key={row.area} className="border-t border-white/5 first:border-t-0">
                        <td className="w-40 p-sm font-display text-headline-sm text-on-surface">
                          {row.area}
                        </td>
                        <td className="p-sm font-mono text-mono-sm text-on-surface-variant">
                          {row.stack}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="roadmap" title="Roadmap">
              <div className="space-y-md">
                {ROADMAP.map((m) => (
                  <div key={m.ms} className="flex gap-md">
                    <div className="flex flex-col items-center">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-container/15 font-display text-headline-sm text-primary">
                        {m.ms}
                      </span>
                    </div>
                    <div>
                      <p className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                        {m.weeks}
                      </p>
                      <p className="font-display text-headline-sm text-on-surface">{m.title}</p>
                      <p className="font-sans text-body-sm text-on-surface-variant">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="faq" title="FAQ">
              <div className="space-y-md">
                {FAQ.map((item) => (
                  <div key={item.q}>
                    <p className="font-display text-headline-sm text-on-surface">{item.q}</p>
                    <p className="font-sans text-body-md text-on-surface-variant">{item.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
