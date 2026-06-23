import { Icon } from "@/app/components/ui";
import { FEATURE_META, FEATURE_ORDER } from "@/lib/scoring/features";
import type { WalletFeatures } from "@/lib/scoring/types";

export function FeatureBreakdown({ features }: { features: WalletFeatures }) {
  return (
    <div>
      <h2 className="mb-md font-display text-headline-md text-on-surface">
        Contributing wallet signals
      </h2>
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_ORDER.map((key) => {
          const meta = FEATURE_META[key];
          return (
            <div key={key} className="glass-panel rounded-xl p-md">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary-container/15 text-primary">
                  <Icon name={meta.icon} />
                </span>
                <span className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                  {Math.round(meta.weight * 100)}% wt
                </span>
              </div>
              <p className="mt-sm font-display text-headline-sm text-on-surface">
                {meta.format(features[key])}
              </p>
              <p className="font-ui text-label-md uppercase tracking-wider text-on-surface-variant">
                {meta.label}
              </p>
              <p className="mt-1 font-sans text-body-sm text-on-surface-variant">
                {meta.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
