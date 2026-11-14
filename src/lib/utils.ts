/**
 * Utility to merge class names. Filters out falsy values.
 * Lightweight replacement for clsx + tailwind-merge to avoid extra deps.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
