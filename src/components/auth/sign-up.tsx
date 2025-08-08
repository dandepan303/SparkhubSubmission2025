'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import FloatingMessage from '../ui/floating-message';
import { GoogleSignUpArgs, GoogleSignUpRet, EmailSignUpArgs } from '@/types';
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
    setStatus({ status: 'null', message: '' }); // Replace loading status
  }, []);

  // Checks for success flag
  useEffect(() => {
    if (status.status === 'success') {
      const timeout = setTimeout(() => {
        router.push('/onboarding');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [status, router]);

  const verifySignUpArgs = (email: string, password: string, name: string) => {
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

  // Fixed Google auth callback - matches the working sign-in implementation
  const handleGoogleAuthResponse = useCallback(async (response: any) => {
    setStatus({ status: 'loading', message: 'Signing up with Google...' });

    try {
      // Create auth profile
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

      // Create db profile
      setStatus({ status: 'loading', message: 'Setting up your account...' });

      const reqBody: GoogleSignUpArgs = {
        userId: auth_data.user.id,
        email: auth_data.user.email,
        name: auth_data.user.user_metadata?.full_name,
      };

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60);
      const { data: res }: { data: GoogleSignUpRet } = await axios.post(`/api/signup/google`, reqBody, {
        signal: controller.signal,
        withCredentials: true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
        validateStatus: () => true, // prevent axios from throwing its wrapper errors
      });

      if (res.status === 'error') {
        setStatus({ status: 'error', message: res.message });
      }

      setStatus({ status: 'success', message: 'Successfully signed up with Google! Welcome to TradeSpace' });
    } catch (err: any) {
      console.log('Google auth error: ', await parseError(err.message, err.code));
      setStatus({ status: 'error', message: 'There was an issue with Google. Please try again.' });
    }
  }, []);

  if (status.status === 'page-loading') {
    return <Loading message={'Loading...'} />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 font-sans">
      {/* Custom font styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

        * {
          font-family:
            'Nunito',
            'Comic Neue',
            'Quicksand',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"></div>
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-200/20 blur-3xl"></div>

      {/* Header */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 md:text-3xl">TradeSpace</h1>
      </div>

      <div className="mx-4 w-full max-w-md rounded-3xl border border-white/30 bg-white/25 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:bg-white/35 md:p-8">
        {status.status === 'success' && (
          <div className="mb-4">
            <Message color="green" className="text-center">
              {status.message}
            </Message>
          </div>
        )}
        {status.status === 'error' && (
          <div className="mb-4">
            <Message color="red" className="text-center">
              {status.message}
            </Message>
          </div>
        )}

        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-800 md:text-3xl">Join TradeSpace</h2>
          <p className="font-semibold text-gray-700">Start trading with your neighbors today</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            verifySignUpArgs(email, password, name);
          }}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/40 px-4 py-3 font-semibold text-gray-800 placeholder-gray-600 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/40 px-4 py-3 font-semibold text-gray-800 placeholder-gray-600 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/40 px-4 py-3 font-semibold text-gray-800 placeholder-gray-600 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Create a secure password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 py-3 font-extrabold tracking-tight text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={status.status === 'loading'}>
            {status.status === 'loading' ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6">
          <GoogleAuthButton
            handleGoogleAuthCallback={handleGoogleAuthResponse}
            setStatus={setStatus}
            buttonText={'signup_with'}
            buttonContext={'signup'}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="font-semibold text-gray-700">
            Already have an account?{' '}
            <a href="/auth/sign-in" className="font-extrabold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
