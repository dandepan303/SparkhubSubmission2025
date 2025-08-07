'use client'

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FloatingMessage from "../ui/floating-message";
import { CreateUserArgs, SignUpArgs } from "@/types";
import axios from "axios";
import { parseError } from "@/lib/util/server_util";
import { supabase } from "@/lib/supabase/client";
import Loading from "../ui/loading";
import dynamic from "next/dynamic";
import Message from "../ui/message";
import { config } from "@/lib/config";

const GoogleAuthButton = dynamic(
  () => import('@/components/auth/google-button'),
  { ssr: false },
);

export default function SignUp() {
  const [status, setStatus] = useState<{ status: 'success' | 'success-page' | 'error' | 'loading' | 'page-loading' | 'null', message: string }>({ status: 'page-loading', message: '' })

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setStatus({ status: 'null', message: '' });
  }, []);

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

    const reqBody: SignUpArgs = {
      email: email,
      password: password,
      name: name,
    };

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60);

    axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/signup`, reqBody, { signal: controller.signal })
      .then(res => {
        setStatus({ status: res.data.status, message: res.data.message });

        setStatus({ status: 'success-page', message: '' });
      })
      .catch(err => {
        if (err.response) {
          console.log('Page /signup signup error: ', err);
          (async () => {
            setStatus({ status: 'error', message: await parseError(err.response.data.message) });
          })();
        } else {
          console.log('Page /signup signup error: ', err);
          (async () => {
            setStatus({ status: 'error', message: await parseError(err.message) });
          })();
        }
      });
  }

  // Fixed Google auth callback - matches the working sign-in implementation
  const handleGoogleAuthResponse = useCallback(async (response: any) => {
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

      // Check if this is a new user by trying to create their profile
      setStatus({ status: 'loading', message: 'Setting up your account...' });

      const reqBody: CreateUserArgs = {
        userId: auth_data.user.id,
        email: auth_data.user.email,
        name: auth_data.user.user_metadata?.full_name,
      };

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60);

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/profile`, reqBody, {
          signal: controller.signal
        });

        setStatus({ status: 'success', message: 'Successfully signed up with Google! Welcome to TradeSpace.' });

        // redirect after successful signup
        setTimeout(() => {
          window.location.href = config.app.default_route;
        }, 2000);

      } catch (err: any) {
        console.log('Page /signup google auth create user error: ', err);
        setStatus({ status: 'error', message: await parseError(err.message) });
      }

    } catch (error: any) {
      console.log('Google auth error: ', error);
      setStatus({ status: 'error', message: 'There was an error with Google authentication. Please try again.' });
    }
  }, []);

  if (status.status === 'page-loading') {
    return <Loading message={'Loading...'} />;
  }

  if (status.status === 'success-page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 relative overflow-hidden font-sans flex items-center justify-center">

        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"></div>

        <div className="bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 hover:bg-white/35 transition-all duration-500 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Link href="/">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight cursor-pointer hover:underline">
                Welcome to TradeSpace! 🎉
              </h1>
            </Link>
            <p className="text-gray-700 font-semibold">
              Please check your email to confirm your account
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
              We've sent a confirmation link to your email address. Click the link to activate your account and start trading with your neighbors!
            </p>

            <a
              href="/auth/sign-in"
              className="inline-block w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-2xl font-extrabold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl tracking-tight"
            >
              Continue to Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 relative overflow-hidden font-sans flex items-center justify-center">
      {/* Custom font styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Nunito', 'Comic Neue', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
          TradeSpace
        </h1>
      </div>

      <div className="bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8 hover:bg-white/35 transition-all duration-500 max-w-md w-full mx-4">
        {status.status === 'success' && (
          <div className="mb-4">
            <Message color="green" className="text-center">{status.message}</Message>
          </div>
        )}
        {status.status === 'error' && (
          <div className="mb-4">
            <Message color="red" className="text-center">{status.message}</Message>
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Join TradeSpace
          </h2>
          <p className="text-gray-700 font-semibold">
            Start trading with your neighbors today
          </p>
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
              className="w-full rounded-xl border-0 bg-white/40 backdrop-blur-sm px-4 py-3 text-gray-800 font-semibold placeholder-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md"
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
              className="w-full rounded-xl border-0 bg-white/40 backdrop-blur-sm px-4 py-3 text-gray-800 font-semibold placeholder-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md"
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
              className="w-full rounded-xl border-0 bg-white/40 backdrop-blur-sm px-4 py-3 text-gray-800 font-semibold placeholder-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-md"
              placeholder="Create a secure password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-2xl font-extrabold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-gray-700 font-semibold">
            Already have an account?{' '}
            <a href="/auth/sign-in" className="text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}