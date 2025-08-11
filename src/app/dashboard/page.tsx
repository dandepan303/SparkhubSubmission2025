'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import { useAuth } from '@/components/auth/auth-provider';
import { useSidebar } from '@/components/context/sidebar-context';
import JobsList from '@/components/jobs/job-list';
import FloatingMessage from '@/components/ui/floating-message';
import Loading from '@/components/ui/loading';
import { Job } from '@/types';
import { MdWork, MdAssignment, MdPerson, MdBusiness } from 'react-icons/md';

export default function Dashboard() {
  const router = useRouter();
  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'loading'; message: string }>({ 
    status: 'loading', 
    message: '' 
  });
  const [jobsCreated, setJobsCreated] = useState<Job[]>([]);
  const [jobsWorking, setJobsWorking] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Job[]>([]);
  const { profile, user } = useAuth();
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();

  const userName = useMemo(() => {
    return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
  }, [user?.data?.user_metadata?.name, user?.data?.email]);

  useEffect(() => {
    if (profile.loading) return;

    if (!profile.data) {
      router.push('auth/sign-in/?message=Please+sign+in+first');
      return;
    }

    setJobsCreated(profile?.data?.jobsCreated || []);
    setJobsWorking(profile?.data?.jobsWorking || []);
    setApplications(profile?.data?.applications || []);
    setStatus({ status: 'success', message: '' });
  }, [profile, router]);

  if (profile.loading || status.status === 'loading') {
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
      
      {/* Floating Message */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'} left-0 pointer-events-none top-20 right-0 z-[60]`}>
        {status.message && status.message.trim() !== '' && (
          <div className="pointer-events-auto flex justify-center pt-4">
            <FloatingMessage type="success">
              {status.message}
            </FloatingMessage>
          </div>
        )}
      </div>

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} pb-20 lg:pb-0`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 lg:pt-24">
          {/* Header Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute h-64 w-64 rounded-full bg-white/20 blur-3xl -top-32 -left-32"></div>
              <div className="absolute h-96 w-96 rounded-full bg-white/10 blur-3xl top-20 right-10"></div>
            </div>

            <div className="relative mx-auto max-w-6xl text-center">
              <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-6xl">
                Dashboard
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-blue-100">
                Manage all your TradeSpace activities in one place
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-6xl px-6 py-12">
            {/* Stats Overview */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <MdBusiness className="text-xl" />
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">{jobsCreated.length}</h3>
                  <p className="text-sm font-medium text-gray-600">Jobs You're Hiring</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-gray-200/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white">
                    <MdWork className="text-xl" />
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">{jobsWorking.length}</h3>
                  <p className="text-sm font-medium text-gray-600">Jobs You're Working</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-gray-200/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                    <MdAssignment className="text-xl" />
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">{applications.length}</h3>
                  <p className="text-sm font-medium text-gray-600">Applications Sent</p>
                </div>
              </div>
            </div>

            {/* Jobs Sections */}
            <div className="space-y-12">
              {/* Hiring Section */}
              <section className="relative">
                <div className="mb-8 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    <MdBusiness className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Jobs You're Hiring</h2>
                    <p className="text-gray-600">Manage positions you've created</p>
                  </div>
                </div>

                {jobsCreated.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                      <MdBusiness className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No jobs posted yet</h3>
                    <p className="mb-4 text-gray-600">Start by creating your first job posting</p>
                    <button
                      onClick={() => router.push('/create-job')}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                    >
                      Create First Job
                    </button>
                  </div>
                ) : (
                  <JobsList setStatus={setStatus} providedJobs={jobsCreated} />
                )}
              </section>

              {/* Working Section */}
              <section className="relative">
                <div className="mb-8 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg">
                    <MdWork className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Jobs You're Working</h2>
                    <p className="text-gray-600">Active positions you're employed in</p>
                  </div>
                </div>

                {jobsWorking.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                      <MdWork className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No active work</h3>
                    <p className="mb-4 text-gray-600">Browse available jobs to start working</p>
                    <button
                      onClick={() => router.push('/discover-jobs')}
                      className="rounded-xl bg-gradient-to-r from-green-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-teal-700 hover:scale-105"
                    >
                      Find Jobs
                    </button>
                  </div>
                ) : (
                  <JobsList setStatus={setStatus} providedJobs={jobsWorking} />
                )}
              </section>

              {/* Applications Section */}
              <section className="relative">
                <div className="mb-8 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg">
                    <MdAssignment className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Applications</h2>
                    <p className="text-gray-600">Track jobs you've applied to</p>
                  </div>
                </div>

                {applications.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                      <MdAssignment className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No applications sent</h3>
                    <p className="mb-4 text-gray-600">Apply to jobs that interest you</p>
                    <button
                      onClick={() => router.push('/discover-jobs')}
                      className="rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-pink-700 hover:to-rose-700 hover:scale-105"
                    >
                      Browse Jobs
                    </button>
                  </div>
                ) : (
                  <JobsList setStatus={setStatus} providedJobs={applications} />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}