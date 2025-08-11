'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MdOutlineBackpack } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { 
  AiOutlineHome, 
  AiOutlineFileText, 
  AiOutlineSearch, 
  AiOutlineSetting,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineMail
} from 'react-icons/ai';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean; // Now a required prop, not optional
  onToggle: () => void; // Now a required prop, not optional
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Sidebar({ isOpen, onToggle, user }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const topMenuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: AiOutlineHome,
      path: '/dashboard',
    },
    {
      id: 'discover-jobs',
      label: 'Discover Jobs',
      icon: AiOutlineSearch,
      path: '/discover-jobs',
    },
    {
      id: 'create-job',
      label: 'Create Job',
      icon: AiOutlineFileText,
      path: '/create-job',
    },
  ];

  const bottomMenuItems = [
    {
      id: 'Inventory',
      label: 'Inventory',
      icon: MdOutlineBackpack,
      path: '/profile/inventory',
    },
    {
      id: 'My Ratings',
      label: 'My Ratings',
      icon: FaRegStar,
      path: '/profile/rating',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: AiOutlineMail,
      path: '/profile/notifications',
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const renderMenuItems = (items: typeof topMenuItems) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.path;
        const IconComponent = item.icon;
        
        return (
          <li key={item.id}>
            <button
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative w-full flex items-center rounded-lg p-3 text-left transition-all duration-200
                ${isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                } 
                ${!isOpen ? 'justify-center' : ''}
                min-h-[44px]`}
              title={!isOpen ? item.label : undefined}
              aria-label={item.label}
            >
              {/* Icon */}
              <div className={`flex items-center justify-center flex-shrink-0 
                ${isOpen ? 'mr-3' : ''}`}>
                <IconComponent className="h-5 w-5" />
              </div>

              {/* Label - only show when expanded */}
              {isOpen && (
                <span className="font-medium text-sm truncate">
                  {item.label}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {!isOpen && hoveredItem === item.id && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}

              {/* Active Indicator */}
              {isActive && isOpen && (
                <div className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-600 flex-shrink-0" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div
          className={`fixed left-0 top-0 z-50 h-full transition-all duration-300 ease-out flex flex-col
            ${isOpen 
              ? 'w-64 translate-x-0' 
              : 'w-16'
            } 
            bg-white border-r border-gray-200 shadow-lg`}
        >
          {/* Header */}
          <div className={`flex items-center p-4 border-b border-gray-200 min-h-[73px] flex-shrink-0
            ${isOpen ? 'justify-between' : 'justify-center'}`}>
            {isOpen ? (
              <>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
                    Trade<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Space</span>
                  </h1>
                </div>
                
                <button
                  onClick={onToggle}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0 ml-2"
                  aria-label="Close sidebar"
                >
                  <AiOutlineLeft className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Open sidebar"
              >
                <AiOutlineRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-2 flex-1 overflow-y-auto">
            {/* Top Menu Items */}
            {renderMenuItems(topMenuItems)}
            
            {/* Divider Line */}
            <div className="my-4 mx-3">
              <div className="h-px bg-gray-200"></div>
            </div>
            
            {/* Bottom Menu Items */}
            {renderMenuItems(bottomMenuItems)}
          </nav>

          {/* Bottom Section - User Profile */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0">
            <button
              onClick={handleProfileClick}
              className={`w-full flex items-center transition-all duration-200 rounded-lg p-2 -m-2 hover:bg-gray-50 active:bg-gray-100
                ${isOpen ? 'space-x-3' : 'justify-center'}`}
              aria-label="Go to profile"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-sm flex-shrink-0">
                {user?.avatar ? (
                  <Image 
                    src={user.avatar} 
                    alt={user.name || 'User'} 
                    className="h-10 w-10 rounded-full object-cover" 
                  />
                ) : (
                  <span>{getUserInitial()}</span>
                )}
              </div>
              
              {/* User Info - only show when expanded */}
              {isOpen && (
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'User Name'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <nav className="px-2 py-1">
          <ul className="flex items-center justify-around">
            {[...topMenuItems, ...bottomMenuItems].map((item) => {
              const isActive = pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <li key={item.id} className="flex-1 relative"> {/* Add 'relative' to the list item */}
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 touch-manipulation
                      ${isActive
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 active:text-blue-600'
                      }`}
                    aria-label={item.label}
                  >
                    {/* Icon */}
                    <div className={`flex items-center justify-center mb-1 transition-transform duration-200
                      ${isActive ? 'scale-110' : ''}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Label */}
                    <span className={`text-xs font-medium truncate max-w-full transition-colors duration-200
                      ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-blue-600 rounded-t-full" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile User Profile - Overlay */}
        <div className="absolute -top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 hidden" id="mobile-user-menu">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors"
            aria-label="Go to profile"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm flex-shrink-0">
              {user?.avatar ? (
                <Image 
                  src={user.avatar} 
                  alt={user.name || 'User'} 
                  className="h-8 w-8 rounded-full object-cover" 
                />
              ) : (
                <span>{getUserInitial()}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User Name'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Add bottom padding to body content on mobile to account for bottom nav */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
}