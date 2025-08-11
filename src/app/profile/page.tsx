"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { parseError } from "@/lib/util/server_util";
import { useAuth } from "@/components/auth/auth-provider";
import { useSidebar } from '@/components/context/sidebar-context';
import { useSearchParams } from "next/navigation";
import { User } from "@/types";
import axios from "axios";
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import Loading from "@/components/ui/loading";
import FloatingMessage from "@/components/ui/floating-message";
import Link from "next/link";
import { 
  MdPerson, 
  MdStar, 
  MdInventory, 
  MdNotifications, 
  MdEmail, 
  MdArrowForward,
  MdDashboard,
  MdCalendarToday,
  MdVerified
} from 'react-icons/md';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [profileId, setProfileId] = useState<string | null>(id);
  const { session, user, profile: currentUserProfile } = useAuth();
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();
  const [status, setStatus] = useState<{ 
    status: "success" | "error" | "loading" | "null"; 
    message: string 
  }>({ status: "loading", message: "" });
  const [profile, setProfile] = useState<User | null>(null);

  const userName = useMemo(() => {
    return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
  }, [user?.data?.user_metadata?.name, user?.data?.email]);

  const loadProfile = useCallback(async (profileId: string) => {
    try {
      setStatus({ status: "loading", message: "" });
      
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout
      
      const {
        data: { user },
      }: { data: { user: User } } = await axios.get(`/api/profile?id=${profileId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });

      setProfile(user);
      if (!user) {
        setStatus({ status: "error", message: "Profile not found or could not be loaded" });
      } else {
        setStatus({ status: "success", message: "" });
      }
    } catch (error: any) {
      console.error("/component/profile-page load profile error");
      await parseError(error.message, error.code);
      setStatus({ status: "error", message: "There was an issue loading this profile" });
    }
  }, [session?.data?.access_token]);

  useEffect(() => {
    if (session.loading || user.loading) return;
    
    if (!currentUserProfile?.data?.id) {
      router.push('auth/sign-in/?message=Please+sign+in+first');
      return;
    }

    const targetProfileId = id ? id : user?.data?.id;
    if (!targetProfileId) {
      setStatus({ status: "error", message: "Please choose a user before viewing their profile" });
      return;
    }
    
    setProfileId(targetProfileId);
    loadProfile(targetProfileId);
  }, [id, session.loading, user.loading, currentUserProfile?.data?.id, router, loadProfile, user?.data?.id]);

  const isOwnProfile = useMemo(() => {
    return profileId === user?.data?.id;
  }, [profileId, user?.data?.id]);

  if (session.loading || user.loading || status.status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        user={{
          name: userName,
          email: user?.data?.email || 'No email set',
        }}
      />
      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
        user={{
          name: userName,
          email: user?.data?.email || 'no email set',
        }}
      />
      
      {/* Floating Message */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'} left-0 pointer-events-none top-20 right-0 z-[60]`}>
        {status.message && status.message.trim() !== '' && (
          <div className="pointer-events-auto flex justify-center pt-4">
            <FloatingMessage type={status.status === "error" ? "error" : "success"}>
              {status.message}
            </FloatingMessage>
          </div>
        )}
      </div>

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} pb-20 lg:pb-0`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 lg:pt-24">
          {/* Header Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute h-64 w-64 rounded-full bg-white/20 blur-3xl -top-32 -left-32"></div>
              <div className="absolute h-96 w-96 rounded-full bg-white/10 blur-3xl top-20 right-10"></div>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <MdPerson className="text-3xl text-white" />
                  </div>
                </div>
                
                <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-6xl">
                  {isOwnProfile ? 'Your Profile' : `${profile?.name || 'User'}'s Profile`}
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-blue-100">
                  {isOwnProfile 
                    ? 'Manage your account, view your activity, and access your tools' 
                    : `View ${profile?.name || 'this user'}'s public profile and information`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-6xl px-6 py-12">
            {status.status === "error" ? (
              /* Error State */
              <div className="relative overflow-hidden rounded-3xl border border-red-200/50 bg-red-50/50 shadow-lg backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-rose-100/20" />
                
                <div className="relative p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white">
                    <MdPerson className="text-2xl" />
                  </div>
                  
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Profile Not Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    {status.message || "We couldn't find the profile you're looking for."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => router.back()}
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:scale-105"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            ) : profile ? (
              <>
                {/* Profile Info Card */}
                <div className="mb-8 relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-50" />
                  
                  <div className="relative p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                      <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                          <MdPerson className="text-3xl" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {profile.name || 'Anonymous User'}
                            </h2>
                            <MdVerified className="text-blue-500 text-xl" />
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MdEmail className="text-sm" />
                            <p>{profile.contactInfo}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
                            <MdCalendarToday className="text-sm" />
                            <p>Member since {new Date(profile.createdAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      {!isOwnProfile && (
                        <button
                          onClick={() => router.push(`/profile/rating?id=${profile.id}`)}
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:scale-105 flex items-center space-x-2"
                        >
                          <MdStar />
                          <span>View Ratings</span>
                        </button>
                      )}
                    </div>
                    
                    {/* Profile Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 p-4 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <MdStar className="text-2xl text-blue-600" />
                          <div>
                            <p className="text-sm text-blue-600 font-medium">Rating Score</p>
                              <p className="text-lg font-bold text-blue-800">{(profile.ratingTo || []).reduce((sum, rating) => sum + rating.value, 0) / (profile.ratingTo || []).length}/5</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-r from-purple-100 to-purple-50 p-4 border border-purple-200">
                        <div className="flex items-center space-x-3">
                          <MdInventory className="text-2xl text-purple-600" />
                          <div>
                            <p className="text-sm text-purple-600 font-medium">Items</p>
                              <p className="text-lg font-bold text-purple-800">{(profile.offerings || []).length}</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-r from-indigo-100 to-indigo-50 p-4 border border-indigo-200">
                        <div className="flex items-center space-x-3">
                          <MdCalendarToday className="text-2xl text-indigo-600" />
                          <div>
                            <p className="text-sm text-indigo-600 font-medium">Active Since</p>
                            <p className="text-lg font-bold text-indigo-800">
                              {new Date(profile.createdAt || Date.now()).getFullYear()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Inventory Card */}
                  <Link href={'/profile/inventory'}>
                    <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50" />
                      
                      <div className="relative p-8">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                          <MdInventory className="text-2xl" />
                        </div>
                        
                        <h3 className="mb-3 text-xl font-bold text-gray-900">Inventory</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {isOwnProfile ? 'Manage your items and collections' : 'View available items'}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-green-600 font-medium group-hover:space-x-3 transition-all">
                          <span>Explore Items</span>
                          <MdArrowForward className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Ratings Card */}
                  <Link href={`/profile/rating${!isOwnProfile ? `?id=${profile.id}` : ''}`}>
                    <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-50" />
                      
                      <div className="relative p-8">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg">
                          <MdStar className="text-2xl" />
                        </div>
                        
                        <h3 className="mb-3 text-xl font-bold text-gray-900">Ratings</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {isOwnProfile ? 'See what others say about your work' : 'View user ratings and reviews'}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-orange-600 font-medium group-hover:space-x-3 transition-all">
                          <span>View Ratings</span>
                          <MdArrowForward className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Notifications Card - Only for own profile */}
                  {isOwnProfile && (
                    <Link href={'/profile/notifications'}>
                      <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
                        
                        <div className="relative p-8">
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                            <MdNotifications className="text-2xl" />
                          </div>
                          
                          <h3 className="mb-3 text-xl font-bold text-gray-900">Notifications</h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            Stay updated with your latest activity and messages
                          </p>
                          
                          <div className="flex items-center space-x-2 text-indigo-600 font-medium group-hover:space-x-3 transition-all">
                            <span>Check Updates</span>
                            <MdArrowForward className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Dashboard Card - Only for own profile */}
                  {isOwnProfile && (
                    <Link href={'/dashboard'}>
                      <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
                        
                        <div className="relative p-8">
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
                            <MdDashboard className="text-2xl" />
                          </div>
                          
                          <h3 className="mb-3 text-xl font-bold text-gray-900">Dashboard</h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            Access your main dashboard and control center
                          </p>
                          
                          <div className="flex items-center space-x-2 text-purple-600 font-medium group-hover:space-x-3 transition-all">
                            <span>Go to Dashboard</span>
                            <MdArrowForward className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              /* Loading fallback */
              <div className="flex justify-center items-center py-20">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}