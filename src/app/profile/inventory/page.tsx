'use client';

import { useAuth } from '@/components/auth/auth-provider';
import Inventory from '@/components/inventory/inventory';
import Loading from '@/components/ui/loading';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const searchParamUserId = searchParams.get('userId');

  const [status, setStatus] = useState<{ status: 'inventory' | 'loading' | 'error', message?: String, userId?: string }>({ status: 'loading' });

  const { loading, profile } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (searchParamUserId) {
        setStatus({ status: 'inventory', userId: status.userId });
      } else if (profile && profile.id) {
        setStatus({ status: 'inventory', userId: profile.id });
      } else {
        setStatus({ status: 'error', message: 'Please sign in or choose another user\' inventory to display' });
      }
    }
  }, [loading, profile]);

  if (status.status === 'loading') {
    return <Loading></Loading>
  }

  if (status.status === 'error') {
    // TODO: DEAN
    return <div>todo: display an error page</div>
  }

  return <Inventory userId={status.userId}></Inventory>;
}
