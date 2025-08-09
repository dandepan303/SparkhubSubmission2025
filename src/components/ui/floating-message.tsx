'use client';
import React, { useState, useEffect } from 'react';
import { MdOutlineClose, MdOutlineInfo, MdOutlineCheckCircleOutline, MdOutlineErrorOutline } from 'react-icons/md';

interface FloatingMessageProps {
  children: React.ReactNode;
  className?: string;
  type?: 'info' | 'success' | 'error' | 'default';
  autoHideAfter?: number; // Duration in milliseconds
}

export default function FloatingMessage({ children, type = 'default', className = '', autoHideAfter = 3000 }: FloatingMessageProps) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoHideAfter > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Wait for exit animation to complete before hiding
        setTimeout(() => setVisible(false), 300);
      }, autoHideAfter);

      return () => clearTimeout(timer);
    }
  }, [autoHideAfter]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  // Define styles and icon based on the message type
  const styleMap = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: MdOutlineInfo,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: MdOutlineCheckCircleOutline,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: MdOutlineErrorOutline,
    },
    default: {
      bg: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-800',
      icon: MdOutlineInfo,
    },
  };

  const { bg, border, text, icon: IconComponent } = styleMap[type];

  return (
    <div
      className={`rounded-xl ${bg} border ${border} px-5 py-4 ${text} flex items-center justify-between shadow-lg transition-all duration-300 ${
        isExiting ? 'animate-slideOut opacity-0 scale-95' : 'animate-slideIn opacity-100 scale-100'
      } ${className}`}
      role="alert"
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">
          <IconComponent />
        </span>
        <span>{children}</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        aria-label="Close"
        type="button"
      >
        <MdOutlineClose className="text-xl" />
      </button>
    </div>
  );
}