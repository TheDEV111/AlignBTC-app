"use client";

import { Button, Icon } from "@/app/components/ui";
import { useWallet } from "@/lib/wallet/WalletProvider";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/**
 * Wallet wall for the authenticated app area. Renders children only when a
 * wallet is connected; otherwise shows a complete, branded "connect to enter"
 * page (header + panel + footer) so gated routes never look broken.
 *
 * Client-side UX gate only — real authorization for sensitive operations lives
 * on-chain (wallet signature / contract).
 */
export function WalletGate({ children }: { children: React.ReactNode }) {
  const { address, ready } = useWallet();

  if (ready && address) return <>{children}</>;

  return (
    <div className="flex flex-col flex-1">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-page flex-1 items-center justify-center px-sm py-xl md:px-xl">
        <div className="glass-panel flex w-full max-w-md flex-col items-center gap-md rounded-xl p-lg text-center">
          <span className="grid size-16 place-items-center rounded-full bg-primary-container/15 text-primary">
            <Icon name="lock" filled className="text-4xl" />
          </span>

          <h1 className="font-display text-headline-md text-on-surface">
            Connect your wallet
          </h1>
          <p className="max-w-sm font-sans text-body-md text-on-surface-variant">
            This is part of the AlignBTC app. Connect a Stacks wallet to view your
            dashboard, assets, and activity.
          </p>

          {ready ? (
            <ConnectWalletButton />
          ) : (
            <span className="flex items-center gap-2 font-sans text-body-sm text-on-surface-variant">
              <Icon name="sync" className="animate-spin text-base" />
              Checking wallet…
            </span>
          )}

          {/* Public escape hatch — learn how it works without connecting. */}
          <div className="mt-xs flex items-center justify-center border-t border-white/5 pt-md">
            <Button cta variant="ghost" size="sm" href="/docs">
              How it works
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
