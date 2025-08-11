"use client";

import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
// Notification Item Component
export default function Notification({ notification, index, onClick }: { notification: string; index: number; onClick?: (notification: string, index: number) => void }) {
    return (
        <div onClick={() => onClick?.(notification, index)} className={`group relative overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all duration-300 ${onClick ? "cursor-pointer hover:bg-gray-100" : ""}`}>
            {/* Subtle gradient overlay on hover */}
            {onClick && <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-r from-blue-500 to-purple-600" />}

            <div className="relative flex items-start space-x-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm">
                        <span className="text-xs">🔔</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-relaxed">{notification}</p>
                    <p className="mt-1 text-xs text-gray-500">Just now</p>
                </div>
            </div>
        </div>
    );
}
