'use client';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (user.loading) return;

    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeMessage');
    if (!hasSeenWelcome) {
      setStatus({ status: 'message', message: `Welcome back, ${user?.data.user_metadata?.name || user?.data.email?.split('@')[0] || ''}! 🎉` });
      localStorage.setItem('hasSeenWelcomeMessage', 'true');
    } else {
      setStatus({ status: 'null', message: '' });
    }
  }, [user]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (status.status === 'loading') {
    return <Loading />;
  }

  // At this point, we know user is not null
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed position */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.data.user_metadata?.name || user?.data.email?.split('@')[0] || 'User',
          email: user?.data.email || 'no email set',
        }}
      />

      {/* Header - Fixed position */}
      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.data.user_metadata?.name || user?.data.email?.split('@')[0] || 'User',
          email: user?.data.email || 'no email set',
        }}
      />

      {/* Floating Messages Container - Positioned after header */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} pointer-events-none top-20 right-0 z-[60]`}>
        {status.message && status.message.trim() !== '' && (
          <div className="pointer-events-auto flex justify-center pt-4">
            <FloatingMessage type="success">
              Welcome back, {user?.data.user_metadata?.name || user?.data.email?.split('@')[0] || 'User'}! 🎉
            </FloatingMessage>
          </div>
        )}
      </div>

      {/* Main Content Container - Scrollable area only */}
      <main className={`fixed top-20 bottom-0 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} right-0 overflow-y-auto bg-gray-50`}>
        <div className="min-h-full">
          {/* Dashboard content area */}
          <div className="space-y-6 p-6">
            {/* Dashboard Header */}
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Track and manage your trades</p>
            </div>

            {/* Jobs List Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">Jobs</h2>
              <div className="space-y-4">
                <JobsList setStatus={setStatus} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}