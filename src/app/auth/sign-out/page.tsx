'use client';

import { useAuth } from '@/components/auth/auth-provider';
import { useEffect } from 'react';

export default function SignOutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);
}
