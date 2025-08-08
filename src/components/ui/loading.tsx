'use client';

import { useEffect, useRef, useState } from 'react';

export default function Loading({ message }: { message: string | null }) {
  const loadingMessages = [
    'Building connections in your neighborhood...',
    'Finding amazing trades nearby...',
    'Connecting neighbors through skills...',
    'Creating community bonds...',
    'Discovering local talent...',
    'Strengthening neighborhood networks...',
    'Facilitating skill exchanges...',
    'Building a sharing economy...',
    'Connecting like-minded neighbors...',
    'Making communities stronger...',
    'Enabling cashless trades...',
    'Fostering local collaboration...',
    'I built a better loading screen Kevin!',
  ];

  // Get random message immediately, not in useEffect
  const [randomMessage, setRandomMessage] = useState<string>('Connecting neighbors through skills...');

  // Cycle message every 2000ms
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const randomI = Math.floor(Math.random() * loadingMessages.length);
      setRandomMessage(loadingMessages[randomI]);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 font-sans">
      {/* Custom font styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Nunito', 'Comic Neue', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient {
          background: linear-gradient(-45deg, #10b981, #3b82f6, #8b5cf6, #ec4899);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 via-transparent to-purple-300/40"></div>
      <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-pink-300/30 blur-3xl"></div>
      <div className="absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-orange-200/40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-yellow-200/20 blur-3xl"></div>

      {/* Loading Container */}
      <div className="mx-4 w-full max-w-md rounded-3xl border border-white/30 bg-white/25 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        {/* TradeSpace Logo/Title */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl">TradeSpace</h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600"></div>
        </div>

        {/* Loading Message */}
        {message && (
          <div className="mb-6">
            <p className="mb-2 text-lg font-bold text-gray-800">{message}</p>
          </div>
        )}

        {/* Loading Dots Animation */}
        <div className="mb-6 flex justify-center space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Encouraging Message */}
        <p className="text-sm leading-relaxed font-semibold text-gray-700">{randomMessage}</p>
      </div>
    </div>
  );
}
