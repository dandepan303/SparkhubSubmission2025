'use client';

import { useEffect, useState } from 'react';
import Loading from './ui/loading';
import axios from 'axios';
import { useAuth } from './auth/auth-provider';
import { useRouter } from 'next/navigation';
import { parseError } from '@/lib/util/server_util';

// Import the new FloatingMessage and Material Design icons
import FloatingMessage from '@/components/ui/floating-message';
import { MdOutlinePerson, MdOutlineContactMail } from 'react-icons/md';

export default function Onboard() {
  const router = useRouter();

  const [status, setStatus] = useState<{ status: 'loading' | 'contact-info' | 'info'; message: string }>({ status: 'contact-info', message: '' });
  const [contactInfo, setContactInfo] = useState('');

  const { profile, session } = useAuth();

  // Check if contact info is set
  useEffect(() => {
    if (profile.loading && session.loading) return;

    if (profile && (!profile.data.contactInfo || profile.data.contactInfo.trim() === '')) {
      setStatus({ status: 'contact-info', message: '' });
    } else {
      setStatus({ status: 'info', message: '' });
    }
  }, [profile, session.loading]);

  const handleContactInfoSave = async () => {
    // Basic validation to prevent empty submissions
    if (contactInfo.trim() === '') {
      setStatus({ status: 'contact-info', message: 'Please provide a valid contact method.' });
      return;
    }

    setStatus({ status: 'loading', message: '' });

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60);

      const res = await axios.post(
        `/api/profile/contact-info`,
        { contactInfo },
        {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data.access_token}` },
        },
      );

      // Check for a successful response status
      if (res.status >= 200 && res.status < 300) {
        // If successful, proceed to the next step (onboarding info)
        setStatus({ status: 'info', message: '' });
      } else {
        // If the server returns an error, set the status message
        setStatus({ status: 'contact-info', message: res.data?.message || 'Failed to save contact info.' });
      }
    } catch (err: any) {
      console.error('Onboarding API error', err);
      // Catch network or other request errors
      setStatus({ status: 'contact-info', message: await parseError(err) });
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stepIndex, setStepIndex] = useState(0);

  const onboardingSteps = [
    {
      title: 'Welcome to TradeSpace',
      description: "Your community for seamless, safe, and transparent trading. Let's get you started!",
    },
    {
      title: 'Discover Your Community',
      description: "Connect with traders in your local area and beyond. Find what you need and offer what you don't.",
    },
    {
      title: 'Start Trading',
      description: 'Create your first listing or find an item you want. Our platform makes trading simple and secure.',
    },
  ];

  // Mouse tracking effect for animated background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNextStep = () => {
    if (stepIndex < onboardingSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handlePreviousStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const isLastStep = stepIndex === onboardingSteps.length - 1;

  if (status.status === 'loading') {
    return <Loading message={null} />;
  }

  if (status.status === 'contact-info') {
    return (
      <div className="min-h-screen overflow-hidden bg-white">
        {status.message && status.message.trim() !== '' && <FloatingMessage type="error">{status.message}</FloatingMessage>}
        <header className="flex items-center justify-between bg-white px-6 py-4 md:px-12 md:py-6">
          <button onClick={() => router.push('/')} className="cursor-pointer">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
              Trade
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
            </h1>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/auth/sign-in')}
              className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 md:text-base">
              Already a user?
            </button>
          </div>
        </header>

        <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center px-6 py-8">
          {/* Animated Gradient Background */}
          <div
            className="absolute h-96 w-96 rounded-full opacity-40 blur-3xl transition-all duration-500"
            style={{
              background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.6) 0%, 
              rgba(147, 51, 234, 0.4) 35%, 
              rgba(236, 72, 153, 0.3) 70%, 
              transparent 100%)`,
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            }}
          />
          <div
            className="absolute h-80 w-80 rounded-full opacity-30 blur-2xl transition-all duration-500"
            style={{
              background: `radial-gradient(circle, 
              rgba(34, 197, 94, 0.5) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              transparent 100%)`,
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            }}
          />

          <div className="relative z-10 w-full max-w-lg">
            {/* Contact Info Form */}
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center shadow-xl backdrop-blur-sm md:p-10">
              <div className="mb-4 flex justify-center">
                <MdOutlineContactMail className="text-6xl text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">One Last Thing...</h2>
              <p className="mb-8 text-base text-gray-600 md:text-lg">
                To connect with other traders, please provide a way for them to contact you. This could be an email, phone number, or social media
                handle.
              </p>

              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdOutlinePerson className="text-xl text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your contact info (e.g., email@example.com)"
                  value={contactInfo}
                  onChange={e => setContactInfo(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white/70 py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <button
                onClick={handleContactInfoSave}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700 hover:shadow-xl">
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Existing onboarding steps
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-6 py-4 md:px-12 md:py-6">
        <button onClick={() => router.push('/')} className="cursor-pointer">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
            Trade
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
          </h1>
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push('/auth/sign-in')}
            className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 md:text-base">
            Already a user?
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center px-6 py-8">
        {/* Animated Gradient Background */}
        <div
          className="absolute h-96 w-96 rounded-full opacity-40 blur-3xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.6) 0%, 
              rgba(147, 51, 234, 0.4) 35%, 
              rgba(236, 72, 153, 0.3) 70%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="absolute h-80 w-80 rounded-full opacity-30 blur-2xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle, 
              rgba(34, 197, 94, 0.5) 0%, 
              rgba(168, 85, 247, 0.3) 50%, 
              transparent 100%)`,
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />

        <div className="relative z-10 w-full max-w-lg">
          {/* Onboarding Card */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center shadow-xl backdrop-blur-sm md:p-10">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{onboardingSteps[stepIndex].title}</h2>
            <p className="mb-8 text-base text-gray-600 md:text-lg">{onboardingSteps[stepIndex].description}</p>

            {/* Step Indicators */}
            <div className="mb-8 flex justify-center space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                    index === stepIndex ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'
                  }`}></div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePreviousStep}
                disabled={stepIndex === 0}
                className="rounded-full border border-gray-300 bg-gray-100 px-6 py-2 text-sm font-bold text-gray-800 shadow-md transition-all duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="w-full max-w-sm rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700 hover:shadow-xl">
                {isLastStep ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
