"use client";
import FloatingMessage from '@/components/ui/floating-message';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function TradeSpaceLanding() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const [selectedTrade, setSelectedTrade] = useState('Fresh vegetables from garden');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tradeOptions = [
    'Fresh vegetables from garden',
    'Guitar lesson (1 hour)',
    'Car wash and vacuum'
  ];

  const handleSignIn = () => {
    window.location.href = '/auth/sign-in';
  };

  const handleSignUp = () => {
    window.location.href = '/auth/sign-up';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 relative overflow-hidden font-sans">
      {message && <FloatingMessage color={'blue'}>{message}</FloatingMessage>}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 py-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
          TradeSpace
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={handleSignIn}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base font-semibold"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="px-6 py-2 bg-white/40 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white/60 transition-all duration-300 text-sm md:text-base font-bold border border-white/60 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center px-6 py-8 md:py-16">
        <div className="max-w-lg w-full">
          {/* Trade Example Card */}
          <div className="bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8 hover:bg-white/35 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-6">
                {/* Lawn Mowing Icon */}
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
                  <div className="w-12 h-12 md:w-16 md:h-16 text-6xl md:text-7xl text-gray-700 flex items-center justify-center">
                    🚜
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                  Lawn Mowing Needed
                </h2>
                <p className="text-gray-700 text-sm md:text-base font-semibold">
                  idk what the fuck to put here bro kevin tell me
                </p>
              </div>

              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm md:text-base text-gray-700 font-bold">Estimated Value:</span>
                  <span className="font-extrabold text-gray-800 text-lg md:text-xl">25 Coins</span>
                </div>

                {/* Interactive Dropdown */}
                <div className="relative">
                  <label className="block text-gray-700 text-xs md:text-sm mb-2 font-bold">Trade for:</label>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-3 text-left text-gray-800 text-sm md:text-base hover:bg-white/60 transition-all duration-200 flex justify-between items-center font-semibold shadow-md"
                  >
                    <span className="truncate">{selectedTrade}</span>
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-xl border border-white/50 shadow-2xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
                      {tradeOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedTrade(option);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-800 hover:bg-white/80 transition-colors text-sm md:text-base first:rounded-t-xl last:rounded-b-xl font-semibold"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base font-medium">
                  Trade skills and services with your neighbors.<br />
                  <span className="font-extrabold text-gray-800">No cash needed.</span>
                </p>

                <button
                  onClick={handleSignUp}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 md:py-4 rounded-2xl font-extrabold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl text-sm md:text-base tracking-tight"
                >
                  Start Trading on TradeSpace
                </button>

              </div>

              {/* Feature Highlights inside glass bubble */}
              <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/40">
                <div className="text-center">
                  <h3 className="text-gray-800 font-bold text-sm mb-1 tracking-tight">Build Community</h3>
                  <p className="text-gray-700 text-xs leading-relaxed font-medium">Connect with neighbors through skill sharing</p>
                </div>
                <div className="text-center">
                  <h3 className="text-gray-800 font-bold text-sm mb-1 tracking-tight">Save Money</h3>
                  <p className="text-gray-700 text-xs leading-relaxed font-medium">Exchange skills instead of cash to reduce expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}