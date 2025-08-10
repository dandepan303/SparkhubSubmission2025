'use client';

import { useAuth } from '@/components/auth/auth-provider';
import JobsList from '@/components/jobs/job-list';
import FloatingMessage from '@/components/ui/floating-message';
import { Job, JobGetRet } from '@/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();

  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'loading'; message: string }>({ status: 'loading', message: '' });

  const [jobsCreated, setJobsCreated] = useState<Job[]>([]);
  const [jobsWorking, setjobsWorking] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Job[]>([]);

  const { profile } = useAuth();

  useEffect(() => {
    if (profile.loading) return;

    if (!profile) {
      router.push('auth/sign-in/?message=Please+sign+in+first');
      return;
    }

    setJobsCreated(profile.data.jobsCreated || []);
    setjobsWorking(profile.data.jobsWorking || []);
    setApplications(profile.data.applications || []);
  }, [profile, router]);

  return (
    <div className="text-black">
      {status.message && status.message.trim() !== '' && <FloatingMessage>{status.message}</FloatingMessage>}

      <h2>Hiring</h2>
      {jobsCreated.length === 0 && <span>You are not hiring any jobs</span>}
      {jobsCreated.length > 0 && <JobsList setStatus={setStatus} providedJobs={jobsCreated}></JobsList>}

      <h2>Working</h2>
      {jobsWorking.length === 0 && <span>You are not working any jobs</span>}
      {jobsWorking.length > 0 && <JobsList setStatus={setStatus} providedJobs={jobsWorking}></JobsList>}

      <h2>Applications</h2>
      {applications.length === 0 && <span>You are not applied to any jobs</span>}
      {applications.length > 0 && <JobsList setStatus={setStatus} providedJobs={applications}></JobsList>}
    </div>
  );
}
