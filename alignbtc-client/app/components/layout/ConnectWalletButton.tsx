"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Icon, cn } from "@/app/components/ui";
import { useWallet } from "@/lib/wallet/WalletProvider";
import { STACKS_NETWORK } from "@/lib/contract/underwriter";

export function ConnectWalletButton({ className }: { className?: string }) {
  const { address, connecting, connectWallet, disconnectWallet } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Disconnected — single connect action.
  if (!address) {
    return (
      <Button
        cta
        size="sm"
        onClick={connectWallet}
        disabled={connecting}
        className={cn("rounded-full", className)}
      >
        {connecting ? "Connecting…" : "Connect Wallet"}
      </Button>
    );
  }

  const short = `${address.slice(0, 5)}…${address.slice(-4)}`;
  const explorerUrl = `https://explorer.hiro.so/address/${address}?chain=${STACKS_NETWORK}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const itemClass =
    "flex w-full items-center gap-sm rounded-lg px-3 py-2 font-sans text-body-sm transition-colors";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button
        cta
        size="sm"
        variant="secondary"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-full"
      >
        <span className="size-2 rounded-full bg-tertiary" />
        {short}
        <Icon name="expand_more" className={`text-base transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      {open && (
        <div role="menu" className="glass-overlay absolute right-0 z-50 mt-2 w-60 rounded-xl p-2">
          <div className="px-3 py-2">
            <p className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
              Connected · {STACKS_NETWORK}
            </p>
            <p className="truncate font-mono text-mono-sm text-on-surface">{address}</p>
          </div>
          <div className="my-1 h-px bg-white/10" />
          <button onClick={copyAddress} className={cn(itemClass, "text-on-surface hover:bg-white/5")}>
            <Icon name={copied ? "check" : "content_copy"} className="text-base" />
            {copied ? "Copied" : "Copy address"}
          </button>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(itemClass, "text-on-surface hover:bg-white/5")}
          >
            <Icon name="open_in_new" className="text-base" />
            View on explorer
          </a>
          <button
            onClick={() => {
              disconnectWallet();
              setOpen(false);
            }}
            className={cn(itemClass, "text-error hover:bg-error/10")}
          >
            <Icon name="logout" className="text-base" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
