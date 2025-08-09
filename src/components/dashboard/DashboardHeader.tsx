'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';

interface HeaderProps {
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({ sidebarOpen = true, onSidebarToggle, user }: HeaderProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [messages] = useState(2); // Mock message count
  
  const profileRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (inboxRef.current && !inboxRef.current.contains(event.target as Node)) {
        setInboxOpen(false);
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

  const mockMessages = [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Interested in your garden vegetables!',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      message: 'Thanks for the guitar lesson yesterday',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'Can we reschedule the car wash?',
      time: '3 hours ago',
      unread: false
    }
  ];

  return (
    <header className={`fixed top-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-sm
      ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'}
      left-0`}>
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search skills and services..."
              className="w-48 lg:w-64 xl:w-80 rounded-full border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Inbox Button */}
          <div className="relative" ref={inboxRef}>
            <button
              onClick={() => setInboxOpen(!inboxOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/80 text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg hover:scale-105"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {messages > 0 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-xs font-bold text-white">
                  {messages}
                </div>
              )}
            </button>

            {/* Inbox Dropdown */}
            {inboxOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-xl">
                <div className="border-b border-gray-200/50 p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`border-b border-gray-100 p-4 transition-colors hover:bg-gray-50/80 cursor-pointer ${
                        message.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className={`font-semibold text-sm ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                              {message.sender}
                            </p>
                            {message.unread && (
                              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200/50 p-4">
                  <button
                    onClick={() => router.push('/messages')}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
                  >
                    View All Messages
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
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white shadow-md">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0) || 'U'}</span>
                )}
              </div>
              
              {/* Name - Hidden on small screens, shown on medium+ */}
              <span className="hidden lg:block text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                {user?.name || 'User'}
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
                {/* User Info */}
                <div className="border-b border-gray-200/50 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-bold text-white">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
                      ) : (
                        <span>{user?.name?.charAt(0) || 'U'}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name || 'User Name'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {[
                    { icon: '👤', label: 'View Profile', path: '/profile' },
                    { icon: '⚙️', label: 'Settings', path: '/settings' },
                    { icon: '💰', label: 'Trade History', path: '/history' },
                    { icon: '❓', label: 'Help & Support', path: '/help' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(item.path);
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-100/80"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-200/50 p-2">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors hover:bg-red-50/80"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="text-sm font-medium text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search - Shown below header on mobile only */}
      <div className="border-t border-gray-200/20 p-3 sm:p-4 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search skills and services..."
            className="w-full rounded-full border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </header>
  );
}