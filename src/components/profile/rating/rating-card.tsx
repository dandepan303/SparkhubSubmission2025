'use client';

import { Rating } from '@/types';
import React, { useState } from 'react';

export default function RatingCard({ rating }: { rating: Rating }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  // Get star configuration based on rating value
  const getStarConfig = (value: number) => {
    if (value >= 4.5) {
      return {
        color: 'from-amber-400 to-yellow-500',
        bgColor: 'from-amber-50 to-yellow-100',
        borderColor: 'border-amber-200/50',
        textColor: 'text-amber-700',
        icon: '⭐',
        label: 'Excellent'
      };
    } else if (value >= 3.5) {
      return {
        color: 'from-green-400 to-emerald-500',
        bgColor: 'from-green-50 to-emerald-100',
        borderColor: 'border-green-200/50',
        textColor: 'text-green-700',
        icon: '✨',
        label: 'Good'
      };
    } else if (value >= 2.5) {
      return {
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'from-blue-50 to-cyan-100',
        borderColor: 'border-blue-200/50',
        textColor: 'text-blue-700',
        icon: '👍',
        label: 'Fair'
      };
    } else {
      return {
        color: 'from-orange-400 to-red-500',
        bgColor: 'from-orange-50 to-red-100',
        borderColor: 'border-orange-200/50',
        textColor: 'text-orange-700',
        icon: '👎',
        label: 'Poor'
      };
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-5 w-5">
          <svg className="absolute h-5 w-5 text-gray-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <svg className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      );
    }
    
    // Empty stars
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    
    return stars;
  };

  const starConfig = getStarConfig(rating.value);
  const formattedDate = new Date(rating.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white shadow-lg backdrop-blur-sm transition-all duration-500 hover:bg-gray-50 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg) scale(1.01)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 51, 234, 0.1) 40%, 
            transparent 70%)`,
        }}
      />

      <div className="relative p-6">
        {/* Header with rating value and badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Rating stars */}
            <div className="flex items-center space-x-1">
              {renderStars(rating.value)}
            </div>
            
            {/* Numerical rating */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{rating.value.toFixed(1)}</span>
              <span className="text-sm text-gray-500">/ 5.0</span>
            </div>
          </div>

          {/* Quality badge */}
          <div className={`relative rounded-full bg-gradient-to-r px-3 py-1 ${starConfig.bgColor} border ${starConfig.borderColor} shadow-sm`}>
            <div className="flex items-center space-x-1">
              <span className="text-xs">{starConfig.icon}</span>
              <span className={`text-xs font-semibold ${starConfig.textColor}`}>{starConfig.label}</span>
            </div>
          </div>
        </div>

        {/* Rating description */}
        {rating.text && (
          <div className="mb-4">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <p className="text-gray-700 leading-relaxed italic">"{rating.text}"</p>
            </div>
          </div>
        )}

        {/* Rating details grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* From user */}
          <div className="group/item rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-100 p-3 shadow-sm transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">From</p>
                <p className="text-sm font-bold text-gray-800">{rating.from?.name || 'Anonymous'}</p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="group/item rounded-xl border border-purple-200/50 bg-gradient-to-br from-purple-50 to-violet-100 p-3 shadow-sm transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 shadow-sm transition-transform duration-300 group-hover/item:scale-110">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Date</p>
                <p className="text-sm font-bold text-gray-800">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job context if available */}
        {rating.job && (
          <div className="mt-4 rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50 to-emerald-100 p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Related Job</p>
                <p className="text-sm font-bold text-gray-800">{rating.job.title}</p>
                <p className="text-xs text-gray-600 mt-1">${rating.job.payment}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}