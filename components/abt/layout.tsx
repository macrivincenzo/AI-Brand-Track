import { cn } from '@/lib/utils';

/** Page shell for redesigned screens: canvas, brand font, and the size container the cqi type scale needs. */
export function Page({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('abt-page', className)}>{children}</div>;
}

const widths = { marketing: 'max-w-[1120px]', report: 'max-w-[1000px]', dashboard: 'max-w-[880px]', text: 'max-w-[720px]' };

export function Section({
  width = 'marketing',
  divider = false,
  className,
  children,
  id,
  labelledBy,
}: {
  width?: keyof typeof widths;
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('px-4 sm:px-6', className)}>
      <div className={cn('mx-auto py-[72px]', widths[width], divider && 'border-t border-abt-divider')}>{children}</div>
    </section>
  );
}

/** Flat card: border, no shadow. */
export function Card({ className, children, as: Tag = 'div' }: { className?: string; children: React.ReactNode; as?: React.ElementType }) {
  return <Tag className={cn('rounded-abt-card border border-abt-line bg-abt-surface p-6 sm:p-8', className)}>{children}</Tag>;
}

/** Status is a 10px dot, always paired with words. */
export function StatusDot({ tone }: { tone: 'good' | 'mid' | 'bad' }) {
  const color = { good: 'bg-abt-good', mid: 'bg-abt-mid', bad: 'bg-abt-bad' }[tone];
  return <span aria-hidden className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', color)} />;
}
