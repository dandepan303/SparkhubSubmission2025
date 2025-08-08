'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './auth-provider';
import { privateRoutes } from '@/lib/config';
import { Role } from '@/types';
import { isAuthorized } from '@/lib/util/util';
import Loading from '../ui/loading';

interface AuthProtecterProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthProtecter({ children, className }: AuthProtecterProps) {
  const [status, setStatus] = useState<{ loading: boolean }>({ loading: true });

  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const userRole = (user ? user.role || 'guest' : 'guest') as Role;

    const requiredRole = Object.entries(privateRoutes).find(([route]) => pathname.startsWith(route))?.[1];

    if (requiredRole && !isAuthorized(userRole, requiredRole)) {
      router.push('/auth/sign-in');
      return;
    }

    setStatus({ loading: false });
  }, [user, loading, pathname, router]);

  if (loading) {
    return <Loading message={null} />;
  }

  return <div className={className}>{children}</div>;
}
