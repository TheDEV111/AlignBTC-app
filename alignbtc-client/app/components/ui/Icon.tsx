import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols glyph name, e.g. "bolt", "shield", "trending_up". */
  name: string;
  /** Render the filled variant. */
  filled?: boolean;
}

export function Icon({ name, filled = false, className, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden
      className={cn("material-symbols-outlined select-none leading-none", className)}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}`, ...style }}
      {...props}
    >
      {name}
    </span>
  );
}
