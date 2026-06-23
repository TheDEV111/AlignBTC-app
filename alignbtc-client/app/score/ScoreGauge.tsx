import type { CollateralTier } from "@/lib/scoring/types";

const TIER_COLORS: Record<string, { stroke: string; text: string }> = {
  Prime: { stroke: "var(--color-tertiary)", text: "text-tertiary" },
  Standard: { stroke: "var(--color-primary)", text: "text-primary" },
  Subprime: { stroke: "var(--color-error)", text: "text-error" },
};

export function ScoreGauge({ score, tier }: { score: number; tier: CollateralTier }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, score)) / 100);
  const color = TIER_COLORS[tier.label] ?? TIER_COLORS.Standard;

  return (
    <div className="relative size-52 shrink-0">
      <svg viewBox="0 0 200 200" className="size-52 -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="14"
          className="stroke-surface-container-high"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          stroke={color.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color.stroke})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display text-display-lg leading-none ${color.text}`}>{score}</span>
        <span className="mt-1 font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
          / 100
        </span>
      </div>
    </div>
  );
}
