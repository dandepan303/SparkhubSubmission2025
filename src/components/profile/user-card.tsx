'use client'

import { AcceptJobArgs, User, DefaultAPIRet } from "@/types";
import { useAuth } from '@/components/auth/auth-provider';
import axios from "axios";
import { useState, useEffect } from "react";
import { parseError } from "@/lib/util/server_util";

type StatProps = { label: string; value: string | number, icon: string, color: string };

function Stat({ label, value, icon, color }: StatProps) {
  return (
    <div className="flex flex-col rounded-lg border p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  );
}

export default function UserCard({ user, jobId, setStatus }: { user: User, jobId: string, setStatus: any }) {
  const { session, user: authUser } = useAuth();
  
  const [isOwner, setIsOwner] = useState<boolean>(false);
  
  const [isHovered, setIsHovered] = useState(false);
  
  const initials = (user.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const offeringsCount = user.offerings?.length ?? 0;
  const jobsCreatedCount = user.jobsCreated?.length ?? 0;
  const jobsWorkingCount = user.jobsWorking?.length ?? 0;
  const ratingsGivenCount = user.ratingFrom?.length ?? 0;
  const ratingsReceivedCount = user.ratingTo?.length ?? 0;

  const avgReceivedRating =
    ratingsReceivedCount > 0
      ? Math.round(
        ((user.ratingTo ?? []).reduce((sum, r) => sum + r.value, 0) / ratingsReceivedCount) * 10
      ) / 10
      : null;

  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-";
  const updatedDate = user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "-";

  const onAccept = async () => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const acceptData: AcceptJobArgs = {
        jobId: jobId,
        workerId: user.id
      }
      const {
        data: res }: { data: DefaultAPIRet } = await axios.post(`/api/job/accept`, acceptData, {
          signal: controller.signal,
          withCredentials: true,
          validateStatus: () => true,
          headers: { Authorization: `Bearer ${session?.data.access_token}` },
        });

      if (!user) {
        setStatus({ status: 'error', message: 'There was an issue loading the inventory' });
        return [];
      }

      setStatus({ status: 'null', message: '' });
    } catch (error: any) {
      console.error('/component/inventory fetch_offering error');
      await parseError(error.message, error.code);

      setStatus({ status: 'error', message: 'There was an issue accepting the worker' });
    }
  }

  const getAvatarGradient = () => {
    const hash = user.name?.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0) || 0;

    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-orange-500 to-red-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-600',
    ];

    return gradients[Math.abs(hash) % gradients.length];
  };

  const getRatingColor = () => {
    if (!avgReceivedRating) return 'from-gray-400 to-gray-500';
    if (avgReceivedRating >= 4.5) return 'from-green-500 to-emerald-600';
    if (avgReceivedRating >= 3.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  useEffect(() => {
    if (authUser.loading || !authUser.data) return;

    setIsOwner(authUser.data.id === user.id);
  }, [authUser.data, authUser.loading, setIsOwner]);

   return (
    <div 
      className="group relative w-full transform transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <div 
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 blur transition-all duration-500 ${
          isHovered ? 'opacity-100' : ''
        }`} 
      />
      
      {/* Main card */}
      <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div 
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${getAvatarGradient()} shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3`}
                style={{
                  boxShadow: isHovered ? '0 20px 40px rgba(59, 130, 246, 0.3)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <span className="text-xl font-bold text-white">{initials}</span>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-green-400 shadow-sm" />
            </div>
            
            {/* User info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 truncate">{user.name}</h3>
              <p className="text-gray-600 truncate">{user.email}</p>
              {avgReceivedRating && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(avgReceivedRating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {avgReceivedRating}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact info */}
        {user.contactInfo && (
          <div className="px-6 pb-4">
            <div className="rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 p-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</span>
              <p className="mt-1 text-sm font-medium text-gray-900">{user.contactInfo}</p>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="p-6 pt-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat 
              label="Offerings" 
              value={offeringsCount} 
              icon="📋" 
              color="from-blue-500 to-cyan-600"
            />
            <Stat 
              label="Jobs Created" 
              value={jobsCreatedCount} 
              icon="✨" 
              color="from-green-500 to-emerald-600"
            />
            <Stat 
              label="Jobs Working" 
              value={jobsWorkingCount} 
              icon="🔨" 
              color="from-orange-500 to-red-600"
            />
            <Stat 
              label="Ratings Given" 
              value={ratingsGivenCount} 
              icon="👍" 
              color="from-purple-500 to-pink-600"
            />
            <Stat 
              label="Ratings Received" 
              value={ratingsReceivedCount} 
              icon="⭐" 
              color="from-yellow-500 to-orange-500"
            />
            <Stat 
              label="Avg Rating" 
              value={avgReceivedRating ?? "-"} 
              icon="🏆" 
              color={getRatingColor()}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="font-medium">Joined:</span>
              <span className="bg-white/60 px-2 py-1 rounded-md font-medium">{joinedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Updated:</span>
              <span className="bg-white/60 px-2 py-1 rounded-md font-medium">{updatedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
