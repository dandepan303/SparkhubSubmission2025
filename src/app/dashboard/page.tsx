'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Import the components we created
import Sidebar from '@/components/dashboard/DashboardSidebar';
import Header from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/components/auth/auth-provider';
import Loading from '@/components/ui/loading';
import JobsList from '@/components/jobs/JobsList';
import FloatingMessage from '@/components/ui/floating-message';
import AuthProtecter from '@/components/auth/auth-protecter';

export default function Dashboard() {
  const [status, setStatus] = useState<{ status: 'loading' | 'success' | 'error' | 'message' | 'null', message: string }>({ status: 'loading', message: '' });
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (loading) return;

    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeMessage');
    if (!hasSeenWelcome) {
      setStatus({ status: 'message', message: `Welcome back, ${user?.user_metadata?.name || user?.email?.split('@')[0] || ''}! 🎉` });
      localStorage.setItem('hasSeenWelcomeMessage', 'true');
    } else {
      setStatus({status: 'null', message: ''});
    }
  }, [loading, user]);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (status.status === 'loading') {
    return <Loading />;
  }
  
  // At this point, we know user is not null
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed position */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }}
      />
      
      {/* Header - Fixed position */}
      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }}
      />
      
      {/* Floating Messages Container - Positioned after header */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} right-0 top-20 z-[60] pointer-events-none`}>
        {status.message && status.message.trim() !== '' && (
          <div className="flex justify-center pt-4 pointer-events-auto">
            <FloatingMessage type="success">
              Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}! 🎉
            </FloatingMessage>
          </div>
        )}
      </div>

      {/* Main Content Container - Scrollable area only */}
      <main className={`fixed top-20 bottom-0 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} right-0 overflow-y-auto bg-gray-50`}>
        <div className="min-h-full">
          {/* Dashboard content area */}
          <div className="p-6 space-y-6">
            {/* Dashboard Header */}
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Track and manage your trades</p>
            </div>
            
            {/* Jobs List Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">Jobs</h2>
              <div className="space-y-4">
                <JobsList parentSetStatus={ setStatus } />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}