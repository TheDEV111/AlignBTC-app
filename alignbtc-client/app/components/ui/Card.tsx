import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Variant = "glass" | "solid" | "overlay";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * glass   — frosted, top-down gradient stroke (default, Level 1+)
   * solid   — opaque surface with subtle stroke (Level 1)
   * overlay — heavy-blur modal/popover surface (Level 2)
   */
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  glass: "glass-card",
  solid: "surface-card",
  overlay: "glass-overlay",
};

export function Card({ variant = "glass", className, ...props }: CardProps) {
  return <div className={cn(variants[variant], "p-md", className)} {...props} />;
}
