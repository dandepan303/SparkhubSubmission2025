'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthProtecter from '@/components/auth/auth-protecter';
import { parseError } from '@/lib/util/server_util';
import Loading from '@/components/ui/loading';
import Message from '@/components/ui/message';
import { useAuth } from '@/components/auth/auth-provider';

export default function DeveloperPage() {
  const { session } = useAuth();

  const [status, setStatus] = useState<{
    status: 'success' | 'error' | 'loading' | 'page-loading' | 'null';
    message: string;
  }>({ status: 'page-loading', message: '' });

  useEffect(() => {
    setStatus({ status: 'null', message: '' });
  }, []);

  const handleDeveloperDelete = async (opts: { deleteAuth?: boolean; deleteUserDb?: boolean }) => {
    setStatus({ status: 'loading', message: 'Processing...' });

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000 * 60);

    axios
      .delete(`/api/developer`, {
        data: { ...opts },
        withCredentials: true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
        signal: controller.signal,
      })
      .then(res => {
        setStatus({ status: res.data.status, message: res.data.message });
      })
      .catch(err => {
        if (err.response) {
          (async () => setStatus({ status: 'error', message: await parseError(err.response.data.message) }))();
        } else {
          (async () => setStatus({ status: 'error', message: await parseError(err.message) }))();
        }
      });
  };

  if (status.status === 'page-loading') {
    return <Loading message={null} />;
  }

  return (
    <AuthProtecter className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Developer Controls</h1>

        {status.status === 'success' && (
          <Message color="green" className="text-sm">
            {status.message}
          </Message>
        )}
        {status.status === 'error' && (
          <Message color="red" className="text-sm">
            {status.message}
          </Message>
        )}

        <div className="grid gap-3">
          <button
            className="rounded-md bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
            onClick={() => handleDeveloperDelete({ deleteAuth: true, deleteUserDb: true })}
            disabled={status.status === 'loading'}>
            {status.status === 'loading' ? 'Working...' : 'Delete Both (Auth + DB)'}
          </button>

          <button
            className="rounded-md bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
            onClick={() => handleDeveloperDelete({ deleteAuth: true })}
            disabled={status.status === 'loading'}>
            {status.status === 'loading' ? 'Working...' : 'Delete Auth Only'}
          </button>

          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
            onClick={() => handleDeveloperDelete({ deleteUserDb: true })}
            disabled={status.status === 'loading'}>
            {status.status === 'loading' ? 'Working...' : 'Delete DB Only'}
          </button>
        </div>
      </div>
    </AuthProtecter>
  );
}
