'use client';

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import UserCard from "@/components/profile/user-card";
import Loading from "@/components/ui/loading";
import { parseError } from "@/lib/util/server_util";
import { Job, JobGetRet } from "@/types";
import { MdArrowBack, MdPeople, MdCheckCircle, MdError } from "react-icons/md";
import axios from "axios";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('id');
  const { session } = useAuth();
  
  const [status, setStatus] = useState<{ 
    status: 'success' | 'error' | 'null' | 'loading' | 'page-loading', 
    message: string 
  }>({ status: 'page-loading', message: '' });
  
  const [job, setJob] = useState<Job | null>(null);

  const loadJob = useCallback(async () => {
    if (!jobId) {
      setStatus({ status: 'error', message: 'This job does not exist anymore' });
      return;
    }

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout
      
      const { data: res }: { data: JobGetRet } = await axios.get(`/api/job?id=${jobId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      if (!res || !res.jobs || res.jobs.length === 0) {
        setStatus({ status: 'error', message: 'There was an issue loading the job applications' });
        return;
      }

      setStatus({ status: 'null', message: '' });
      setJob(res.jobs[0]);
    } catch (error: any) {
      console.error('/component/inventory fetch_offering error');
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue loading the inventory' });
    }
  }, [jobId, session?.data?.access_token]);

  useEffect(() => {
    if (session.loading) return;
    loadJob();
  }, [session.loading, loadJob]);

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  // Helper function for more robust application checking
  const hasApplications = (job: Job | null): boolean => {
    return Boolean(job?.applications && Array.isArray(job.applications) && job.applications.length > 0);
  };

  const getApplicationCount = (job: Job | null): number => {
    if (!job?.applications || !Array.isArray(job.applications)) return 0;
    return job.applications.length;
  };

  if (status.status === 'page-loading') {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute h-64 w-64 rounded-full bg-white/20 blur-3xl -top-32 -left-32"></div>
          <div className="absolute h-96 w-96 rounded-full bg-white/10 blur-3xl top-20 right-10"></div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={handleBackToDashboard}
            className="mb-6 flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:scale-105"
          >
            <MdArrowBack className="text-lg" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="text-center">
            <h1 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              Job Applications
            </h1>
            {job && (
              <p className="mx-auto max-w-2xl text-lg text-blue-100">
                {job.title}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Error State */}
        {status.status === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <MdError className="text-2xl text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-red-900">Error Loading Applications</h2>
            <p className="mb-6 text-red-700">{status.message}</p>
            <button
              onClick={handleBackToDashboard}
              className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-red-800 hover:scale-105"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Worker Already Chosen State */}
        {job?.worker && (
          <div className="rounded-2xl border border-gray-200/20 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <MdCheckCircle className="text-2xl text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Position Filled</h2>
              <p className="text-gray-600">This job has already been assigned to a worker.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Hirer Card */}
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                <h3 className="mb-3 text-lg font-bold text-blue-900">Job Poster</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    {job.hirer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">{job.hirer.name}</p>
                    <p className="text-sm text-blue-700">Hirer</p>
                  </div>
                </div>
              </div>

              {/* Worker Card */}
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
                <h3 className="mb-3 text-lg font-bold text-green-900">Selected Worker</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                    {job.worker.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">{job.worker.name}</p>
                    <p className="text-sm text-green-700">Worker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Applications State - Using helper function for more robust checking */}
        {job && !hasApplications(job) && !job.worker && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <MdPeople className="text-2xl text-gray-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">No Applications Yet</h2>
            <p className="mb-6 text-gray-600">
              No one has applied to this job yet. Applications will appear here when they're submitted.
            </p>
            <button
              onClick={() => router.push('/jobs')}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
            >
              View Other Jobs
            </button>
          </div>
        )}

        {/* Applications List - Modified to show one applicant per row */}
        {hasApplications(job) && !job?.worker && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <MdPeople className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                    <p className="text-gray-600">
                      {getApplicationCount(job)} candidate{getApplicationCount(job) !== 1 ? 's' : ''} applied
                    </p>
                  </div>
                </div>
              </div>

              {/* Applications List - One per row */}
              <div className="space-y-4">
                {job?.applications?.map((user, index) => (
                  <div key={user.id || index} className="transform transition-all duration-200 hover:scale-[1.02]">
                    <UserCard 
                      user={user} 
                      jobId={job.id} 
                      setStatus={setStatus} 
                      loadJob={loadJob}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {status.message && (
          <div className={`mt-6 rounded-xl p-4 ${
            status.status === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}