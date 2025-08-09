'use client';

import { DefaultAPIRet, Offering, OfferingGetRet, OfferingPostArgs, User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth/auth-provider';
import axios from 'axios';
import { parseError } from '@/lib/util/server_util';
import OfferingCard from './offering';
import Message from '../ui/message';

export default function Inventory({ userId }: { userId: string }) {
  const [status, setStatus] = useState<{ status: 'success' | 'error' | 'page-loading' | 'loading' | 'null'; message: string }>({
    status: 'loading',
    message: '',
  });

  const [offerings, setOfferings] = useState<Offering[]>([]);

  const { loading, profile, session } = useAuth();

  const createOffering = (description: string, cost: number, quantity: number) => {
    const offering: OfferingPostArgs = {
      description: description,
      cost: cost,
      quantity: quantity,
    };

    upsertOffering(offering);
  };

  const loadOfferings = useCallback(async () => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const { data: { user } }: { data: { user: User} } = await axios.get(`/api/profile/${userId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      if (!user) {
        setStatus({ status: 'error', message: 'There was an issue loading the inventory' });
        return [];
      }

      setStatus({ status: 'null', message: '' });
      setOfferings(user.offerings);
    } catch (error: any) {
      console.error('/component/inventory fetch_offering error');
      await parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was an issue loading the inventory' });
    }
  }, [userId, session?.access_token]);

  const upsertOffering = async (offeringData: OfferingPostArgs) => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60);

      const res = await axios.post('/api/profile/offering', offeringData, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      if (res.data.status === 'error') setStatus({ status: 'error', message: 'There was an issue saving your changes' });
      else setStatus({ status: 'success', message: 'Successfully saved your changes' });
    } catch (error: any) {
      console.error('/component/inventory upsert_offering error');
      await parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was asn issue saving your changes' });
    }
  };

  const deleteOffering = async (offeringId: string) => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const { data: res }: { data: DefaultAPIRet } = await axios.delete('/api/profile/offering', {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
        data: { offeringId },
      });

      if (res.status === 'error') {
        setStatus({ status: 'error', message: 'There was an issue deleting your offer' });
      } else {
        setStatus({ status: 'success', message: 'Successfully deleted your offer' });
      }
    } catch (error: any) {
      console.error('/component/inventory delete error');
      parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was an issue deleting your offer' });
    }
  };

  // Load offerings
  useEffect(() => {
    if (!loading) {
      loadOfferings();
    }
  }, [loading, loadOfferings]);

  // TODO: REMOVE DEV - CREATE TESTING
  // useEffect(() => {
  //   console.log('creating developer offerings')
  //   createOffering('tempoary description', 10, 10);
  //   createOffering('tempoary description', 10, 10);
  //   createOffering('tempoary description', 10, 10);
  //   createOffering('tempoary description', 10, 10);
  //   createOffering('tempoary description', 10, 10);
  // }, []);

  return (
    <div className="h-full w-full">
      {status.status === 'success' && <Message color={'green'}>{status.message}</Message>}
      {status.status === 'error' && <Message color={'red'}>{status.message}</Message>}
      {offerings.map(offering => (
        <OfferingCard
          key={offering.id}
          offering={offering}
          profile={profile}
          onUpdate={upsertOffering}
          onDelete={deleteOffering}
        />
      ))}
    </div>
  );
}
