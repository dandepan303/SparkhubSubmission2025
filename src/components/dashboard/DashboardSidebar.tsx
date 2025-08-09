'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      path: '/dashboard',
    },
    {
      id: 'offers',
      label: 'My Offers',
      icon: '📝',
      path: '/offers',
    },
    {
      id: 'requests',
      label: 'My Requests',
      icon: '🔍',
      path: '/requests',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/settings',
    }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Open sidebar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-2 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                
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
                        <span className="text-lg select-none">{item.icon}</span>
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
          </nav>

          {/* Bottom Section - User Profile */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0">
            <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-sm flex-shrink-0">
                U
              </div>
              
              {/* User Info - only show when expanded */}
              {isOpen && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <nav className="px-2 py-1">
          <ul className="flex items-center justify-around">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={item.id} className="flex-1">
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
                      <span className="text-xl select-none">{item.icon}</span>
                    </div>

                    {/* Label */}
                    <span className={`text-xs font-medium truncate max-w-full transition-colors duration-200
                      ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile User Profile - Overlay */}
        <div className="absolute -top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 hidden" id="mobile-user-menu">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm flex-shrink-0">
              U
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
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