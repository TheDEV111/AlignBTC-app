import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SettingsClient } from "./SettingsClient";

export const metadata: Metadata = {
  title: "Settings — AlignBTC",
  description: "Manage your public identity and connected wallet details.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <SiteHeader activeNav="Settings" />
      <SettingsClient />
    </div>
  );
}
