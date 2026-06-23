"use client";

import { connect, disconnect, getLocalStorage, isConnected } from "@stacks/connect";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface WalletState {
  address: string | null;
  connected: boolean;
  connecting: boolean;
  /** False until the persisted session has been read on mount (avoids gate flash). */
  ready: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

function readStxAddress(): string | null {
  const data = getLocalStorage();
  return data?.addresses?.stx?.[0]?.address ?? null;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore a previously connected session on mount.
  useEffect(() => {
    if (isConnected()) setAddress(readStxAddress());
    setReady(true);
  }, []);

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    try {
      // Opens the wallet-select modal (Leather / Xverse) and requests addresses.
      const result = await connect();
      // Stacks addresses start with "S" (SP mainnet / ST testnet); BTC do not.
      const stx =
        result?.addresses?.find((a) => a.address?.startsWith("S"))?.address ??
        readStxAddress();
      setAddress(stx ?? null);
    } catch (err) {
      // Surface real failures (don't hide them); a user-dismissed popup also lands here.
      console.error("Wallet connection failed:", err);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setAddress(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, connected: !!address, connecting, ready, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within <WalletProvider>");
  return ctx;
}
