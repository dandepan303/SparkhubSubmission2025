'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import Loading from '@/components/ui/loading'; // Import the Loading component
import FloatingMessage from '@/components/ui/floating-message';

export default function TradeSpaceLanding() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTrade, setSelectedTrade] = useState('Fresh vegetables from garden');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInPressed, setIsSignInPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Renamed state to avoid conflict with `isPageLoading`

  const router = useRouter();
  const { user } = useAuth();

  const tradeOptions = [
    'Fresh vegetables from garden',
    'Guitar lesson (1 hour)',
    'Car wash and vacuum',
    'House cleaning service',
    'Dog walking',
    'Cooking lesson',
  ];

  useEffect(() => {
    // This useEffect is now solely responsible for setting the loading state
    // after the initial render, ensuring the component doesn't show loading
    // on subsequent renders or after the auth check is complete.
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  const handleSignIn = () => {
    setIsSignInPressed(true);
    setTimeout(() => {
      setIsSignInPressed(false);
      router.push('/auth/sign-in');
    }, 200); // Duration of the animation
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up');
  };

  const handleStartTrading = () => {
    router.push('/auth/sign-up');
  };

  const rotateX = mousePosition.y * -15;
  const rotateY = mousePosition.x * 15;

  // Conditional rendering: show the Loading component until the component has finished its initial render
  if (isLoading) {
    return <Loading message={null} />;
  }

  // Render the full landing page content
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {message && message.trim() !== '' && <FloatingMessage>{message}</FloatingMessage>}

      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-200/20 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-md md:px-12 md:py-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
          Trade
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
        </h1>
        <div className="flex space-x-3">
          {user ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700">
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className={`px-3 py-1 text-sm font-semibold text-gray-700 transition-all duration-200 md:px-4 md:py-2 md:text-base ${isSignInPressed ? 'scale-95 text-gray-900' : 'hover:text-gray-900'}`}>
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="rounded-full border border-gray-300 bg-gray-100 px-5 py-1 text-sm font-bold text-gray-800 shadow-lg transition-all duration-300 hover:bg-gray-200 md:px-6 md:py-2 md:text-base">
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section - Added top padding to account for fixed header */}
      <div className="px-6 pt-24 pb-4 text-center md:pt-32 md:pb-8">
        <h2 className="mb-2 text-3xl font-black tracking-tight text-gray-900 md:mb-4 md:text-6xl">
          Trade Skills,
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Build Community</span>
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-gray-600 md:mb-8 md:text-xl">
          Skip the cash. Exchange your skills, services, and expertise with neighbors. From lawn care to coding lessons, turn what you know into what
          you need.
        </p>
      </div>

      {/* 3D Card Container with Gradient */}
      <div className="relative flex h-[calc(100vh-250px)] items-center justify-center px-6 py-4 md:h-96 md:py-8">
        {/* Multiple Gradient Layers for Intense Glow */}
        <div
          className="absolute h-64 w-72 rounded-full opacity-60 blur-3xl transition-all duration-300 md:h-80 md:w-96"
          style={{
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.8) 0%, 
              rgba(147, 51, 234, 0.6) 35%, 
              rgba(236, 72, 153, 0.4) 70%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
        <div
          className="absolute h-56 w-64 rounded-full opacity-50 blur-2xl transition-all duration-300 md:h-64 md:w-80"
          style={{
            background: `radial-gradient(circle, 
              rgba(34, 197, 94, 0.7) 0%, 
              rgba(168, 85, 247, 0.5) 50%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          }}
        />
        <div
          className="absolute h-40 w-56 rounded-full opacity-40 blur-xl transition-all duration-300 md:h-48 md:w-64"
          style={{
            background: `radial-gradient(circle, 
              rgba(251, 191, 36, 0.8) 0%, 
              rgba(239, 68, 68, 0.6) 60%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />

        {/* 3D Card */}
        <div
          className="relative h-72 w-72 transition-transform duration-300 ease-out md:h-80 md:w-80"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}>
          {/* Card Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-gray-200 p-4 md:p-6"
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              transform: 'translateZ(20px)',
            }}>
            {/* Lawn Mowing Icon */}
            <div className="mb-2 md:mb-3">
              <div className="flex h-10 w-10 items-center justify-center text-3xl md:h-12 md:w-12 md:text-4xl">🚜</div>
            </div>

            {/* Content */}
            <h2 className="mb-1 text-center text-base font-bold tracking-tight text-gray-800 md:text-lg">Lawn Mowing Service</h2>

            {/* Estimated Value */}
            <p className="mb-2 text-xs font-semibold text-green-600 md:text-sm">Estimated Value: $15</p>

            {/* Arrow pointing down */}
            <div className="mb-2">
              <svg className="mx-auto h-3 w-3 text-gray-500 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Trade Dropdown */}
            <div className="relative z-10 mt-1 w-full">
              <label className="mb-2 block text-center text-xs font-semibold text-gray-600">Trade for:</label>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white/80 px-2 py-1 text-left text-xs font-medium text-gray-800 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/90 md:px-3 md:py-2">
                <span className="flex-1 truncate text-center">{selectedTrade}</span>
                <svg
                  className={`ml-2 h-3 w-3 flex-shrink-0 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-32 overflow-y-auto rounded-lg border border-gray-300 bg-white/95 shadow-xl backdrop-blur-sm">
                  {tradeOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedTrade(option);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-medium text-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100/80">
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Start Trading Button */}
            <div className="mt-3 w-full md:mt-4">
              <button
                onClick={handleStartTrading}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
                Start Trading
              </button>
            </div>
          </div>

          {/* Card Back (for 3D depth) */}
          <div
            className="absolute inset-0 rounded-2xl border border-gray-300 bg-gray-100"
            style={{
              transform: 'translateZ(-20px)',
            }}></div>
        </div>
      </div>

      {/* The rest of your content (Features Section and CTA Section) remains the same */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">How TradeSpace Works</h3>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Connect with your community through skill-based trading. No money required—just your time and expertise.
        </p>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group text-center">
            <div
              className="mx-auto mb-6 flex h-20 w-20 transform items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 transition-all duration-300 hover:scale-110 hover:rotate-3"
              style={{
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              }}>
              <span className="text-3xl">📝</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-gray-900">List Your Skills</h4>
            <p className="leading-relaxed text-gray-600">
              Share what you're great at—from home repairs to music lessons. Set your availability and what you'd like in return.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group text-center">
            <div
              className="mx-auto mb-6 flex h-20 w-20 transform items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 transition-all duration-300 hover:scale-110 hover:-rotate-3"
              style={{
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
              }}>
              <span className="text-3xl">🔍</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-gray-900">Find What You Need</h4>
            <p className="leading-relaxed text-gray-600">
              Browse local services and skills. Connect with neighbors who can help with tasks you don't enjoy or don't know how to do.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group text-center">
            <div
              className="mx-auto mb-6 flex h-20 w-20 transform items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 transition-all duration-300 hover:scale-110 hover:rotate-3"
              style={{
                boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
              }}>
              <span className="text-3xl">🤝</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-gray-900">Make the Trade</h4>
            <p className="leading-relaxed text-gray-600">
              Arrange the exchange directly with your trade partner. Build trust and lasting relationships in your community.
            </p>
          </div>
        </div>

        {/* Popular Trades */}
        <div className="rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 md:p-12">
          <h4 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">Popular Skill Exchanges</h4>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🏠', title: 'Home Services', desc: 'Repairs, cleaning, organizing' },
              { icon: '🎓', title: 'Tutoring & Lessons', desc: 'Music, languages, coding' },
              { icon: '🌱', title: 'Gardening & Yard', desc: 'Landscaping, plant care' },
              { icon: '🍳', title: 'Cooking & Baking', desc: 'Meal prep, special dishes' },
              { icon: '🎨', title: 'Creative Services', desc: 'Design, photography, crafts' },
              { icon: '💻', title: 'Tech Support', desc: 'Setup, troubleshooting, training' },
              { icon: '🐕', title: 'Pet Care', desc: 'Walking, sitting, grooming' },
              { icon: '🚗', title: 'Transportation', desc: 'Moving help, car maintenance' },
            ].map((trade, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="mb-2 text-3xl">{trade.icon}</div>
                <h5 className="mb-1 font-semibold text-gray-900">{trade.title}</h5>
                <p className="text-sm text-gray-600">{trade.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Start Trading?</h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Join thousands of neighbors who've discovered the power of skill-sharing. Your next great trade is just a click away.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleStartTrading}
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Get Started Free
            </button>
            <button
              onClick={() => {
                /* Add learn more functionality */
              }}
              className="rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-gray-900">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}