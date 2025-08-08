/* location: /app/signup/page.tsx */
'use client';

import React from 'react';
import SignIn from '@/components/auth/sign-in';

export default function SignInPage() {
  return (
    <SignIn
      onSignIn={function (): void {
        throw new Error('Function not implemented.');
      }}></SignIn>
  );
}
