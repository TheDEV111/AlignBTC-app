import { WalletGate } from "@/app/components/layout/WalletGate";

// Authenticated area: every route under (gated) requires a connected wallet.
// The route-group folder name is not part of the URL.
export default function GatedLayout({ children }: { children: React.ReactNode }) {
  return <WalletGate>{children}</WalletGate>;
}
