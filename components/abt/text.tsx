import { cn } from '@/lib/utils';

/** Type scale from brand-tokens.css: serif for display/titles, sans for everything people read. */

type TextProps = { as?: React.ElementType; className?: string; children: React.ReactNode; id?: string };

export function Eyebrow({ as: Tag = 'p', className, ...props }: TextProps) {
  return (
    <Tag
      className={cn('text-[16px] font-semibold uppercase tracking-[var(--abt-eyebrow-tracking)] text-abt-accent', className)}
      {...props}
    />
  );
}

export function Display({ as: Tag = 'h1', className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-abt-serif text-[length:var(--abt-text-display)] font-semibold leading-[1.04] tracking-[-0.03em] text-abt-ink',
        className,
      )}
      {...props}
    />
  );
}

export function Title({ as: Tag = 'h2', className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-abt-serif text-[length:var(--abt-text-title)] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink',
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({ as: Tag = 'h3', className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        'font-abt-serif text-[length:var(--abt-text-section)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink',
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ as: Tag = 'p', className, ...props }: TextProps) {
  return <Tag className={cn('text-[length:var(--abt-text-lead)] leading-[1.4] text-abt-ink-2', className)} {...props} />;
}

export function ItemTitle({ as: Tag = 'h3', className, ...props }: TextProps) {
  return <Tag className={cn('text-[21px] font-bold leading-[1.3] text-abt-ink', className)} {...props} />;
}

export function Body({ as: Tag = 'p', className, ...props }: TextProps) {
  return <Tag className={cn('text-[18px] leading-[1.5] text-abt-ink-2', className)} {...props} />;
}
