'use client'

import React, { useEffect, useState } from 'react';
import { MdAttachMoney, MdInventory, MdCalendarToday, MdEdit, MdDelete, MdSwapHoriz } from 'react-icons/md';
import { useAuth } from '@/components/auth/auth-provider';
import { Offering, OfferingPostArgs } from '@/types';

interface OfferingCardArgs {
  offering: Offering;
  onUpdate: (newOffering: OfferingPostArgs) => void;
  onDelete: (offeringId: string) => void;
  onSpend: (offeringId: string) => void;
}

export default function OfferingCard({ offering, onUpdate, onDelete, onSpend }: OfferingCardArgs) {
  const { user, profile } = useAuth();
  const [userRole, setUserRole] = useState<'owner' | 'spender' | 'standard'>('standard');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    description: offering.description,
    cost: offering.cost,
    quantity: offering.quantity
  });

  useEffect(() => {
    if (user.loading || profile.loading) return;
    if (user?.data?.id === offering.userId) setUserRole('owner');
    else if (profile?.data?.jobsWorking.some(job => 
      job.hirerId === offering.userId && 
      job.status === 'COMPLETED' && 
      job.payment > 0
    )) setUserRole('spender');
  }, [profile, offering, user]);

  // Mouse tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };

  // Format the date
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSaveEdit = () => {
    onUpdate({
      offeringId: offering.id,
      description: editData.description,
      cost: editData.cost,
      quantity: editData.quantity
    });
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      description: offering.description,
      cost: offering.cost,
      quantity: offering.quantity
    });
    setIsEditMode(false);
  };

  // Get role-based styling
  const getRoleColors = () => {
    switch (userRole) {
      case 'owner':
        return {
          gradient: 'from-blue-500 to-purple-600',
          accent: 'blue-500',
          glow: 'rgba(59, 130, 246, 0.3)'
        };
      case 'spender':
        return {
          gradient: 'from-green-500 to-teal-600',
          accent: 'green-500',
          glow: 'rgba(34, 197, 94, 0.3)'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          accent: 'gray-400',
          glow: 'rgba(107, 114, 128, 0.2)'
        };
    }
  };

  const colors = getRoleColors();
  const rotateX = isHovered ? mousePosition.y * -8 : 0;
  const rotateY = isHovered ? mousePosition.x * 8 : 0;

  return (
    <div className="relative flex justify-center items-center">
      {/* Gradient Glow Effect */}
      {isHovered && (
        <div
          className="absolute -inset-2 rounded-3xl opacity-60 blur-xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          }}
        />
      )}

      <div
        className={`relative w-full max-w-sm transition-all duration-300 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
      >
        {/* Main Card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-200/20 bg-white/95 shadow-xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            transform: 'translateZ(10px)',
          }}
        >
          {/* Header with Role Indicator */}
          <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />
          
          <div className="p-6">
            {/* Header Section */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                {isEditMode ? (
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    className="flex-1 resize-none rounded-lg border border-gray-300 p-2 text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    rows={2}
                  />
                ) : (
                  <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-gray-900">
                    {offering.description}
                  </h3>
                )}
                
                {/* Role Badge */}
                <div className={`ml-2 rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                  userRole === 'owner' 
                    ? 'bg-blue-100 text-blue-700' 
                    : userRole === 'spender' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {userRole}
                </div>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <MdCalendarToday className="mr-1" />
                Created {formatDate(offering.createdAt)}
              </div>
            </div>

            {/* Cost Display */}
            <div className="mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-green-500 p-2">
                  <MdAttachMoney className="text-xl text-white" />
                </div>
                {isEditMode ? (
                  <input
                    type="number"
                    value={editData.cost}
                    onChange={(e) => setEditData({...editData, cost: parseInt(e.target.value)})}
                    className="w-20 rounded-lg border border-gray-300 p-1 text-center text-xl font-bold text-green-600 focus:border-green-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-2xl font-black text-green-600">{offering.cost}</span>
                )}
                <span className="text-sm text-green-600 font-medium">credits</span>
              </div>
            </div>

            {/* Quantity Display */}
            {(offering.quantity !== null || isEditMode) && (
              <div className="mb-4 flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
                <div className="rounded-full bg-blue-500 p-1">
                  <MdInventory className="text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  {isEditMode ? (
                    <input
                      type="number"
                      value={editData.quantity || ''}
                      onChange={(e) => setEditData({...editData, quantity: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-16 rounded border border-gray-300 p-1 text-center text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="None"
                    />
                  ) : (
                    <span className="font-bold text-blue-600">{offering.quantity}</span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {userRole === 'owner' && (
                <div className="flex space-x-2">
                  {isEditMode ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:scale-105"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 rounded-lg border border-gray-300 bg-gray-100 py-2 text-sm font-bold text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:scale-105"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:scale-105"
                      >
                        <MdEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDelete(offering.id)}
                        className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:scale-105"
                      >
                        <MdDelete />
                        <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {userRole === 'spender' && (
                <button
                  onClick={() => onSpend(offering.id)}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-teal-700 hover:scale-105"
                >
                  <MdSwapHoriz className="text-lg" />
                  <span>Exchange One</span>
                </button>
              )}
            </div>

            {/* Footer Info */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
              <div className="text-xs text-gray-500">
                ID: {offering.id.slice(0, 8)}...
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">Active</span>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-2 text-center text-xs text-gray-400">
              Updated {formatDate(offering.updatedAt)}
            </div>
          </div>
        </div>

        {/* 3D Card Back (for depth effect) */}
        <div
          className="absolute inset-0 rounded-2xl border border-gray-300/50 bg-gray-100"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />
      </div>
    </div>
  );
}