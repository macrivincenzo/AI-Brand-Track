'use client';

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCustomer } from '@/hooks/useAutumnCustomer';
import { Menu, X } from 'lucide-react';
import { useBuyCredits } from '@/hooks/useBuyCredits';
import { LogoLockup } from '@/components/brand/logo';
import { PlanCheckoutLink } from '@/components/plans/plan-checkout-link';
import { abtButton } from '@/components/abt/button';

// Separate component that only renders when Autumn is available
function UserCredits() {
  const { customer } = useCustomer();
  const messageUsage = customer?.features?.messages;
  const remainingMessages = messageUsage ? (messageUsage.balance || 0) : 0;

  return (
    <span className="text-[16px] text-abt-ink-2">
      {remainingMessages} credits
    </span>
  );
}

const links = [
  { href: '/methodology', label: 'How we measure' },
  { href: '/plans', label: 'Prices' },
  { href: '/#agencies', label: 'For agencies' },
];

const navLink = 'text-[17px] text-abt-ink hover:text-abt-accent transition-colors';
const mobileLink = 'flex min-h-[52px] items-center text-[19px] font-medium text-abt-ink';

export function Navbar() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBuyCredits } = useBuyCredits();
  const router = useRouter();
  const close = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setMobileMenuOpen(false);
    try {
      await signOut();
      // Small delay to ensure the session is cleared
      setTimeout(() => {
        router.refresh();
        setIsLoggingOut(false);
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-abt-bg font-abt-sans">
      <div className="mx-auto flex h-[80px] max-w-[1120px] items-center justify-between px-4 sm:px-6">
        <LogoLockup fontSize={20} onClick={close} />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={navLink}>
              {l.label}
            </Link>
          ))}
          {session ? (
            <>
              <UserCredits />
              <button onClick={() => openBuyCredits()} className={navLink}>
                Buy credits
              </button>
              <button onClick={handleLogout} disabled={isLoggingOut} className={`${navLink} disabled:opacity-50`}>
                {isLoggingOut ? 'Logging out…' : 'Log out'}
              </button>
              <Link href="/dashboard" className={abtButton({ size: 'md' })}>
                Dashboard
              </Link>
            </>
          ) : (
            <Link href="/login" className={abtButton({ variant: 'secondary', size: 'md' })}>
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-abt-button text-abt-ink hover:bg-abt-sunk md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-abt-divider bg-abt-bg md:hidden">
          <div className="flex flex-col px-4 pb-6 pt-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className={mobileLink}>
                {l.label}
              </Link>
            ))}
            {session ? (
              <>
                <div className="flex min-h-[52px] items-center justify-between">
                  <UserCredits />
                  <button
                    onClick={() => {
                      openBuyCredits();
                      close();
                    }}
                    className={abtButton({ variant: 'link' })}
                  >
                    Buy credits
                  </button>
                </div>
                <Link href="/dashboard" onClick={close} className={abtButton({ full: true, className: 'mt-4' })}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={abtButton({ variant: 'secondary', full: true, className: 'mt-3' })}
                >
                  {isLoggingOut ? 'Logging out…' : 'Log out'}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={close} className={mobileLink}>
                  Log in
                </Link>
                <PlanCheckoutLink
                  productId="starter-monthly"
                  returnUrl="/brand-monitor"
                  className={abtButton({ full: true, className: 'mt-4' })}
                >
                  Start for $9
                </PlanCheckoutLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
