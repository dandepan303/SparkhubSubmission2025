'use client';
import { useAuth } from '@/components/auth/auth-provider';
import Inventory from '@/components/inventory/inventory';
import Loading from '@/components/ui/loading';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoWarning } from 'react-icons/io5';

export default function InventoryPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchParamUserId = searchParams.get('userId');

  const [status, setStatus] = useState<{ status: 'inventory' | 'loading' | 'error'; message?: string; userId?: string }>({ status: 'loading' });

  const { profile } = useAuth();

  useEffect(() => {
    if (!profile.loading) {
      if (searchParamUserId) {
        setStatus({ status: 'inventory', userId: searchParamUserId });
      } else if (profile && profile.data.id) {
        setStatus({ status: 'inventory', userId: profile.data.id });
      } else {
        setStatus({
          status: 'error',
          message: "Please sign in or choose another user's inventory to display",
        });
      }
    }
  }, [profile, searchParamUserId]);

  if (status.status === 'loading') {
    return <Loading />;
  }

  if (status.status === 'error') {
    return <ErrorPage message={status.message} onSignIn={() => router.push('/auth/sign-in')} />;
  }

  return <Inventory userId={status.userId} />;
}

function ErrorPage({ message, onSignIn }: { message?: string, onSignIn: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-white flex items-center justify-center relative">
      {/* Background Gradient Effects */}
      <div
        className="absolute h-96 w-96 rounded-full opacity-40 blur-3xl transition-all duration-500"
        style={{
          background: `radial-gradient(circle, 
            rgba(239, 68, 68, 0.6) 0%, 
            rgba(147, 51, 234, 0.4) 35%, 
            rgba(59, 130, 246, 0.3) 70%, 
            transparent 100%)`,
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />
      <div
        className="absolute h-72 w-72 rounded-full opacity-30 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, 
            rgba(251, 191, 36, 0.5) 0%, 
            rgba(168, 85, 247, 0.4) 50%, 
            transparent 100%)`,
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />

      {/* Error Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Error Icon with 3D Effect */}
        <div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-2xl transition-transform duration-300"
          style={{
            boxShadow: '0 25px 50px rgba(239, 68, 68, 0.4)',
            transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
        >
          <IoWarning className="w-12 h-12 text-white" />
        </div>

        {/* Error Title */}
        <h1 className="mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
          Oops!
          <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Something's Not Right
          </span>
        </h1>

        {/* Error Message */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <p className="text-lg text-gray-700 leading-relaxed">
            {message || "We couldn't load your inventory right now."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onSignIn}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl"
            style={{
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            }}
          >
            Sign In to Continue
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="rounded-xl border-2 border-gray-300 bg-white/80 px-8 py-4 text-lg font-bold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:border-gray-400"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? 
            <span className="ml-1 font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
              Contact Support
            </span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 text-6xl opacity-10 animate-pulse">📦</div>
      <div className="absolute bottom-20 right-20 text-4xl opacity-10 animate-pulse">🔍</div>
      <div className="absolute top-1/3 right-10 text-5xl opacity-10 animate-pulse">⚠️</div>
    </div>
  );
}