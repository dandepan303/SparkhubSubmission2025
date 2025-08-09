'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import the components we created
import Sidebar from '@/components/dashboard/DashboardSidebar';
import Header from '@/components/dashboard/DashboardHeader';

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@tradespace.com',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Header */}
      <Header 
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-20`}>
        <div className="px-6 py-8">
          {/* Empty dashboard content area */}
          <div className="text-center text-gray-500">
            <p>Dashboard content goes here...</p>
          </div>
        </div>
      </main>
    </div>
  );
}