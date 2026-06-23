"use client";

import { useEffect, useState } from "react";
import { Button, Icon } from "@/app/components/ui";

export function SubmitProposal() {
  const [open, setOpen] = useState(false);

  // Lock body scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button cta onClick={() => setOpen(true)} className="gap-2">
        <Icon name="add" />
        Submit Proposal
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-sm sm:p-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-proposal-title"
        >
          {/* Backdrop */}
          <button
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="glass-panel relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-md">
              <h2
                id="submit-proposal-title"
                className="font-display text-headline-md text-on-surface"
              >
                Submit New Proposal
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-on-surface-variant transition-colors hover:text-white"
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="grow space-y-md overflow-y-auto p-md">
              <div>
                <label
                  htmlFor="proposal-title"
                  className="mb-2 block font-ui text-label-md text-on-surface-variant"
                >
                  Proposal Title
                </label>
                <input
                  id="proposal-title"
                  type="text"
                  placeholder="e.g., SIP-027: Update parameters..."
                  className="input-dark w-full rounded-md px-3 py-2 font-sans text-body-md"
                />
              </div>

              <div>
                <label
                  htmlFor="proposal-category"
                  className="mb-2 block font-ui text-label-md text-on-surface-variant"
                >
                  Category
                </label>
                <select
                  id="proposal-category"
                  className="input-dark w-full appearance-none rounded-md px-3 py-2 font-sans text-body-md"
                >
                  <option>Core Protocol</option>
                  <option>Treasury Grant</option>
                  <option>Parameter Change</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="proposal-summary"
                  className="mb-2 block font-ui text-label-md text-on-surface-variant"
                >
                  Summary
                </label>
                <textarea
                  id="proposal-summary"
                  placeholder="Provide a clear summary of the proposal..."
                  className="input-dark h-32 w-full resize-none rounded-md px-3 py-2 font-sans text-body-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 rounded-b-xl border-t border-white/10 bg-surface/50 p-md">
              <Button cta variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button cta disabled>
                Connect Wallet First
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
