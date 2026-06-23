"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/app/components/ui";

const SECTIONS = [
  { id: "Profile", icon: "person" },
  { id: "Preferences", icon: "tune" },
  { id: "Security", icon: "security" },
  { id: "Notifications", icon: "notifications" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const pillBase = "rounded-full font-ui text-label-md transition-all active:scale-95";
const pillPrimary = `${pillBase} bg-stacks text-white hover:primary-glow`;
const pillSecondary = `${pillBase} border border-white text-white hover:bg-white/5`;

function ProfileSection() {
  const [displayName, setDisplayName] = useState("Satoshi.btc");
  const [bio, setBio] = useState("Building the future of finance on Stacks.");

  return (
    <div className="space-y-xl">
      <header>
        <h1 className="mb-xs font-display text-display-lg text-on-surface">Profile Settings</h1>
        <p className="font-sans text-body-lg text-on-surface-variant">
          Manage your public identity and connected wallet details.
        </p>
      </header>

      {/* Identity */}
      <section className="glass-panel rounded-xl p-md md:p-lg">
        <h3 className="mb-md flex items-center gap-sm border-b border-white/5 pb-xs font-display text-headline-sm text-on-surface">
          <Icon name="badge" className="text-primary-container" />
          Identity
        </h3>
        <div className="mt-md flex flex-col items-start gap-lg md:flex-row">
          {/* Avatar */}
          <div className="flex shrink-0 flex-col items-center gap-sm">
            <div className="group relative flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 bg-surface-container-high">
              <Image
                src="/Image-asset3.png"
                alt="Profile avatar"
                fill
                sizes="96px"
                className="object-cover"
              />
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Icon name="photo_camera" className="text-white" />
              </div>
            </div>
            <button className={`${pillSecondary} px-sm py-base`}>Change</button>
          </div>

          {/* Form fields */}
          <div className="w-full grow space-y-md">
            <div>
              <label
                htmlFor="display-name"
                className="mb-base block font-ui text-label-md text-on-surface-variant"
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-dark w-full rounded-lg px-sm py-xs font-sans text-body-md focus:ring-0"
              />
              <p className="mt-base font-mono text-mono-sm text-on-surface-variant opacity-70">
                This is your public-facing BNS name.
              </p>
            </div>
            <div>
              <label
                htmlFor="bio"
                className="mb-base block font-ui text-label-md text-on-surface-variant"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input-dark w-full resize-none rounded-lg px-sm py-xs font-sans text-body-md focus:ring-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Connected wallet */}
      <section className="glass-panel rounded-xl p-md md:p-lg">
        <div className="mb-md flex items-start justify-between border-b border-white/5 pb-xs">
          <h3 className="flex items-center gap-sm font-display text-headline-sm text-on-surface">
            <Icon name="account_balance_wallet" className="text-primary-container" />
            Connected Wallet
          </h3>
        </div>
        <div className="hover-lift flex flex-col items-center justify-between gap-md rounded-lg border border-white/5 bg-surface-container-low p-sm md:flex-row">
          <div className="flex w-full items-center gap-md md:w-auto">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#5546FF]/20">
              <Icon name="account_balance_wallet" filled className="text-base text-[#5546FF]" />
            </div>
            <div>
              <p className="font-display text-headline-sm text-on-surface">Leather Wallet</p>
              <p className="font-mono text-mono-sm text-on-surface-variant">SP3...ABCD</p>
            </div>
          </div>
          <div className="flex w-full items-center gap-sm md:w-auto">
            <span className="rounded border border-tertiary/30 bg-tertiary-container/20 px-xs py-base font-ui text-label-md uppercase text-tertiary">
              Active
            </span>
            <button className={`${pillSecondary} px-sm py-base`}>Disconnect</button>
          </div>
        </div>
      </section>

      {/* Save actions */}
      <div className="flex justify-end gap-sm border-t border-white/5 pt-md">
        <button className={`${pillSecondary} px-md py-xs`}>Cancel</button>
        <button className={`${pillPrimary} px-md py-xs`}>Save Changes</button>
      </div>
    </div>
  );
}

function PlaceholderSection({ id }: { id: SectionId }) {
  return (
    <div className="space-y-xl">
      <header>
        <h1 className="mb-xs font-display text-display-lg text-on-surface">{id}</h1>
        <p className="font-sans text-body-lg text-on-surface-variant">
          Manage your {id.toLowerCase()} settings.
        </p>
      </header>
      <section className="glass-panel flex min-h-[200px] flex-col items-center justify-center gap-sm rounded-xl p-lg text-center">
        <Icon name="construction" className="text-4xl text-on-surface-variant" />
        <p className="font-sans text-body-md text-on-surface-variant">
          {id} settings are coming soon.
        </p>
      </section>
    </div>
  );
}

export function SettingsClient() {
  const [active, setActive] = useState<SectionId>("Profile");

  return (
    <div className="mx-auto flex w-full max-w-page grow px-sm pt-24 md:px-xl">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col gap-sm px-md py-xl lg:flex">
        <div className="glass-panel flex h-full flex-col gap-md rounded-xl p-md">
          <h2 className="mb-sm px-sm font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
            Settings
          </h2>
          <nav className="flex flex-col gap-base">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-sm rounded-lg px-sm py-xs font-sans text-body-md transition-colors ${
                  active === s.id
                    ? "border-l-2 border-primary-container bg-linear-to-r from-primary-container/10 to-transparent text-primary-container"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                }`}
              >
                <Icon name={s.icon} className="text-xl" />
                {s.id}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="grow overflow-y-auto px-sm py-xl md:px-xl">
        {/* Mobile / tablet section switcher (sidebar is lg-only) */}
        <div className="mb-md flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-sm py-2 font-ui text-label-md uppercase tracking-wider transition-colors ${
                active === s.id
                  ? "bg-primary-container/15 text-primary"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon name={s.icon} className="text-base" />
              {s.id}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          {active === "Profile" ? <ProfileSection /> : <PlaceholderSection id={active} />}
        </div>
      </main>
    </div>
  );
}
