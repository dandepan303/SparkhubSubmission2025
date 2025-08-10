'use client';

import { useAuth } from '@/components/auth/auth-provider';
import Loading from '@/components/ui/loading';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, Job, JobGetRet, RateJobArgs, User } from '@/types';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function RatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'loading' | 'page-loading' | 'null'; message: string }>({
    status: 'page-loading',
    message: '',
  });

  const { user, session } = useAuth();
  const [job, setJob] = useState<Job | null>(null);

  const [ratingTo, setRatingTo] = useState<User | null>(null);

  useEffect(() => {
    if (!id) {
      router.push('/dashboard?message=Please select a job before rating the other person');
      return;
    }

    loadJob();
  }, [id]);

  useEffect(() => {
    if (user.loading || session.loading || !job) return;

    setStatus({ status: 'null', message: '' });
  }, []);

  const onRate = async (value: number, text?: string) => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const bodyData: RateJobArgs = {
        jobId: job.id,
        value: value,
        text: text,
      };

      const { data: res }: { data: DefaultAPIRet } = await axios.post(`/api/profile/rate/`, bodyData, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setStatus(res);
    } catch (error: any) {
      console.error('/app/rate load user error');
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue finding the job to be rated' });
    }
  };

  const loadJob = useCallback(async () => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const { data: res }: { data: JobGetRet } = await axios.get(`/api/job/?id=${id}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      if (!res || res.jobs.length === 0) {
        setStatus({ status: 'error', message: 'There was an issue loading the job to be rated' });
        return;
      }

      setStatus({ status: 'null', message: '' });
      setJob(res.jobs[0]);
      loadRatingTo(res.jobs[0]);
    } catch (error: any) {
      console.error('/app/rate load user error');
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue finding the job to be rated' });
    }
  }, [id, session, setStatus]);

  const loadRatingTo = useCallback(
    async (job: Job) => {
      const ratingToId = user.data.id === job.hirerId ? job.workerId : job.hirerId;

      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

        const {
          data: { user },
        }: { data: { user: User } } = await axios.get(`/api/profile/?id=${ratingToId}`, {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data?.access_token}` },
        });

        if (!user) {
          setStatus({ status: 'error', message: 'There was an issue loading the job to be rated' });
          return;
        }

        setStatus({ status: 'null', message: '' });
        setRatingTo(user);
      } catch (error: any) {
        console.error('/app/rate load user error');
        await parseError(error.message, error.code);

        setStatus({ status: 'error', message: 'There was an issue finding the job to be rated' });
      }
    },
    [job?.hirerId, job?.workerId, user?.data?.id, session, setRatingTo, setStatus],
  );

  if (status.status === 'page-loading') {
    return <Loading></Loading>;
  }

  // use user and ratingTo for information for things like 'rate ${ratingTo.name}
  // ratingTo is the one being rated
  // userId is the one giving the rating
  return (
    <>
      <button onClick={() => onRate(3, 'temp_description')}>developer rate</button>
    </>
  );
}
