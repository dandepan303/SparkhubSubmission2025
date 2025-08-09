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
  const [blockAccess, setBlockAccess] = useState<Boolean>(true);

  const { profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    async function exec() {
      const userRole = (profile ? profile.role : 'guest') as Role;
  
      const requiredRole = Object.entries(privateRoutes).find(([route]) => pathname.startsWith(route))?.[1] || 'guest';
  
      if (requiredRole && !isAuthorized(userRole, requiredRole)) {
        // router.push('/auth/sign-in?message=You+do+not+have+access+to+this');
        return;
      }
  
      setBlockAccess(false);
    }
    exec();
  }, [loading, profile, pathname, router]);

  if (blockAccess) {
    return <Loading message={null} />;
  }

  return <div className={className}>{children}</div>;
}
