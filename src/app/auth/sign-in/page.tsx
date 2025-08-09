/* location: /app/signup/page.tsx */
'use client';

import React from 'react';
import SignIn from '@/components/auth/sign-in';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <SignIn message={message}></SignIn>
  );
}
