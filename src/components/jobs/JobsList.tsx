"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Job, JobGetRet } from "@/types";
import JobCard from "@/components/jobs/Job";
import { useAuth } from "@/components/auth/auth-provider";

export default function JobsList({ parentSetStatus }: {parentSetStatus: any}) {
    const [status, setStatus] = useState<{ status: "loading" | "succes" | "error" | "null"; message: string }>({ status: "loading", message: "Currently loading jobs" });

    const [jobs, setJobs] = useState<Job[]>([]);

    const { session, loading } = useAuth();

    const loadJobs = useCallback(async () => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

        const { data: res }: { data: JobGetRet } = await axios.get(`/api/job/`, {
            signal: controller.signal,
            withCredentials: true,
            validateStatus: () => true,
            headers: { Authorization: `Bearer ${session?.access_token}` },
        });

        setJobs(res.jobs);
    }, [session?.access_token]);

    useEffect(() => {
        if (loading) return;

        loadJobs();
    }, [loading, loadJobs]);

    return (
        <div>
            {jobs.length === 0 && <span>No jobs right now. Check again later</span>}
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} setStatus={parentSetStatus} />
            ))}
        </div>
    );
}
