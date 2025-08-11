'use client'
import { useAuth } from "@/components/auth/auth-provider";
import { parseError } from "@/lib/util/server_util";
import { NotificationsGetRet } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Notification from '@/components/profile/notifications/notification';

// Loading Spinner
const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
    </div>
);

export default function NotificationsList({ className }: { className?: string }) {
  const { session } = useAuth();
  const [status, setStatus] = useState<{ status: "success" | "error" | "loading" | "null"; message: string }>({ status: 'null', message: "" });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newNotifications, setNewNotifications] = useState<boolean>(false);

  const loadNotifications = useCallback(async () => {
    if (!session?.data?.access_token) {
        setStatus({ status: "error", message: "No active session found. Please log in." });
        return;
    }
    
    try {
      setStatus({ status: "loading", message: "" });
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout
      
      const { data: res }: { data: NotificationsGetRet } = await axios.get(`/api/profile/notifications`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
      });
      
      setStatus(res);
      if (res.status === "success") {
        setNotifications(res.notifications || []);
        setNewNotifications(res.newNotifications || false);
      }
    } catch (error: any) {
      console.error("/component/notification load notifications error");
      await parseError(error.message, error.code);
      setStatus({ status: "error", message: "There was an issue loading your notifications" });
    }
  }, [session]);

  useEffect(() => {
    if (session.loading) return;
    
    loadNotifications();
  }, [session.loading, loadNotifications]);

  return (
    <div className={`${className}`}>
      {/* Loading State */}
      {status.status === "loading" && <LoadingSpinner />}
      
      {/* Error State */}
      {status.status === "error" && (
        <div className="p-4 text-center">
          <p className="text-sm text-red-600">{status.message}</p>
          <button 
            onClick={loadNotifications}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Success State */}
      {status.status === "success" && (
        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Notification
                key={index}
                notification={notification}
                index={index}
              />
            ))
          ) : (
            <div className="p-6 text-center">
              <div className="mb-2 text-2xl">📫</div>
              <p className="text-sm text-gray-600">No notifications</p>
            </div>
          )}
        </div>
      )}

      {/* Initial/Null State */}
      {status.status === "null" && (
        <div className="p-6 text-center">
          <div className="mb-2 text-2xl">🔔</div>
          <p className="text-sm text-gray-600">Click to load notifications</p>
        </div>
      )}
    </div>
  );
};