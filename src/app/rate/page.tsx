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
  
  // UI State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onRate = async (value: number, text?: string) => {
    if (!job || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const bodyData: RateJobArgs = {
        jobId: job.id,
        value: value,
        text: text || reviewText,
      };

      const { data: res }: { data: DefaultAPIRet } = await axios.post(`/api/profile/rate`, bodyData, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setStatus(res);
      
      if (res.status === 'success') {
        setTimeout(() => {
          router.push('/dashboard?message=Rating submitted successfully!');
        }, 2000);
      }
    } catch (error: any) {
      console.error('/app/rate submit error', error);
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue submitting your rating' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadRatingTo = useCallback(
    async (job: Job) => {
      const ratingToId = user?.data?.id === job.hirerId ? job.workerId : job.hirerId;

      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

        const {
          data: { user: userToRate },
        }: { data: { user: User } } = await axios.get(`/api/profile?id=${ratingToId}`, {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data?.access_token}` },
        });

        if (!userToRate) {
          setStatus({ status: 'error', message: 'There was an issue loading the user to be rated' });
          return;
        }

        setStatus({ status: 'null', message: '' });
        setRatingTo(userToRate);
      } catch (error: any) {
        console.error('/app/rate load user error', error);
        await parseError(error.message, error.code);
        setStatus({ status: 'error', message: 'There was an issue finding the user to be rated' });
      }
    },
    [user?.data?.id, session],
  );

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
      console.error('/app/rate load job error', error);
      await parseError(error.message, error.code);
      setStatus({ status: 'error', message: 'There was an issue finding the job to be rated' });
    }
  }, [id, session, loadRatingTo]);

  const handleSubmitRating = () => {
    if (selectedRating > 0) {
      onRate(selectedRating, reviewText);
    }
  };

  const getRatingText = (rating: number) => {
    const texts = {
      1: 'Poor',
      2: 'Fair', 
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return texts[rating as keyof typeof texts] || '';
  };

  useEffect(() => {
    if (!id) {
      router.push('/dashboard?message=Please select a job before rating the other person');
      return;
    }

    loadJob();
  }, [id, loadJob, router]);

  useEffect(() => {
    if (user.loading || session.loading || !job) return;
    setStatus({ status: 'null', message: '' });
  }, [user.loading, session.loading, job]);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (status.status === 'page-loading') {
    return <Loading />;
  }

  if (status.status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{status.message}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status.status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rating Submitted!</h2>
          <p className="text-gray-600 mb-6">Thank you for your feedback. Redirecting to dashboard...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!job || !ratingTo) {
    return <Loading />;
  }

  const rotateX = mousePosition.y * -10;
  const rotateY = mousePosition.x * 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-200/20 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-md">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <h1 className="text-xl font-bold text-gray-900">Rate Experience</h1>
        <div className="w-32"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <div className="pt-20 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
              Rate Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Trade Experience
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help build trust in our community by sharing your experience with{' '}
              <span className="font-semibold text-gray-900">{ratingTo.name}</span>
            </p>
          </div>

          {/* 3D Card Container with Enhanced Gradients */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Multiple Gradient Layers for Intense Glow */}
            <div
              className="absolute w-96 h-80 rounded-full blur-3xl opacity-60 transition-all duration-300"
              style={{
                background: `radial-gradient(circle, 
                  rgba(59, 130, 246, 0.8) 0%, 
                  rgba(147, 51, 234, 0.6) 35%, 
                  rgba(236, 72, 153, 0.4) 70%, 
                  transparent 100%)`,
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              }}
            />
            <div
              className="absolute w-80 h-64 rounded-full blur-2xl opacity-50 transition-all duration-300"
              style={{
                background: `radial-gradient(circle, 
                  rgba(34, 197, 94, 0.7) 0%, 
                  rgba(168, 85, 247, 0.5) 50%, 
                  transparent 100%)`,
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
              }}
            />

            {/* 3D Rating Card */}
            <div
              className="relative w-full max-w-2xl transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Front */}
              <div
                className="relative bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200 p-8 shadow-2xl"
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Job Info */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600">Trade completed with <span className="font-semibold">{ratingTo.name}</span></p>
                </div>

                {/* Star Rating */}
                <div className="mb-8">
                  <label className="block text-center text-lg font-semibold text-gray-900 mb-4">
                    How was your experience?
                  </label>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all duration-200 hover:scale-110"
                        disabled={isSubmitting}
                      >
                        <svg
                          className={`w-12 h-12 ${
                            star <= (hoverRating || selectedRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {selectedRating > 0 && (
                    <p className="text-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {getRatingText(selectedRating)}
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Share your experience (optional)
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={`Tell others about your trade with ${ratingTo.name}...`}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-gray-500 mt-2">{reviewText.length}/500 characters</p>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 py-4 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRating}
                    disabled={selectedRating === 0 || isSubmitting}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                      selectedRating > 0 && !isSubmitting
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Rating'
                    )}
                  </button>
                </div>
              </div>

              {/* Card Back (for 3D depth) */}
              <div
                className="absolute inset-0 rounded-3xl border border-gray-300 bg-gray-100"
                style={{ transform: 'translateZ(-20px)' }}
              ></div>
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <span className="text-2xl">🔒</span>
              <p className="text-gray-700 font-medium">Your rating helps build trust in our community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}