"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "./cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Use a monospace face — good for addresses and amounts. */
  mono?: boolean;
}

export function Input({ label, mono = false, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="font-ui text-label-md uppercase text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded bg-surface-container-lowest px-sm py-3 text-body-md text-on-surface outline-none ring-1 ring-white/10 transition-shadow",
          "placeholder:text-on-surface-variant/50",
          // Border transitions to orange on focus + faint inner glow.
          "focus:ring-2 focus:ring-primary focus:[box-shadow:inset_0_0_8px_rgba(255,75,43,0.15)]",
          mono ? "font-mono" : "font-sans",
          className,
        )}
        {...props}
      />
    </div>
  );
}
