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

export default function Dashboard() {
  const router = useRouter();
  const [status, setStatus] = useState<{ status: 'loading' | 'authenticated' | 'unauthenticated' }>({ status: 'loading' });
  const { user, loading } = useAuth();
  
  // State for floating messages
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showJobsMessage, setShowJobsMessage] = useState(false);
  
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      setStatus({ status: 'unauthenticated' });
      router.push('/');
      return;
    }
    
    setStatus({ status: 'authenticated' });
    
    // Show welcome message when user is authenticated
    setShowWelcomeMessage(true);
    
    // Show jobs message after a delay
    const timer = setTimeout(() => {
      setShowJobsMessage(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [loading, user, router]);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (status.status === 'loading') {
    return <Loading />;
  }
  
  if (status.status === 'unauthenticated') {
    return <Loading />; // Show loading while redirecting
  }
  
  // At this point, we know user is not null
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }}
      />
      
      {/* Header */}
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
        {showWelcomeMessage && (
          <div className="flex justify-center pt-4 pointer-events-auto">
            <FloatingMessage type="success">
              Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}! 🎉
            </FloatingMessage>
          </div>
        )}
        
        {showJobsMessage && (
          <div className="flex justify-center pt-2 pointer-events-auto">
            <FloatingMessage type="info">
              Your job applications are loading below
            </FloatingMessage>
          </div>
        )}
      </div>

      {/* Main Content Container */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-20`}>
        
        <div className="px-6 py-8">
          {/* Dashboard content area */}
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Track and manage your trades</p>
            </div>
            
            {/* Jobs List Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">idk bro</h2>
              <JobsList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}