import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /**
   * Marketing CTA typography (Hanken `headline-sm`, sentence case) instead of
   * the default app-UI control label (Geist `label-md`, uppercase).
   */
  cta?: boolean;
  /** Render as a navigation link to this href instead of a <button>. */
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-xs rounded transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Solid Stacks orange, white text, magnetic glow on hover (brand primary).
  primary: "bg-stacks text-white hover:primary-glow",
  // Transparent with a hairline border that brightens on hover.
  secondary:
    "border border-white/20 bg-transparent text-on-surface hover:border-white/50 hover:bg-white/5",
  // No chrome — for text-link / low-emphasis actions.
  ghost: "bg-transparent text-on-surface-variant hover:text-primary",
};

const sizes: Record<Size, string> = {
  sm: "px-md py-xs",
  md: "px-lg py-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  cta = false,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    cta ? "font-display text-headline-sm" : "font-ui text-label-md uppercase",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
