'use client';

import { useEffect, useRef, useState } from 'react';

const LOADING_MESSAGES = [
  'Building connections in your neighborhood...',
  'Finding amazing trades nearby...',
  'Connecting neighbors through skills...',
  'Creating community bonds...',
  'Discovering local talent...',
  'Strengthening neighborhood networks...',
  'Fostering local collaboration...',
  'I built a better loading screen Kevin!',
  'Facilitating skill exchanges...',
  'Building a sharing economy...',
  'Connecting like-minded neighbors...',
  'Making communities stronger...',
  'Enabling cashless trades...',
];

export default function Loading({ message }: { message?: string | null }) {
  const [randomMessage, setRandomMessage] = useState<string>('Connecting neighbors through skills...');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRandomMessage(prev => {
        const currentIndex = LOADING_MESSAGES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 md:p-12">
      {/* Background with a subtle gradient using the new color scheme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-purple-600 to-yellow-400 opacity-10"></div>

      {/* Loading Container */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl md:p-12">
        {/* TradeSpace Title with the new gradient */}
        <div className="mb-6">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Trade
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
          </h1>
        </div>

        {/* Loading Message */}
        {message && (
          <div className="mb-6">
            <p className="text-lg font-bold text-gray-800">{message}</p>
          </div>
        )}

        {/* Loading Dots Animation - colors match the new palette */}
        <div className="mb-6 flex justify-center space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-600" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-pink-600" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Encouraging Message with the new gradient text effect */}
        <p className="bg-clip-text text-lg font-semibold text-gray-800">{randomMessage}</p>
      </div>
    </div>
  );
}
