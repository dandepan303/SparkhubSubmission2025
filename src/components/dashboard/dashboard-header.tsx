'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import Image from 'next/image';
import Notification from '@/components/profile/notifications/notifications-list';
import { MdMail } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

// The user is now passed as a prop again, so the interface needs to be updated.
interface HeaderProps {
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

// The component receives the user object directly from its props.
export default function Header({ sidebarOpen = true, onSidebarToggle, user }: HeaderProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<any>(null);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (inboxRef.current && !inboxRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setProfileDropdownOpen(false);
    }
  };

  const handleProfileClick = () => {
    router.push('/profile');
    setProfileDropdownOpen(false);
  };

  // Define these variables to simplify the JSX, using the user prop.
  const userName = user?.name || 'User';
  const userInitial = userName.charAt(0);
  const userEmail = user?.email || 'user@example.com';
  const userAvatar = user?.avatar;

  return (
    <header className={`fixed top-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-sm
      ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'}
      left-0`}>
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        
        {/* Left Section - Tradespace Name (for mobile) */}
        <div className="flex items-center">
          {/* Tradespace Name (only on mobile) */}
          <div className="lg:hidden flex-1">
            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
              Trade<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
            </h1>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Notification Button */}
          <div className="relative" ref={inboxRef}>
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                // Load notifications when opening dropdown
                if (!notificationOpen && notificationRef.current) {
                  // notificationRef.current.loadNotifications();
                }
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/80 text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              {/* Mail Icon */}
              <MdMail className="h-5 w-5" />
            </button>

            {/* Notifications Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-xl">
                {/* Header */}
                <div className="border-b border-gray-200/50 p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>

                {/* Content Area */}
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <Notification />
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200/50 p-4">
                  <button
                    onClick={() => {
                      router.push('/profile/notifications');
                      setNotificationOpen(false);
                    }}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 rounded-full bg-gray-100/80 p-1 pr-2 sm:pr-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105 group"
            >
              {/* Avatar - Updated to use aspect-square */}
              <div className="relative h-8 w-8 aspect-square flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white shadow-md">
                {userAvatar ? (
                  <Image src={userAvatar} alt="Profile" fill className="rounded-full object-cover" />
                ) : (
                  <span>{userInitial}</span>
                )}
              </div>
              
              {/* Name - Hidden on small screens, shown on medium+ */}
              <span className="hidden lg:block text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                {userName}
              </span>
              
              {/* Chevron */}
              <svg
                className={`h-4 w-4 text-gray-500 group-hover:text-white transition-all duration-200 ${
                  profileDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-xl">
                {/* User Info - Clickable Profile Section */}
                <button
                  onClick={handleProfileClick}
                  className="w-full border-b border-gray-200/50 p-4 text-left transition-colors hover:bg-gray-50/80"
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar - Updated to use aspect-square, and is a little smaller */}
                    <div className="relative h-10 w-10 aspect-square flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-base font-bold text-white">
                      {userAvatar ? (
                        <Image src={userAvatar} alt="Profile" fill className="rounded-full object-cover" />
                      ) : (
                        <span>{userInitial}</span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      {/* Name - Added truncate and max-w to handle long names */}
                      <p className="font-semibold text-gray-900 truncate">{userName}</p>
                      {/* Email - Added truncate to handle long emails */}
                      <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                    </div>
                  </div>
                </button>

                {/* Sign Out */}
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors hover:bg-red-50/80"
                  >
                    <FiLogOut className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
