import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ScoreExperience } from "./ScoreExperience";

export const metadata: Metadata = {
  title: "Credit Score — AlignBTC",
  description:
    "Connect your Stacks wallet to receive an AI credit trust score and a simulated under-collateralised loan offer.",
};

export default function ScorePage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Score" />

      <main className="mx-auto w-full max-w-page flex-1 px-sm pt-32 pb-xl md:px-xl">
        <header className="mb-lg flex flex-col gap-sm">
          <h1 className="font-display text-display-lg text-on-surface">
            Credit{" "}
            <span className="bg-linear-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Trust Score
            </span>
          </h1>
          <p className="max-w-2xl font-sans text-body-lg text-on-surface-variant">
            An AI underwriter for Bitcoin DeFi. Your on-chain Stacks history
            becomes a 0–100 trust score that prices an under-collateralised loan —
            settled to the on-chain escrow stub.
          </p>
        </header>

        <ScoreExperience />
      </main>

      <SiteFooter />
    </div>
  );
}
