"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Job, JobGetRet } from "@/types";
import JobCard from "@/components/jobs/job-card";
import { useAuth } from "@/components/auth/auth-provider";

export default function JobsList({ setStatus, providedJobs }: { setStatus: any; providedJobs?: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(providedJobs || []);

  const { session } = useAuth();

  const loadJobs = useCallback(async () => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

    const { data: res }: { data: JobGetRet } = await axios.get(`/api/job/`, {
      signal: controller.signal,
      withCredentials: true,
      validateStatus: () => true,
      headers: { Authorization: `Bearer ${session?.data.access_token}` },
    });

    setJobs(res.jobs || []);
  }, [session?.data.access_token]);

  useEffect(() => {
    if (session.loading) return;
    if (providedJobs) return;

    loadJobs();
  }, [session.loading, providedJobs, loadJobs]);

  return (
    <div>
      {jobs.length === 0 && <span>No jobs right now. Check again later</span>}
      {jobs.length > 0 && jobs.map(job => (
        <JobCard key={job.id} job={job} setStatus={setStatus} />
      ))}
    </div>
  );
}
