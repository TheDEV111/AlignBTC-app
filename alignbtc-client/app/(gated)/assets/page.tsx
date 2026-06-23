import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Icon } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Assets — AlignBTC",
  description: "Overview of your Stacks ecosystem holdings — tokens and Bitcoin Ordinals.",
};

const TOKENS = [
  {
    symbol: "Stacks",
    ticker: "STX",
    glyph: "S",
    glyphClass: "bg-primary-container/20 border-primary-container/50 text-primary",
    amount: "15,000",
    usd: "~$45,000.00",
  },
  {
    symbol: "ALEX",
    ticker: "SIP-10",
    glyph: "A",
    glyphClass: "bg-secondary-container/20 border-secondary-container/50 text-secondary",
    amount: "50,000",
    usd: "~$5,000.00",
  },
  {
    symbol: "USDA",
    ticker: "Stablecoin",
    glyph: "$",
    glyphClass: "bg-tertiary-container/20 border-tertiary-container/50 text-tertiary",
    amount: "10,500",
    usd: "~$10,500.00",
  },
];

const NFTS = [
  { id: "45920", src: "/Image-asset1.png" },
  { id: "88211", src: "/Image-asset2.png" },
  { id: "10294", src: "/Image-asset3.png" },
];

const actionBtn =
  "flex flex-1 items-center justify-center gap-base rounded-lg py-xs font-ui text-label-md transition-all active:scale-95";
const secondaryBtn = `${actionBtn} border border-white/20 text-white hover:border-stacks hover:bg-stacks/5 hover:text-primary`;
const primaryBtn = `${actionBtn} bg-stacks text-white hover:primary-glow`;

export default function AssetsPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Assets" />

      <main className="mx-auto flex w-full max-w-page grow flex-col gap-xl px-sm py-xl md:px-xl">
        {/* Header + portfolio summary */}
        <header className="flex flex-col items-start justify-between gap-md md:flex-row md:items-end">
          <div>
            <h1 className="mb-xs font-display text-display-lg font-bold text-on-surface">
              Asset Management
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant">
              Overview of your Stacks ecosystem holdings.
            </p>
          </div>
          <div className="glass-panel min-w-[300px] rounded-xl p-md">
            <div className="mb-xs font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
              Total Balance (USD)
            </div>
            <div className="font-display text-display-sm font-bold text-stacks">$124,592.00</div>
            <div className="mt-xs flex items-center gap-base text-tertiary">
              <Icon name="trending_up" className="text-base" />
              <span className="font-mono text-mono-sm">+5.2% (24h)</span>
            </div>
          </div>
        </header>

        {/* Fungible tokens */}
        <section>
          <h2 className="mb-md border-b border-white/10 pb-xs font-display text-headline-md font-semibold text-on-surface">
            Fungible Tokens
          </h2>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {TOKENS.map((t) => (
              <div
                key={t.symbol}
                className="glass-panel card-hover-effect flex h-[220px] flex-col justify-between rounded-xl p-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-sm">
                    <div
                      className={`flex size-10 items-center justify-center rounded-full border font-bold ${t.glyphClass}`}
                    >
                      {t.glyph}
                    </div>
                    <div>
                      <h3 className="font-display text-headline-sm font-semibold text-on-surface">
                        {t.symbol}
                      </h3>
                      <p className="font-mono text-mono-sm text-on-surface-variant">{t.ticker}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-headline-sm font-semibold text-on-surface">
                      {t.amount}
                    </div>
                    <div className="font-mono text-mono-sm text-on-surface-variant">{t.usd}</div>
                  </div>
                </div>
                <div className="mt-auto flex gap-sm">
                  <button className={secondaryBtn}>
                    <Icon name="arrow_upward" className="text-lg" />
                    Send
                  </button>
                  <button className={secondaryBtn}>
                    <Icon name="arrow_downward" className="text-lg" />
                    Receive
                  </button>
                  <button className={primaryBtn}>
                    <Icon name="swap_horiz" className="text-lg" />
                    Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NFT gallery */}
        <section>
          <h2 className="mb-md border-b border-white/10 pb-xs font-display text-headline-md font-semibold text-on-surface">
            Bitcoin NFTs (Ordinals)
          </h2>
          <div className="grid grid-cols-2 gap-md md:grid-cols-4 lg:grid-cols-5">
            {NFTS.map((nft) => (
              <div
                key={nft.id}
                className="group glass-panel card-hover-effect relative cursor-pointer overflow-hidden rounded-lg"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={nft.src}
                    alt={`Ordinal inscription #${nft.id}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-xs pt-md">
                  <p className="font-mono text-mono-sm font-bold text-white">
                    Inscription #{nft.id}
                  </p>
                </div>
              </div>
            ))}

            {/* Import empty-state */}
            <button className="glass-panel flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 text-on-surface-variant transition-colors hover:border-primary/50 hover:text-primary">
              <Icon name="add_circle" className="mb-xs text-3xl" />
              <span className="font-ui text-label-md uppercase">Import Ordinal</span>
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
