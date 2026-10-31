'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: '/reset-password',
      });
      if (result?.error) {
        setError(result.error.message || 'Failed to send reset email. Please try again later.');
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="abt-page min-h-screen flex">
        {/* Left side - Blue solid */}
        <div className="hidden">
          <div className="absolute inset-0 bg-blue-600" />
          <div className="relative z-10 max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">Check your inbox!</h1>
            <p className="text-lg opacity-90">
              We've sent you instructions to reset your password. Check your email to continue.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        {/* Right side - Success message */}
        <div className="flex flex-1 items-start justify-center px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          <div className="w-full max-w-[440px] space-y-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-abt-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink">
                Check your email
              </h2>
              <p className="mt-3 text-[17px] text-abt-ink-2">
                We've sent a password reset link to
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">{email}</p>
              <p className="mt-4 text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Link 
                href="/login" 
                className="mt-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
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
          <h1 className="text-4xl font-bold mb-4">Forgot your password?</h1>
          <p className="text-lg opacity-90">
            No worries! We'll help you reset it and get back to tracking your brand.
          </p>
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
              Enter your email and we'll send you a reset link
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                {loading ? 'Sending...' : 'Send reset link'}
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