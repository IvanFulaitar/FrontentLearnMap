import { useMemo, useState } from "react";

/** Small list-windowing helper for medium lists without introducing a virtualization dependency. */
export function useWindowedList<T>(items: T[], windowSize: number) {
  const [offset, setOffset] = useState(0);
  const visible = useMemo(() => items.slice(offset, offset + windowSize), [items, offset, windowSize]);

  const next = () => setOffset((current) => Math.min(Math.max(0, items.length - windowSize), current + windowSize));
  const previous = () => setOffset((current) => Math.max(0, current - windowSize));
  const reset = () => setOffset(0);

  return { visible, offset, next, previous, reset };
}
