'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authClient, signOut } from '@/lib/auth-client';
import { ArrowLeft, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Sign out any existing session as soon as user lands here from the email link,
  // so they don't see another account's Dashboard/Logout in the navbar
  useEffect(() => {
    if (token) {
      signOut();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authClient.resetPassword({
        newPassword: password,
        token: token!,
      });

      // Sign out any existing session so user doesn't land in another account
      await signOut();
      
      // Redirect to login with success message
      router.push('/login?reset=success');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="abt-page min-h-screen flex">
        {/* Left side - Blue solid */}
        <div className="hidden">
          <div className="absolute inset-0 bg-blue-600" />
          <div className="relative z-10 max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">Invalid Link</h1>
            <p className="text-lg opacity-90">
              This password reset link has expired or is invalid. Please request a new one.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        {/* Right side - Error message */}
        <div className="flex flex-1 items-start justify-center px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          <div className="w-full max-w-[440px] space-y-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="font-abt-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink">
                Invalid Reset Link
              </h2>
              <p className="mt-3 text-[17px] text-abt-ink-2">
                This password reset link is invalid or has expired.
              </p>
              <Link 
                href="/forgot-password"
                className="mt-6 inline-block btn-firecrawl-default whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-6 py-2"
              >
                Request new reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="abt-page min-h-screen flex">
      {/* Left side - Blue solid */}
      <div className="hidden">
        <div className="absolute inset-0 bg-blue-600" />
        <div className="relative z-10 max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Almost there!</h1>
          <p className="text-lg opacity-90">
            Create a new password for your account. Make sure it's strong and unique.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm">At least 8 characters long</span>
            </div>
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm">Mix of letters and numbers</span>
            </div>
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm">Unique to this account</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
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
              Reset your password
            </h2>
            <p className="mt-3 text-center text-[17px] text-abt-ink-2">
              Enter your new password below
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-[16px] font-semibold text-abt-ink mb-2">
                  New password
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
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-[16px] font-semibold text-abt-ink mb-2">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block h-14 w-full rounded-abt-input border border-abt-line-strong bg-abt-surface px-4 text-[18px] text-abt-ink placeholder:text-abt-placeholder focus:border-abt-accent focus:shadow-[var(--abt-focus-ring)] focus:outline-none"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-abt-button bg-abt-accent px-7 text-[18px] font-semibold text-abt-on-accent transition-colors hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)] disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset password'}
              </button>
            </div>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center text-[16px] text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}