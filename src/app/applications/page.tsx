'use client'
import { useAuth } from "@/components/auth/auth-provider";
import UserCard from "@/components/profile/user-card";
import Loading from "@/components/ui/loading";
import { parseError } from "@/lib/util/server_util";
import { Job, JobGetRet } from "@/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const { session } = useAuth();
  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'null' | 'loading' | 'page-loading', message: string }>({ status: 'page-loading', message: ''});
  const [job, setJob] = useState<Job | null>(null);

  // Fix 1: Use useCallback to memoize loadJob and avoid dependency issues
  const loadJob = useCallback(async () => {
    if (!jobId) {
      setStatus({ status: 'error', message: 'This job does not exist anymore' });
      return;
    }
    
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout
      
      const { data: res }: { data: JobGetRet } = await axios.get(`/api/profile/?id=${jobId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data.access_token}` },
      });
      
      if (!res) {
        setStatus({ status: 'error', message: 'There was an issue loading the job applications' });
        return;
      }
      
      setStatus({ status: 'null', message: '' });
      setJob(res.jobs);
    } catch (error: any) {
      console.error('/component/inventory fetch_offering error');
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue loading the inventory' });
    }
  }, [jobId, session?.data.access_token]); // Include dependencies

  useEffect(() => {
    if (session.loading) return;
    loadJob();
  }, [session.loading, loadJob]); // Now loadJob is properly memoized

  if (status.status === 'page-loading') {
    return <Loading></Loading>;
  }

  return (
    <div>
      {(!job || !job.applications || job.applications.length === 0) && (
        <span>There are no applications for this job</span>
      )}
      {job?.applications && job.applications.length > 0 && 
        job.applications.map((user, index) => (
          <UserCard key={user.id || index} user={user}></UserCard>
        ))
      }
    </div>
  )
}