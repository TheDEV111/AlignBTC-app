"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/lib/wallet/WalletProvider";

/**
 * On a public page, sends already-connected users straight to the app.
 * Renders nothing.
 */
export function RedirectWhenConnected({ to = "/dashboard" }: { to?: string }) {
  const router = useRouter();
  const { ready, address } = useWallet();

  useEffect(() => {
    if (ready && address) router.replace(to);
  }, [ready, address, router, to]);

  return null;
}
