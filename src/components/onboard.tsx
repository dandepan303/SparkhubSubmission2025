'use client';

import { useEffect, useState } from 'react';
import Loading from './ui/loading';
import axios from 'axios';
import { useAuth } from './auth/auth-provider';

export default function Onboard() {
  const [status, setStatus] = useState<{ status: 'loading' | 'contact-info' | 'info' }>({ status: 'loading' });

  const { profile, session } = useAuth();

  // check if contact info is set
  useEffect(() => {
    if (profile && !profile.contactInfo) {
      setStatus({ status: 'contact-info' });
    } else {
      setStatus({ status: 'info' });
    }
  }, [profile]);

  const handleContactInfoSave = (contactInfo: string) => {
    setStatus({ status: 'loading' });

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60);

      axios
        .post(
          `/api/profile/contact-info`,
          { contactInfo },
          {
            signal: controller.signal,
            withCredentials: true,
            validateStatus: () => true,
            headers: { Authorization: `Bearer ${session?.access_token}` },
          },
        )
        .then(res => {
          setStatus({ status: 'info' });
        })
        .catch(err => {
          console.log('Onboarding API error', err);
          setStatus({ status: 'info' });
        });
    } catch (err: any) {}
  };

  if (status.status === 'loading') {
    return <Loading message={null} />;
  }

  return (
    <div>
      {status.status === 'contact-info' && "how can other's contact you? submit to handleContactInfoSave"}
      {status.status === 'info' && 'info about our website or like tutorial stuff'}
    </div>
  );
}
