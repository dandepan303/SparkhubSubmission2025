'use client';

import { User } from "@/types";
import RatingCard from "./rating-card";
import React, { useState } from 'react';

export default function RatingList({ profile }: { profile: User }) {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!profile.ratingTo || profile.ratingTo.length === 0) return 0;
    const sum = profile.ratingTo.reduce((acc, rating) => acc + rating.value, 0);
    return sum / profile.ratingTo.length;
  };

  // Get rating distribution
  const getRatingDistribution = () => {
    if (!profile.ratingTo || profile.ratingTo.length === 0) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    profile.ratingTo.forEach(rating => {
      const rounded = Math.round(rating.value);
      if (rounded >= 1 && rounded <= 5) {
        distribution[rounded as keyof typeof distribution]++;
      }
    });
    
    return distribution;
  };

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalRatings = profile.ratingTo?.length || 0;

  // Render stars for average rating
  const renderAverageStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="h-6 w-6 text-amber-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-6 w-6">
          <svg className="absolute h-6 w-6 text-gray-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <svg className="h-6 w-6 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="h-6 w-6 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-xl backdrop-blur-sm">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ratings Overview
              </h2>
              <p className="text-gray-600">See what others are saying about {profile.name}</p>
            </div>
            
            {/* Summary stats */}
            <div className="flex items-center space-x-8">
              {/* Average rating */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                  <span className="text-lg text-gray-500">/ 5.0</span>
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {renderAverageStars(averageRating)}
                </div>
                <p className="text-sm text-gray-600">{totalRatings} rating{totalRatings !== 1 ? 's' : ''}</p>
              </div>
              
              {/* Rating distribution bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = ratingDistribution[star as keyof typeof ratingDistribution];
                  const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                  
                  return (
                    <div key={star} className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-gray-600 w-2">{star}</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Grid */}
      {profile.ratingTo && profile.ratingTo.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">All Ratings</h3>
            <div className="text-sm text-gray-500">
              Showing {profile.ratingTo.length} rating{profile.ratingTo.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="space-y-6">
            {profile.ratingTo.map((rating) => (
              <RatingCard key={rating.id} rating={rating} />
            ))}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-lg backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-100 opacity-50" />
          
          <div className="relative p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No Ratings Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {profile.name} hasn't received any ratings yet. Complete some jobs to start building your reputation!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}