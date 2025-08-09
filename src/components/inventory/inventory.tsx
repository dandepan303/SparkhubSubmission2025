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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOffering, setNewOffering] = useState({
    description: '',
    cost: 0,
    quantity: 1
  });

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

      const { data: { user } }: { data: { user: User} } = await axios.get(`/api/profile/?id=${userId}`, {
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

      const {data: res}: {data: OfferingGetRet} = await axios.post('/api/profile/offering', offeringData, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      if (res.status === 'error') {
        setStatus({ status: 'error', message: 'There was an issue saving your changes' });
      } else {
        setStatus({ status: 'success', message: 'Successfully saved your changes' });
        setShowCreateForm(false);
        setNewOffering({ description: '', cost: 0, quantity: 1 });
        loadOfferings(); // Refresh the list
      }
    } catch (error: any) {
      console.error('/component/inventory upsert_offering error');
      await parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was an issue saving your changes' });
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
        loadOfferings(); // Refresh the list
      }
    } catch (error: any) {
      console.error('/component/inventory delete error');
      parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was an issue deleting your offer' });
    }
  };

  const handleCreateOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOffering.description.trim()) {
      createOffering(newOffering.description, newOffering.cost, newOffering.quantity);
    }
  };

  // Load offerings
  useEffect(() => {
    if (!loading) {
      loadOfferings();
    }
  }, [loading, loadOfferings]);

  if (status.status === 'loading') {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">Loading your inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">ee

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            My
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Inventory</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Manage your skills, services, and offerings. Share what you're great at with your community.
          </p>
        </div>

        {/* Status Messages */}
        {status.status === 'success' && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-green-800 font-medium">{status.message}</p>
            </div>
          </div>
        )}

        {status.status === 'error' && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="ml-3 text-red-800 font-medium">{status.message}</p>
            </div>
          </div>
        )}

        {/* Add New Offering Section */}
        <div className="mb-8">
          {!showCreateForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowCreateForm(true)}
                className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                }}
              >
                <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Offering
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Create New Offering</h3>
              <form onSubmit={handleCreateOffering} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newOffering.description}
                    onChange={(e) => setNewOffering({ ...newOffering, description: e.target.value })}
                    placeholder="Describe your skill or service..."
                    className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Estimated Value ($)
                    </label>
                    <input
                      type="number"
                      value={newOffering.cost}
                      onChange={(e) => setNewOffering({ ...newOffering, cost: Number(e.target.value) })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Quantity Available
                    </label>
                    <input
                      type="number"
                      value={newOffering.quantity}
                      onChange={(e) => setNewOffering({ ...newOffering, quantity: Number(e.target.value) })}
                      placeholder="1"
                      min="1"
                      className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                  >
                    Create Offering
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewOffering({ description: '', cost: 0, quantity: 1 });
                    }}
                    className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Offerings Grid */}
        {offerings.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Offerings</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offerings.map((offering) => (
                <div
                  key={offering.id}
                  className="group relative transform rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
                  }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  <OfferingCard
                    offering={offering}
                    profile={profile}
                    onUpdate={upsertOffering}
                    onDelete={deleteOffering}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">No Offerings Yet</h3>
            <p className="mb-6 text-gray-600">
              Start by creating your first offering to share your skills with the community.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
            >
              Create Your First Offering
            </button>
          </div>
        )}
      </div>
    </div>
  );
}