'use client';

import { DefaultAPIRet, Job } from '@/types';
import axios from 'axios';
import { useAuth } from '@/components/auth/auth-provider';
import { useEffect, useState } from 'react';

export default function JobCard({ job, setStatus }: { job: Job; setStatus: any }) {
  const [isApplying, setIsApplying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { session, user } = useAuth();

  const [showApplyNow, setShowApplyNow] = useState<boolean>(false);
  const [showViewApplications, setShowViewApplications] = useState<boolean>(false);

  useEffect(() => {
    if (session.loading || user.loading) return;

    setShowApplyNow(job.status === 'SEARCHING' && job.hirerId !== user.data.id);
    setShowViewApplications(job.hirer.id === user.data.id);
  }, [session.loading, user.loading, user.data.id, job.hirer.id, job.hirerId, job.status]);

  const apply = async () => {
    setIsApplying(true);
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
          headers: { Authorization: `Bearer ${session?.data.access_token}` },
        },
      );

      if (res.status === 'error') {
        setStatus({ status: 'error', message: res.message });
      } else {
        setStatus({ status: 'success', message: `Successfully applied to job: ${job.title}` });
      }
    } catch (error) {
      setStatus({ status: 'error', message: 'Failed to apply to job' });
    } finally {
      setIsApplying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'in_progress':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      case 'closed':
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div
      className="group relative mb-6 overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
      }}>
      {/* Subtle gradient overlay on hover */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-5' : ''}`}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h2 className="mb-1 text-xl font-bold tracking-tight text-gray-900 transition-all duration-300">{job.title}</h2>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-md transition-all duration-300 hover:scale-105 ${getStatusColor(job.status)}`}>
          {formatStatus(job.status)}
        </span>
      </div>

      {/* Description */}
      <p className="relative z-10 mb-6 line-clamp-3 leading-relaxed text-gray-600">{job.description}</p>

      {/* Details Grid */}
      <div className="relative z-10 mb-6 grid grid-cols-2 gap-4">
        {/* Location */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-50/80 p-3 transition-all duration-200 hover:bg-gray-100/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p className="text-xs font-semibold text-gray-500">Location</p>
            <p className="text-sm font-bold text-gray-900">{job.location}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-50/80 p-3 transition-all duration-200 hover:bg-gray-100/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Payment</p>
            <p className="text-sm font-bold text-green-600">${job.payment}</p>
          </div>
        </div>

        {/* Hirer */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-50/80 p-3 transition-all duration-200 hover:bg-gray-100/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Posted by</p>
            <p className="text-sm font-bold text-gray-900">{job.hirer?.name || 'Anonymous'}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-50/80 p-3 transition-all duration-200 hover:bg-gray-100/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Posted</p>
            <p className="text-sm font-bold text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      {showApplyNow && (
        <div className="relative z-10">
          {session.loading && user.loading ? (
            <div className="flex items-center justify-center rounded-xl bg-gray-100 px-6 py-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              <span className="ml-2 font-semibold text-gray-600">Loading...</span>
            </div>
          ) : (
            <button
              onClick={apply}
              disabled={isApplying}
              className={`group/button relative w-full overflow-hidden rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 ${
                isApplying
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
              style={{
                boxShadow: isApplying ? '0 10px 25px rgba(107, 114, 128, 0.3)' : '0 10px 25px rgba(59, 130, 246, 0.3)',
              }}>
              {/* Button background gradient animation */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100 ${
                  !isApplying ? 'bg-gradient-to-r from-blue-700 to-purple-700' : ''
                }`}
              />

              <span className="relative flex items-center justify-center">
                {isApplying ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Apply Now
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      )}

      {/* View Applications Button */}
      {showViewApplications && (
        <div className="relative z-10">
          {session.loading && user.loading ? (
            <div className="flex items-center justify-center rounded-xl bg-gray-100 px-6 py-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              <span className="ml-2 font-semibold text-gray-600">Loading...</span>
            </div>
          ) : (
            <button
              onClick={apply}
              disabled={isApplying}
              className={`group/button relative w-full overflow-hidden rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 ${isApplying
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              style={{
                boxShadow: isApplying ? '0 10px 25px rgba(107, 114, 128, 0.3)' : '0 10px 25px rgba(59, 130, 246, 0.3)',
              }}>
              {/* Button background gradient animation */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100 ${!isApplying ? 'bg-gradient-to-r from-blue-700 to-purple-700' : ''
                  }`}
              />

              <span className="relative flex items-center justify-center">
                {isApplying ? (<><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>Applying...</>) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Apply Now
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
