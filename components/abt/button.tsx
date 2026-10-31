import { cn } from '@/lib/utils';

/**
 * Buttons from the Claude Design system: one filled (accent) action per screen,
 * a quiet bordered secondary, and underlined text links for everything else.
 * Exposed as a class helper so it also styles Link and PlanCheckoutLink.
 */
type Variant = 'primary' | 'secondary' | 'link';
type Size = 'lg' | 'md';

export function abtButton({
  variant = 'primary',
  size = 'lg',
  full = false,
  className,
}: { variant?: Variant; size?: Size; full?: boolean; className?: string } = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-abt-sans font-semibold transition-colors duration-150',
    'focus-visible:outline-none focus-visible:shadow-[var(--abt-focus-ring)] disabled:pointer-events-none disabled:opacity-50',
    variant === 'link'
      ? 'rounded-abt-tag text-abt-ink underline decoration-1 underline-offset-[5px] hover:text-abt-accent'
      : [
          'whitespace-nowrap rounded-abt-button',
          size === 'lg' ? 'h-14 px-7 text-[18px]' : 'h-11 px-5 text-[16px]',
          variant === 'primary'
            ? 'bg-abt-accent text-abt-on-accent hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)]'
            : 'border border-abt-line-strong bg-abt-surface text-abt-ink hover:bg-abt-sunk',
        ],
    full && 'w-full',
    className,
  );
}

export function Button({
  variant,
  size,
  full,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; full?: boolean }) {
  return <button className={abtButton({ variant, size, full, className })} {...props} />;
}
