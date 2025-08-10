'use client';

import { DefaultAPIRet, Job, User } from '@/types';
import axios from 'axios';
import { useAuth } from '@/components/auth/auth-provider';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseError } from '@/lib/util/server_util';

const JobCard = React.memo(function JobCard({ job, setStatus, showApplyNowParam }: { job: Job; setStatus: any; showApplyNowParam?: boolean }) {
  const router = useRouter();

  // Front end
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // MIDDLEWARE

  const [buttonStatus, setButtonStatus] = useState<'applyNow' | 'viewApplication' | 'complete' | 'rate' | 'spendAndRate' | 'none'>('none');

  const { session, user } = useAuth();
  const [hirer, setHirer] = useState<User | null>(null);
  const [worker, setWorker] = useState<User | null>(null);

  useEffect(() => {
    if (session.loading || user.loading) return;

    if (showApplyNowParam ?? (job.status === 'SEARCHING' && job.hirerId !== user.data.id)) setButtonStatus('applyNow');
    else if (job.hirerId === user.data.id && !job.workerId) setButtonStatus('viewApplication');
    else if (job.hirerId === user.data.id && job.status === 'IN_PROGRESS') setButtonStatus('complete');
    else if (job.hirerId === user.data.id && job.status === 'COMPLETED') setButtonStatus('rate'); // calls onRate
    else if (job.workerId === user.data.id && job.status === 'COMPLETED') setButtonStatus('spendAndRate'); // two buttons, one calls onRate other calls onSpend

    loadHirer();
    loadWorker();

    setIsLoading(false);
  }, [session.loading, user.loading, user.data.id, job.hirerId, job.hirerId, job.status]);

  const loadHirer = async () => {
    if (!job.hirerId) return;

    try {
      setIsLoading(true);

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const {
        data: { user },
      }: { data: { user: User } } = await axios.get(`/api/profile/?id=${job.hirerId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setHirer(user);
    } catch (error: any) {
      console.log('/components/job-card createJob error');
      await parseError(error.message, error.code);
    } finally {
      setIsLoading(false);
    }
  };

  const loadWorker = async () => {
    if (!job.workerId) return;

    try {
      setIsLoading(true);

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const {
        data: { user },
      }: { data: { user: User } } = await axios.get(`/api/profile/?id=${job.workerId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setWorker(user);
    } catch (error: any) {
      console.log('/components/job-card createJob error');
      await parseError(error.message, error.code);
    } finally {
      setIsLoading(false);
    }
  };

  const onApply = useCallback(async () => {
    setIsLoading(true);
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60);

    try {
      const { data: res }: { data: DefaultAPIRet } = await axios.post(
        '/api/job/apply',
        { jobId: job.id },
        {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data?.access_token}` },
        },
      );

      if (res.status === 'error') {
        setStatus(res);
      } else {
        setStatus({ status: 'success', message: `Successfully applied to job: ${job.title}` });
      }
    } catch (error) {
      setStatus({ status: 'error', message: 'Failed to apply to job' });
    } finally {
      setIsLoading(false);
    }
  }, [session?.data?.access_token, job.id, setIsLoading, setStatus]);

  const onView = useCallback(async () => {
    router.push(`/applications?id=${job.id}`)
  }, [router, job.id]);

  const onComplete = useCallback(async () => {
    setIsLoading(true);

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60);

    try {
      const { data: res }: { data: DefaultAPIRet } = await axios.post(
        '/api/job/complete',
        { jobId: job.id },
        {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data?.access_token}` },
        },
      );

      setStatus(res);
    } catch (error) {
      setStatus({ status: 'error', message: 'Failed to mark job as complete' });
    } finally {
      setIsLoading(false);
    }
  }, [session?.data?.access_token, job.id, setIsLoading, setStatus]);

  const onRate = useCallback(async () => {
    router.push(`/rate?id=${job.id}`);
  }, [router, job.id])

  const onSpend = useCallback(async () => {
    router.push(`/profile/inventory?id=${job.hirerId}`);
  }, [router, job.hirerId]);

  // FRONT END

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'searching':
        return {
          color: 'from-green-500 to-emerald-600',
          textColor: 'text-green-700',
          bgColor: 'from-green-100 to-emerald-100',
          icon: '🔍',
        };
      case 'in_progress':
        return {
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-700',
          bgColor: 'from-blue-100 to-indigo-100',
          icon: '⚡',
        };
      case 'completed':
        return {
          color: 'from-purple-500 to-violet-600',
          textColor: 'text-purple-700',
          bgColor: 'from-purple-100 to-violet-100',
          icon: '✨',
        };
      case 'closed':
        return {
          color: 'from-gray-500 to-gray-600',
          textColor: 'text-gray-700',
          bgColor: 'from-gray-100 to-gray-200',
          icon: '🔒',
        };
      default:
        return {
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-700',
          bgColor: 'from-blue-100 to-indigo-100',
          icon: '💼',
        };
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const statusConfig = getStatusConfig(job.status);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:bg-white/90 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}>
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(147, 51, 234, 0.2) 40%, 
            transparent 70%)`,
        }}
      />

      <div className="relative p-8">
        {/* Header with gradient status */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
              {job.title}
            </h2>
          </div>

          {/* Modern status badge */}
          <div className={`relative rounded-full bg-gradient-to-r px-4 py-2 ${statusConfig.bgColor} border border-white/50 shadow-lg`}>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{statusConfig.icon}</span>
              <span className={`text-xs font-bold tracking-wide ${statusConfig.textColor}`}>{formatStatus(job.status)}</span>
            </div>
          </div>
        </div>

        {/* Description with better typography */}
        <div className="mb-8">
          <p className="line-clamp-3 text-lg leading-relaxed text-gray-700">{job.description}</p>
        </div>

        {/* Modern details grid */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          {/* Hirer */}
          <div className="group/item rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50 to-violet-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-purple-600 uppercase">Posted by</p>
                <p className="text-sm font-bold text-gray-800">{hirer ? hirer.name : 'Loading...'}</p>
              </div>
            </div>
          </div>

          {/* Worker */}
          <div className="group/item rounded-2xl border border-orange-200/50 bg-gradient-to-br from-orange-50 to-amber-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-orange-600 uppercase">Posted</p>
                <p className="text-sm font-bold text-gray-800">{worker ? worker.name : job.workerId ? 'Loading...' : 'No worker'}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="group/item rounded-2xl border border-green-200/50 bg-gradient-to-br from-green-50 to-emerald-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-green-600 uppercase">Payment</p>
                <p className="text-sm font-bold text-green-700">${job.payment}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="group/item rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">Location</p>
                <p className="text-sm font-bold text-gray-800">{job.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* apply noq */}
        {buttonStatus === 'applyNow' && (
          <div className="relative">
            {session.loading && user.loading ? (
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-inner">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span className="ml-3 font-semibold text-gray-600">Loading...</span>
              </div>
            ) : (
              <button
                onClick={onApply}
                disabled={isLoading}
                className={`group/button relative w-full transform overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
                  isLoading
                    ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-blue-500/25'
                }`}>
                {/* Button glow effect */}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/button:opacity-20" />
                )}

                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/button:scale-110 group-hover/button:rotate-12">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      Apply Now
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        )}

        {/* view application */}
        {buttonStatus === 'viewApplication' && (
          <div className="relative">
            {session.loading && user.loading ? (
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-inner">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span className="ml-3 font-semibold text-gray-600">Loading...</span>
              </div>
            ) : (
              <button
                onClick={onView}
                disabled={isLoading}
                className={`group/button relative w-full transform overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
                  isLoading
                    ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/25'
                }`}>
                {/* Button glow effect */}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/button:opacity-20" />
                )}

                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/button:scale-110">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      View Applications
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        )}

        {/* complete */}
        {buttonStatus === 'complete' && (
          <div className="relative">
            {session.loading && user.loading ? (
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-inner">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span className="ml-3 font-semibold text-gray-600">Loading...</span>
              </div>
            ) : (
              <button
                onClick={onComplete}
                disabled={isLoading}
                className={`group/button relative w-full transform overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
                  isLoading
                    ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/25'
                }`}>
                {/* Button glow effect */}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/button:opacity-20" />
                )}

                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/button:scale-110">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      Mark Job as Completed
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        )}

        {/* rate */}
        {buttonStatus === 'rate' && (
          <div className="relative">
            {session.loading && user.loading ? (
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 shadow-inner">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span className="ml-3 font-semibold text-gray-600">Loading...</span>
              </div>
            ) : (
              <button
                onClick={onRate}
                disabled={isLoading}
                className={`group/button relative w-full transform overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
                  isLoading
                    ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/25'
                }`}>
                {/* Button glow effect */}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/button:opacity-20" />
                )}

                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/button:scale-110">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      Rate the Other Person
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        )}

        {/* rateAndSpend */}
        {/* figure out how to do two buttons next to each other, isLoading can be shared between them */}
      </div>
    </div>
  );
});

export default JobCard;