'use client';

import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { parseError } from '@/lib/util/server_util';
import Message from '../ui/message';
import Loading from '../ui/loading';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { config } from '@/lib/config';
import FloatingMessage from '../ui/floating-message';
import { useAuth } from '@/components/auth/auth-provider';
const GoogleAuthButton = dynamic(() => import('@/components/auth/google-button'), { ssr: false });

interface SignInParams {
  onSignIn: () => void;
  message?: string;
}

export default function SignIn(params: SignInParams) {
  const router = useRouter();
  const { signIn: signInAuth, user } = useAuth();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'null' | 'loading' | 'page-loading'; message: string }>({
    status: 'page-loading',
    message: '',
  });

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set page loaded
  useEffect(() => {
    setStatus({ status: 'null', message: '' });
  }, []);

  // Check for success -> redirect to default page
  useEffect(() => {
    if (status.status === 'success') {
      router.push(`/${config.app.default_route}?message=${encodeURIComponent(status.message)}`);
    }
  }, [status.status, status.message, router]);

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // sign in function
  const handleEmailSignIn = async (email: string, password: string) => {
    setStatus({ status: 'loading', message: 'Loading...' });

    if (!email || !password) {
      setStatus({ status: 'error', message: 'Please provide all required information' });
      return;
    }

    try {
      const { error } = await signInAuth(email, password);

      if (error) {
        setStatus({ status: 'error', message: await parseError(error.message) });
        return;
      }

      setStatus({ status: 'success', message: 'Successfully signed in' });
    } catch (error: any) {
      setStatus({ status: 'error', message: await parseError(error.message, error.code) });
    }
  };

  const verifySignInArgs = (email: string, password: string) => {
    // existance check
    if (!email || !password) {
      setStatus({ status: 'error', message: 'Email and password are required.' });
      return;
    }

    // email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ status: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // length check
    if (password.length < 6) {
      setStatus({ status: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    // one special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setStatus({ status: 'error', message: 'Password must contain at least one special character.' });
      return;
    }

    // no special characters
    const forbiddenCharsRegex = /[\s'";\\]/;
    if (forbiddenCharsRegex.test(password)) {
      setStatus({ status: 'error', message: 'Password contains invalid characters.' });
      return;
    }

    handleEmailSignIn(email, password);
  };

  // gogole sign in auth callback
  const handleGoogleAuthResponse = useCallback(async (response: any) => {
    const { data: auth_data, error: auth_error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    if (auth_error) {
      setStatus({ status: 'error', message: await parseError(auth_error.message, auth_error.code) });
      return;
    }
    if (!auth_data.user) {
      setStatus({ status: 'error', message: 'There was an issue signing in with Google' });
      return;
    }

    setStatus({ status: 'success', message: 'Successfully signed in with Google' });
  }, []);

  if (status.status === 'page-loading') {
    return <Loading message={null} />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Header */}
      {/* Updated padding to match the landing page: py-4 for mobile, md:py-6 for larger screens */}
      <header className="flex items-center justify-between bg-white px-6 py-4 md:px-12 md:py-6">
        <button onClick={() => router.push('/')} className="cursor-pointer">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
            Trade
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
          </h1>
        </button>
        <div className="flex space-x-3">
          {user ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700">
              Go to Dashboard
            </button>
          ) : (
            <a href="/auth/sign-up" className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 md:text-base">
              New here?
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center px-6 py-8">
        {/* Animated Gradient Background */}
        <div
          className="absolute h-96 w-96 rounded-full opacity-40 blur-3xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.6) 0%, 
              rgba(147, 51, 234, 0.4) 35%, 
              rgba(236, 72, 153, 0.3) 70%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="absolute h-80 w-80 rounded-full opacity-30 blur-2xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle, 
              rgba(34, 197, 94, 0.5) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />

        <div className="relative z-10 w-full max-w-md">
          {/* Welcome Text */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">Welcome Back</h2>
            <p className="text-base text-gray-600 md:text-lg">
              Sign in to continue trading with your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent"> community</span>
            </p>
          </div>

          {/* Messages */}
          {params.message && <FloatingMessage>{params.message}</FloatingMessage>}

          {status.status === 'success' && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-medium text-green-800">{status.message}</p>
            </div>
          )}

          {status.status === 'error' && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="font-medium text-red-800">{status.message}</p>
            </div>
          )}

          {/* Sign In Card */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8">
            <form
              className="flex flex-col gap-6"
              onSubmit={e => {
                e.preventDefault();
                verifySignInArgs(email, password);
              }}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                disabled={status.status === 'loading'}>
                {status.status === 'loading' ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm font-medium text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <GoogleAuthButton
              handleGoogleAuthCallback={handleGoogleAuthResponse}
              setStatus={setStatus}
              buttonText={'signin_with'}
              buttonContext={'signin'}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/auth/sign-up')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent transition-all duration-200 hover:from-blue-700 hover:to-purple-700">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
