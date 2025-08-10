'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import { useAuth } from '@/components/auth/auth-provider';
import Loading from '@/components/ui/loading';
import JobsList from '@/components/jobs/job-list';
import FloatingMessage from '@/components/ui/floating-message';
import AuthProtecter from '@/components/auth/auth-protecter';

export default function Dashboard() {
  const [status, setStatus] = useState<{ status: 'loading' | 'success' | 'error' | 'message' | 'null'; message: string }>({
    status: 'loading',
    message: '',
  });
  const { user } = useAuth();

  const userName = useMemo(() => {
      return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
  }, [user?.data?.user_metadata?.name, user?.data?.email]);

  const userEmail = useMemo(() => {
      return user?.data?.email || "no email set";
  }, [user?.data?.email]);

  useEffect(() => {
    if (user.loading) return;

    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeMessage');
    if (!hasSeenWelcome) {
      setStatus({ status: 'message', message: `Welcome back, ${userName}! 🎉` });
      localStorage.setItem('hasSeenWelcomeMessage', 'true');
    } else {
      setStatus({ status: 'null', message: '' });
    }
  }, [user]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (status.status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed position */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: userEmail,
          email: user?.data?.email || 'no email set',
        }}
      />

      {/* Header - Fixed position */}
      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: userEmail,
          email: user?.data?.email || 'no email set',
        }}
      />

      {/* Floating Messages Container */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} pointer-events-none top-20 right-0 z-[60]`}>
        {status.message && status.message.trim() !== '' && (
          <div className="pointer-events-auto flex justify-center pt-4">
            <FloatingMessage type="success">
              Welcome back, {userEmail}! 🎉
            </FloatingMessage>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className={`fixed top-20 bottom-0 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} w-full overflow-y-auto`}
            style={{ width: sidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 4rem)' }}>
        <div className="p-6">
          {/* Quick Description */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">Discover and manage your skill-based trading opportunities</p>
          </div>
          
          <JobsList setStatus={setStatus} />
        </div>
      </main>
    </div>
  );
}