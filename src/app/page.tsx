'use client';
import FloatingMessage from '@/components/ui/floating-message';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function TradeSpaceLanding() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const [selectedTrade, setSelectedTrade] = useState('Fresh vegetables from garden');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tradeOptions = ['Fresh vegetables from garden', 'Guitar lesson (1 hour)', 'Car wash and vacuum'];

  const handleSignIn = () => {
    window.location.href = '/auth/sign-in';
  };

  const handleSignUp = () => {
    window.location.href = '/auth/sign-up';
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 font-sans">
      {message && <FloatingMessage color={'blue'}>{message}</FloatingMessage>}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"></div>
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-200/20 blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl">TradeSpace</h1>
        <div className="flex space-x-3">
          <button onClick={handleSignIn} className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 md:text-base">
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="rounded-full border border-white/60 bg-white/40 px-6 py-2 text-sm font-bold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/60 md:text-base">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-8 md:py-16">
        <div className="w-full max-w-lg">
          {/* Trade Example Card */}
          <div className="hover:shadow-3xl rounded-3xl border border-white/30 bg-white/25 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-white/35 md:p-8">
            <div className="mb-8 text-center">
              <div className="mb-6 flex items-center justify-center">
                {/* Lawn Mowing Icon */}
                <div className="rounded-2xl bg-white/30 p-6 shadow-lg backdrop-blur-sm md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center text-6xl text-gray-700 md:h-16 md:w-16 md:text-7xl">🚜</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="mb-3 text-xl font-bold tracking-tight text-gray-800 md:text-2xl">Lawn Mowing Needed</h2>
                <p className="text-sm font-semibold text-gray-700 md:text-base">idk what the fuck to put here bro kevin tell me</p>
              </div>

              <div className="rounded-2xl border border-white/40 bg-white/30 p-4 shadow-lg backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700 md:text-base">Estimated Value:</span>
                  <span className="text-lg font-extrabold text-gray-800 md:text-xl">25 Coins</span>
                </div>

                {/* Interactive Dropdown */}
                <div className="relative">
                  <label className="mb-2 block text-xs font-bold text-gray-700 md:text-sm">Trade for:</label>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/50 bg-white/40 px-4 py-3 text-left text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white/60 md:text-base">
                    <span className="truncate">{selectedTrade}</span>
                    <svg
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="custom-scrollbar absolute top-full right-0 left-0 z-50 mt-2 max-h-48 overflow-y-auto rounded-xl border border-white/50 bg-white/90 shadow-2xl backdrop-blur-xl">
                      {tradeOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedTrade(option);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-semibold text-gray-800 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-white/80 md:text-base">
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 text-center">
                <p className="mb-6 text-sm leading-relaxed font-medium text-gray-700 md:text-base">
                  Trade skills and services with your neighbors.
                  <br />
                  <span className="font-extrabold text-gray-800">No cash needed.</span>
                </p>

                <button
                  onClick={handleSignUp}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 py-3 text-sm font-extrabold tracking-tight text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-blue-700 md:py-4 md:text-base">
                  Start Trading on TradeSpace
                </button>
              </div>

              {/* Feature Highlights inside glass bubble */}
              <div className="mt-6 grid grid-cols-2 gap-6 border-t border-white/40 pt-6">
                <div className="text-center">
                  <h3 className="mb-1 text-sm font-bold tracking-tight text-gray-800">Build Community</h3>
                  <p className="text-xs leading-relaxed font-medium text-gray-700">Connect with neighbors through skill sharing</p>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-sm font-bold tracking-tight text-gray-800">Save Money</h3>
                  <p className="text-xs leading-relaxed font-medium text-gray-700">Exchange skills instead of cash to reduce expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
