'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExistingAccountOptions, setShowExistingAccountOptions] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowExistingAccountOptions(false);

    try {
      const response = await signUp.email({
        name,
        email,
        password,
      });
      
      // Only redirect if signup was successful
      if (!response.error) {
        // Wait a moment for the session to be properly set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // New accounts have no credits, so send them straight to the $9 Starter
        // trial checkout unless a same-site ?redirect= says otherwise.
        const redirect = new URLSearchParams(window.location.search).get('redirect');
        const next = redirect && redirect.startsWith('/') && !redirect.startsWith('//')
          ? redirect
          : '/plans?checkout=starter-monthly';

        // Force a hard navigation to ensure cookies are sent
        window.location.href = next;
      } else {
        throw response.error;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to register';
      setError(errorMessage);
      
      // Check if the error is about existing account
      // Better Auth returns 422 status for existing accounts
      if (err.status === 422 ||
          errorMessage.toLowerCase().includes('already exists') || 
          errorMessage.toLowerCase().includes('already registered') ||
          errorMessage.toLowerCase().includes('existing email') ||
          errorMessage.toLowerCase().includes('email already') ||
          errorMessage.toLowerCase().includes('user already exists')) {
        setShowExistingAccountOptions(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="abt-page min-h-screen flex">
      {/* Left side - Blue solid */}
      <div className="hidden">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Start tracking your brand</h1>
          <p className="text-lg opacity-90">
            Monitor how AI models rank your brand and get actionable insights to improve your visibility.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>14-day Starter trial for $9: 1 full analysis + weekly checks</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Track 4+ AI platforms</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-start justify-center px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <div className="w-full max-w-[440px] space-y-8">
          <div>
            <div className="hidden">
              <h2 className="font-abt-serif text-[30px] font-semibold leading-[1.2] text-abt-ink">
                AI Brand Track
              </h2>
            </div>
            <h2 className="text-center font-abt-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink">
              Create your account
            </h2>
            <p className="mt-3 text-center text-[17px] text-abt-ink-2">
              Or{' '}
              <Link href="/login" className="font-semibold text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                sign in to existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[16px] font-semibold text-abt-ink mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block h-14 w-full rounded-abt-input border border-abt-line-strong bg-abt-surface px-4 text-[18px] text-abt-ink placeholder:text-abt-placeholder focus:border-abt-accent focus:shadow-[var(--abt-focus-ring)] focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[16px] font-semibold text-abt-ink mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block h-14 w-full rounded-abt-input border border-abt-line-strong bg-abt-surface px-4 text-[18px] text-abt-ink placeholder:text-abt-placeholder focus:border-abt-accent focus:shadow-[var(--abt-focus-ring)] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[16px] font-semibold text-abt-ink mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block h-14 w-full rounded-abt-input border border-abt-line-strong bg-abt-surface px-4 text-[18px] text-abt-ink placeholder:text-abt-placeholder focus:border-abt-accent focus:shadow-[var(--abt-focus-ring)] focus:outline-none"
                  placeholder="Choose a strong password"
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
              </div>
            </div>

            {error && (
              <div className={`border px-4 py-3 ${showExistingAccountOptions ? 'bg-gray-900 border-gray-800' : 'bg-red-50 border-red-200'}`}>
                <p className={showExistingAccountOptions ? 'text-white font-medium' : 'text-red-600'}>
                  {error}
                </p>
                {showExistingAccountOptions && (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-gray-300">
                      It looks like you already have an account with this email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/login?email=${encodeURIComponent(email)}`}
                        className="inline-flex items-center justify-center px-4 py-2 border-2 border-blue-600 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Sign in instead
                      </Link>
                      <Link
                        href="/forgot-password"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-5 w-5 rounded accent-[var(--abt-accent)]"
                />
                <label htmlFor="terms" className="ml-2 block text-[16px] text-abt-ink">
                  I agree to the{' '}
                  <Link href="/terms-of-service" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-abt-button bg-abt-accent px-7 text-[18px] font-semibold text-abt-on-accent transition-colors hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}