import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts 0 → target once `started` is true. Progress comes from elapsed time,
 * so a tab that was in the background lands exactly on `target` when it returns.
 * Reduced motion: returns `target` immediately.
 */
export function useCountUp(target: number, started: boolean, duration = 2000) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started || reduced) return;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started, duration, reduced]);

  return reduced ? target : value;
}
