"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Job, JobGetRet } from "@/types";
import JobCard from "@/components/jobs/job-card";
import { useAuth } from "@/components/auth/auth-provider";

export default function JobsList({
  setStatus,
  providedJobs,
  showApplyNowParam,
}: {
  setStatus: any;
  providedJobs?: Job[];
  showApplyNowParam?: boolean;
}) {
  const [jobs, setJobs] = useState<Job[]>(providedJobs || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { session } = useAuth();

  const loadJobs = useCallback(async () => {
    setIsLoading(true);

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const { data: res }: { data: JobGetRet } = await axios.get(`/api/job/`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setJobs(res.jobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.data?.access_token]);

  useEffect(() => {
    if (session.loading) return;
    if (providedJobs) return;

    loadJobs();
  }, [session.loading, providedJobs, session?.data?.access_token]);

  // Simple Loading Screen
  const LoadingScreen = () => (
    <div className="flex min-h-[300px] items-center justify-center px-6 py-8">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 left-1/2 h-12 w-12 -translate-x-1/2 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">Loading Jobs</h3>
        <p className="text-gray-600">Discovering amazing opportunities...</p>
      </div>
    </div>
  );

  // Simple Empty State
  const EmptyState = () => (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900">No Jobs Available Yet</h3>
      <p className="mx-auto mb-8 max-w-md text-lg text-gray-600">Be the first to discover amazing opportunities! New jobs are posted regularly.</p>
      <button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105">
        Check Back Soon
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      {isLoading && <LoadingScreen />}

      {!isLoading && jobs.length === 0 && <EmptyState />}

      {!isLoading && jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} setStatus={setStatus} showApplyNowParam={showApplyNowParam} />
          ))}
        </div>
      )}
    </div>
  );
}
