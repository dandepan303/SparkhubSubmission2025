'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import { useAuth } from '@/components/auth/auth-provider';
import { useSidebar } from '@/components/context/sidebar-context'; // Import the hook
import Loading from '@/components/ui/loading';
import JobsList from '@/components/jobs/job-list';
import FloatingMessage from '@/components/ui/floating-message';

export default function Profile() {
  const [status, setStatus] = useState<{ status: 'loading' | 'success' | 'error' | 'message' | 'null'; message: string }>({
    status: 'loading',
    message: '',
  });

  const { user } = useAuth();
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar(); // Use the context

  const userName = useMemo(() => {
    return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
  }, [user?.data?.user_metadata?.name, user?.data?.email]);

  const userEmail = useMemo(() => {
    return user?.data?.email || "no email set";
  }, [user?.data?.email]);

  useEffect(() => {
    if (user.loading) return;

    setStatus({ status: 'null', message: '' });
  }, [user.loading, setStatus]);

  if (status.status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        user={{
          name: userName,
          email: user?.data?.email || 'no email set',
        }}
      />

      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
        user={{
          name: userName,
          email: user?.data?.email || 'no email set',
        }}
      />

      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'} left-0 pointer-events-none top-20 right-0 z-[60]`}>
        {status.message && status.message.trim() !== '' && (
          <div className="pointer-events-auto flex justify-center pt-4">
            <FloatingMessage type="success">
              Welcome back, {userName}! 🎉
            </FloatingMessage>
          </div>
        )}
      </div>

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} pt-20 lg:pt-24 pb-20 lg:pb-0`}>
        <div className="p-6">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Discover</span><a> Jobs</a>
            </h1>
            <p className="text-lg text-gray-600">Discover new trades and jobs others are offering</p>
          </div>
          <JobsList setStatus={setStatus} />
        </div>
      </main>
    </div>
  );
}