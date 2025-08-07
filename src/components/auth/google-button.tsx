'use client';

import { config } from '@/lib/config';
import { useEffect, useRef } from 'react';

// Add global window type declaration if not already present
declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize?: (config: any) => void;
          renderButton?: (element: HTMLElement, config: any) => void;
          prompt?: () => void;
        };
      };
    };
    googleAuthCallback?: (response: any) => void;
  }
}

interface GoogleAuthButtonProps {
  // Pass the actual callback from the parent (SignIn or SignUp logic)
  handleGoogleAuthCallback: (response: any) => void;
  setStatus: ({ status, message }: { status: any; message: string }) => void;
  buttonText: 'signin_with' | 'signup_with';
  buttonContext: 'signin' | 'signup' | 'use';
}

export default function GoogleAuthButton({ handleGoogleAuthCallback, setStatus, buttonText, buttonContext }: GoogleAuthButtonProps) {
  const handleGoogleAuthCallbackRef = useRef(handleGoogleAuthCallback);
  const initAttemptedRef = useRef(false);

  useEffect(() => {
    handleGoogleAuthCallbackRef.current = handleGoogleAuthCallback;
  }, [handleGoogleAuthCallback]);

  useEffect(() => {
    // Reset initialization flag when component mounts
    initAttemptedRef.current = false;

    const initializeGoogleAuth = () => {
      // Prevent multiple initialization attempts
      if (initAttemptedRef.current) return;

      if (window.google?.accounts?.id) {
        initAttemptedRef.current = true;
        
        try {
          // Set up global callback
          window.googleAuthCallback = (response: any) => {
            handleGoogleAuthCallbackRef.current(response);
          };

          // Initialize Google Auth (only once)
          if (typeof window.google.accounts.id.initialize === 'function') {
            window.google.accounts.id.initialize({
              client_id: config.google.client_id,
              callback: window.googleAuthCallback,
              auto_select: false, // Changed to false to prevent auto-popup
              itp_support: true,
            });
          }

          // Find the button container with a slight delay to ensure DOM is ready
          setTimeout(() => {
            const buttonContainer = document.querySelector(`.g_id_signin[data-context="${buttonContext}"]`);
            if (buttonContainer && typeof window.google.accounts.id.renderButton === 'function') {
              // Clear any existing content
              buttonContainer.innerHTML = '';
              
              window.google.accounts.id.renderButton(buttonContainer as HTMLElement, {
                type: 'standard',
                shape: 'pill',
                theme: 'outline',
                text: buttonText,
                size: 'large',
                logo_alignment: 'left',
              });
              setStatus({ status: 'null', message: '' });
            } else {
              console.error(`Button container not found for context: ${buttonContext}`);
              setStatus({ status: 'error', message: `There was an issue loading Google button for ${buttonContext}. Please try again later.` });
            }
          }, 100);

        } catch (error) {
          console.error('Error initializing Google Auth:', error);
          setStatus({ status: 'error', message: 'Failed to initialize Google authentication.' });
        }
      } else {
        // Google script not loaded yet, retry
        console.log('Google Identity Services not ready, retrying...');
        setTimeout(initializeGoogleAuth, 500);
      }
    };

    // Start initialization with a small delay
    const timeoutId = setTimeout(initializeGoogleAuth, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up the global callback when the component unmounts
      if (window.googleAuthCallback) {
        delete window.googleAuthCallback;
      }
    };
  }, [buttonContext, buttonText, setStatus]);

  return (
    <div className='flex items-center justify-center'>
      {/* Divider */}
      <div className="w-full">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-transparent px-2 text-gray-700 font-semibold">or</span>
          </div>
        </div>

        {/* Google Sign-In Button Container */}
        <div
          className="g_id_signin w-full flex justify-center"
          data-context={buttonContext}
          style={{ minHeight: '44px' }}
        ></div>
      </div>
    </div>
  );
}