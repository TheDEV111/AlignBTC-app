import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Button, Icon } from "@/app/components/ui";
import { SubmitProposal } from "./SubmitProposal";
import { ProposalsList } from "./ProposalsList";

export const metadata: Metadata = {
  title: "Governance — AlignBTC",
  description:
    "Shape the future of the Stacks ecosystem. Participate in on-chain voting and submit proposals to guide protocol upgrades.",
};

const STATS = [
  {
    label: "Active Proposals",
    icon: "how_to_vote",
    value: "12",
    footer: <span className="mt-1 font-sans text-body-sm text-tertiary">+3 this week</span>,
  },
  {
    label: "Total Stacks Voted",
    icon: "account_balance_wallet",
    value: (
      <>
        45.2M <span className="font-display text-headline-sm text-on-surface-variant">STX</span>
      </>
    ),
    footer: <span className="mt-1 font-sans text-body-sm text-on-surface-variant">~ $85.4M USD</span>,
  },
  {
    label: "Treasury Balance",
    icon: "savings",
    value: (
      <>
        120M <span className="font-display text-headline-sm text-on-surface-variant">STX</span>
      </>
    ),
    footer: (
      <div className="mt-3 h-1.5 w-full rounded-full border border-white/5 bg-surface-container-lowest">
        <div className="h-1.5 w-[45%] rounded-full bg-primary" />
      </div>
    ),
  },
];

const ACTIVITY = [
  {
    addr: "SP3K...9A2",
    vote: "FOR",
    voteClass: "text-primary",
    sip: "SIP-025",
    meta: "2 mins ago • 150k STX",
  },
  {
    addr: "SP1X...8R4",
    vote: "AGAINST",
    voteClass: "text-on-surface-variant",
    sip: "SIP-026",
    meta: "15 mins ago • 45k STX",
  },
];

export default function GovernancePage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Governance" showSearch searchPlaceholder="Search proposals..." />

      <main className="mx-auto w-full max-w-page grow px-sm pt-32 pb-xl md:px-xl">
        {/* Header */}
        <header className="mb-xl flex flex-col items-start justify-between gap-md md:flex-row md:items-end">
          <div>
            <h1 className="mb-xs font-display text-display-lg text-on-surface">Governance &amp; DAO</h1>
            <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
              Shape the future of the Stacks ecosystem. Participate in on-chain
              voting and submit proposals to guide protocol upgrades.
            </p>
          </div>
          <SubmitProposal />
        </header>

        {/* Stats bento grid */}
        <section className="mb-xl grid grid-cols-1 gap-gutter md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel flex h-[160px] flex-col justify-between rounded-xl p-md"
            >
              <div className="flex items-start justify-between">
                <span className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                  {stat.label}
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-surface-container">
                  <Icon name={stat.icon} className="text-base text-primary" />
                </span>
              </div>
              <div>
                <div className="font-display text-display-sm text-on-surface">{stat.value}</div>
                {stat.footer}
              </div>
            </div>
          ))}
        </section>

        {/* Proposals + context */}
        <div className="grid grid-cols-1 gap-xl lg:grid-cols-3">
          <ProposalsList />

          <aside className="space-y-md">
            {/* Voting power */}
            <div className="glass-panel rounded-xl p-md">
              <h3 className="mb-4 flex items-center gap-2 font-display text-headline-sm text-on-surface">
                <Icon name="account_balance" className="text-primary" />
                Your Voting Power
              </h3>
              <div className="mb-4 rounded-lg border border-white/5 bg-surface-container-lowest p-4">
                <div className="mb-1 font-ui text-label-md text-on-surface-variant">
                  Available to Vote
                </div>
                <div className="font-display text-display-sm text-on-surface">
                  0.00 <span className="font-display text-headline-sm text-on-surface-variant">STX</span>
                </div>
              </div>
              <Button cta variant="secondary" className="w-full text-white">
                Connect Wallet to Vote
              </Button>
            </div>

            {/* Recent activity */}
            <div className="glass-panel rounded-xl p-md">
              <h3 className="mb-4 font-display text-headline-sm text-on-surface">Recent Activity</h3>
              <div className="space-y-4">
                {ACTIVITY.map((a) => (
                  <div key={a.addr} className="flex gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/5 bg-surface-container-high">
                      <Icon name="how_to_vote" className="text-base text-on-surface-variant" />
                    </span>
                    <div>
                      <div className="font-sans text-body-sm text-on-surface">
                        <span className="font-mono text-primary">{a.addr}</span> voted{" "}
                        <span className={`font-bold ${a.voteClass}`}>{a.vote}</span> on {a.sip}
                      </div>
                      <div className="mt-0.5 font-ui text-label-md text-on-surface-variant">
                        {a.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
