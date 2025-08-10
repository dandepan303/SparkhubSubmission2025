'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import FloatingMessage from '../ui/floating-message';
import { GoogleSignUpArgs, DefaultAPIRet, EmailSignUpArgs } from '@/types';
import axios from 'axios';
import { parseError } from '@/lib/util/server_util';
import { supabase } from '@/lib/supabase/client';
import Loading from '../ui/loading';
import dynamic from 'next/dynamic';
import Message from '../ui/message';
import { config } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';

const GoogleAuthButton = dynamic(() => import('@/components/auth/google-button'), { ssr: false });

export default function SignUp() {
  const router = useRouter();
  const { session } = useAuth();

  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'loading' | 'page-loading' | 'null'; message: string }>({
    status: 'page-loading',
    message: '',
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setStatus({ status: 'null', message: '' });
  }, []);

  useEffect(() => {
    if (status.status === 'success') {
      const timeout = setTimeout(() => {
        router.push('/onboarding');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [status, router]);

  const verifySignUpArgs = (email: string, password: string, name: string) => {
    if (!email || !password) {
      setStatus({ status: 'error', message: 'Email and password are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ status: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (password.length < 6) {
      setStatus({ status: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setStatus({ status: 'error', message: 'Password must contain at least one special character.' });
      return;
    }

    const forbiddenCharsRegex = /[\s'";\\]/;
    if (forbiddenCharsRegex.test(password)) {
      setStatus({ status: 'error', message: 'Password contains invalid characters.' });
      return;
    }

    handleEmailSignup(email, password, name);
  };

  const handleEmailSignup = async (email: string, password: string, name: string) => {
    setStatus({ status: 'loading', message: 'Loading...' });

    const reqBody: EmailSignUpArgs = {
      email: email,
      password: password,
      name: name,
    };

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60);

    axios
      .post(`/api/signup/email`, reqBody, { signal: controller.signal, withCredentials: true })
      .then(res => {
        setStatus({ status: res.data.status, message: res.data.message });
      })
      .catch(err => {
        if (err.response) {
          console.log('app/signup signup error');
          (async () => {
            setStatus({ status: 'error', message: await parseError(err.response.data.message) });
          })();
        } else {
          console.log('app/signup signup error');
          (async () => {
            setStatus({ status: 'error', message: await parseError(err.message) });
          })();
        }
      });
  };

  const handleGoogleAuthResponse = useCallback(
    async (response: any) => {
      setStatus({ status: 'loading', message: 'Signing up with Google...' });

      try {
        const { data: auth_data, error: auth_error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        });

        if (auth_error) {
          setStatus({ status: 'error', message: await parseError(auth_error.message, auth_error.code) });
          return;
        }
        if (!auth_data.user) {
          setStatus({ status: 'error', message: 'There was an issue signing up with Google' });
          return;
        }

        setStatus({ status: 'loading', message: 'Setting up your account...' });

        const reqBody: GoogleSignUpArgs = {
          userId: auth_data.user.id,
          email: auth_data.user.email,
          name: auth_data.user.user_metadata?.full_name,
        };

        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1000 * 60);
        const { data: res }: { data: DefaultAPIRet } = await axios.post(`/api/signup/google`, reqBody, {
          signal: controller.signal,
          withCredentials: true,
          headers: { Authorization: `Bearer ${session?.data?.access_token}` },
          validateStatus: () => true,
        });

        if (res.status === 'error') {
          setStatus({ status: 'error', message: res.message });
        }

        setStatus({ status: 'success', message: 'Successfully signed up with Google! Welcome to TradeSpace' });
      } catch (err: any) {
        console.log('Google auth error: ', await parseError(err.message, err.code));
        setStatus({ status: 'error', message: 'There was an issue with Google. Please try again.' });
      }
    },
    [session?.data?.access_token],
  );

  if (status.status === 'page-loading') {
    return <Loading message={'Loading...'} />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Header */}
      {/* We've added the md:py-6 class here to match the padding on the landing page */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
        {/* The h1 tag is now wrapped in an a tag with href="/" */}
        <Link href="/">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
            Trade
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
          </h1>
        </Link>
        <div className="flex space-x-3">
          <a href="/auth/sign-in" className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 md:text-base">
            Already have an account?
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-6 py-4">
        <div className="w-full max-w-md">
          {/* Hero Text */}
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Join the
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="leading-relaxed text-gray-600">Start trading skills with neighbors in your area</p>
          </div>

          {/* Status Messages */}
          {status.status === 'success' && (
            <div className="mb-4">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-3">
                <p className="text-center text-sm font-medium text-green-800">{status.message}</p>
              </div>
            </div>
          )}
          {status.status === 'error' && (
            <div className="mb-4">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-3">
                <p className="text-center text-sm font-medium text-red-800">{status.message}</p>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                verifySignUpArgs(email, password, name);
              }}>
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Create a secure password"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters with one special character</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={status.status === 'loading'}>
                {status.status === 'loading' ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm font-medium text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Google Sign Up */}
            <GoogleAuthButton
              handleGoogleAuthCallback={handleGoogleAuthResponse}
              setStatus={setStatus}
              buttonText={'signup_with'}
              buttonContext={'signup'}
            />

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/auth/sign-in"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent transition-all duration-200 hover:from-blue-700 hover:to-purple-700">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
