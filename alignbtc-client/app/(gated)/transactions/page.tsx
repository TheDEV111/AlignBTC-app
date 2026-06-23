import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { TransactionsExplorer } from "./TransactionsExplorer";

export const metadata: Metadata = {
  title: "Transactions — AlignBTC",
  description: "View and track all on-chain activities linked to your wallet.",
};

export default function TransactionsPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Explorer" />

      <main className="mx-auto flex w-full max-w-page grow flex-col gap-md px-sm py-xl md:px-xl">
        <TransactionsExplorer />
      </main>

      <SiteFooter />
    </div>
  );
}
