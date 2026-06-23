/**
 * Minimal className joiner — filters out falsy values.
 * Avoids pulling in clsx/tailwind-merge for a small component set.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
