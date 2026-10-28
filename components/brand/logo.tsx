import Link from 'next/link';

/**
 * Signal A: one line that reads as the A in AI, a measured climb and the top spot.
 * Three optically adjusted masters from the brand spec (32-unit grid):
 * large ≥ 48px, small 21–47px, 16 for ≤ 20px. Color comes from currentColor.
 */
const MASTERS = {
  large: { d: 'M5 28 L9.4 18.4 L11.8 21.4 L16 4 L27 28', strokeWidth: 2.6 },
  small: { d: 'M3.5 29 L8.5 18.6 L12.18 23.2 L16 3 L28.5 29', strokeWidth: 3.8 },
  tiny: { d: 'M4 28 L8 20 L12 24 L16 4 L28 28', strokeWidth: 4 },
} as const;

function masterFor(size: number) {
  if (size >= 48) return MASTERS.large;
  if (size >= 21) return MASTERS.small;
  return MASTERS.tiny;
}

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  const { d, strokeWidth } = masterFor(size);
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Horizontal lockup: mark box = 1.27× font size, gap = 0.35× mark box (spec: 28px mark, 22px type, 10px gap). */
export function LogoLockup({ fontSize = 20, href = '/', onClick }: { fontSize?: number; href?: string; onClick?: () => void }) {
  const mark = Math.round(fontSize * 1.27);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="AI Brand Track home"
      className="inline-flex items-center"
      style={{ gap: Math.round(mark * 0.35), color: 'var(--abt-ink)' }}
    >
      <LogoMark size={mark} className="text-[var(--abt-accent)]" />
      <span
        style={{
          font: `600 ${fontSize}px/1 var(--abt-font-sans)`,
          letterSpacing: '-0.02em',
        }}
      >
        AI Brand Track
      </span>
    </Link>
  );
}
