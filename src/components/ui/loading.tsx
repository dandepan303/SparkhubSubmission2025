'use client'

import { useEffect, useState } from "react";

export default function Loading({ message }: { message: string | null }) {
  const loadingMessages = [
    "Building connections in your neighborhood...",
    "Finding amazing trades nearby...",
    "Connecting neighbors through skills...",
    "Creating community bonds...",
    "Discovering local talent...",
    "Strengthening neighborhood networks...",
    "Facilitating skill exchanges...",
    "Building a sharing economy...",
    "Connecting like-minded neighbors...",
    "Making communities stronger...",
    "Enabling cashless trades...",
    "Fostering local collaboration...",
    "I built a better loading screen Kevin!"
  ];
  
  // Get random message immediately, not in useEffect
  const [randomMessage, setRandomMessage] = useState<string>("Connecting neighbors through skills...")
  
  useEffect(() => { 
    const interval = setInterval(() => { 
      const randomI = Math.floor(Math.random() * loadingMessages.length);
      setRandomMessage(loadingMessages[randomI]);
    })
  })

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 relative overflow-hidden font-sans">
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
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Loading Container */}
      <div className="bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 text-center max-w-md w-full mx-4">
        
        {/* TradeSpace Logo/Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
            TradeSpace
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mx-auto"></div>
        </div>

        {/* Loading Message */}
        {message && (
          <div className="mb-6">
            <p className="text-lg font-bold text-gray-800 mb-2">
              {message}
            </p>
          </div>
        )}

        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Encouraging Message */}
        <p className="text-gray-700 font-semibold text-sm leading-relaxed">
          {randomMessage}
        </p>
      </div>
    </div>
  );
}