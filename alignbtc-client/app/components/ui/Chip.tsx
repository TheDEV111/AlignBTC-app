import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Tone = "success" | "pending" | "error" | "neutral";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Show a leading status dot. */
  dot?: boolean;
}

// Low-opacity fill, full-opacity text — per the status-chip spec.
const tones: Record<Tone, string> = {
  success: "bg-tertiary/10 text-tertiary",
  pending: "bg-secondary/10 text-secondary",
  error: "bg-error/10 text-error",
  neutral: "bg-white/[0.06] text-on-surface-variant",
};

export function Chip({ tone = "neutral", dot = false, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-sm py-1 font-ui text-label-md uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
