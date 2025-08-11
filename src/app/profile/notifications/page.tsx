'use client'
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import { useAuth } from '@/components/auth/auth-provider';
import { useSidebar } from '@/components/context/sidebar-context';
import Loading from '@/components/ui/loading';
import NotificationsList from '@/components/profile/notifications/notifications-list';

export default function NotificationsPage() {
  const router = useRouter();
  const { profile, user } = useAuth();
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();

  const userName = useMemo(() => {
    return user?.data?.user_metadata?.name || user?.data?.email?.split('@')[0] || 'User';
  }, [user?.data?.user_metadata?.name, user?.data?.email]);

  useEffect(() => {
    if (profile.loading) return;

    if (!profile) {
      router.push('auth/sign-in/?message=Please+sign+in+first');
    }
  }, [profile, router]);

  if (profile.loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        user={{
          name: userName,
          email: user?.data?.email || 'No email set',
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
      
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} pb-20 lg:pb-0`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 lg:pt-24">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Notifications
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Stay up to date with your activity.
            </p>
            <NotificationsList />
          </div>
        </div>
      </main>
    </div>
  );
}