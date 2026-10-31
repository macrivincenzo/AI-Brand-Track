'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, signOut } from '@/lib/auth-client';
import { ArrowLeft } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('reset') === 'success') {
      setSuccess('Password reset successfully. You can now login with your new password.');
      // Clear any existing session so user must log in with the account they just reset
      signOut();
    }
    
    // Pre-fill email if passed from registration page
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await signIn.email({
        email,
        password,
      });
      
      if (response.error) {
        setError(response.error.message || 'Failed to login');
        setLoading(false);
        return;
      }
      
      // Wait for session cookie to be set before redirecting
      // This prevents the middleware from redirecting back to login
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify session is set by checking the session API
      let sessionSet = false;
      let attempts = 0;
      const maxAttempts = 5;
      
      while (!sessionSet && attempts < maxAttempts) {
        try {
          const sessionResponse = await fetch('/api/auth/session', {
            credentials: 'include',
            method: 'GET',
          });
          if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            if (sessionData?.session?.user) {
              sessionSet = true;
              break;
            }
          }
        } catch (e) {
          // Continue trying
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
      }
      
      // Use window.location.href for hard navigation to ensure cookies are sent
      const returnUrl = searchParams.get('from') || searchParams.get('redirect') || '/dashboard';
      window.location.href = returnUrl;
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to login';
      
      if (err.message?.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
      } else if (err.message?.includes('CORS')) {
        errorMessage = 'Configuration error: Please contact support. The authentication service may not be properly configured.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="abt-page min-h-screen flex">
      {/* Left side - Blue solid */}
      <div className="hidden">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-lg opacity-90">
            Sign in to continue tracking your AI brand visibility.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-start justify-center px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <div className="w-full max-w-[440px] space-y-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="hidden">
              <h2 className="font-abt-serif text-[30px] font-semibold leading-[1.2] text-abt-ink">
                AI Brand Track
              </h2>
            </div>
            <h1 className="text-center font-abt-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink">
              Sign in to your account
            </h1>
            <p className="mt-3 text-center text-[17px] text-abt-ink-2">
              Or{' '}
              <Link href="/register" className="font-semibold text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block h-14 w-full rounded-abt-input border border-abt-line-strong bg-abt-surface px-4 text-[18px] text-abt-ink placeholder:text-abt-placeholder focus:border-abt-accent focus:shadow-[var(--abt-focus-ring)] focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded accent-[var(--abt-accent)]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[16px] text-abt-ink">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </Link>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-abt-button bg-abt-accent px-7 text-[18px] font-semibold text-abt-on-accent transition-colors hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}