'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Import the components we created
import Sidebar from '@/components/dashboard/DashboardSidebar';
import Header from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/components/auth/auth-provider';
import Loading from '@/components/ui/loading';
import FloatingMessage from '@/components/ui/floating-message';
import { FaUser, FaBell, FaChild, FaPalette, FaDatabase, FaKey } from 'react-icons/fa';

export default function Settings() {
  const router = useRouter();
  const [status, setStatus] = useState<{ status: 'loading' | 'authenticated' | 'unauthenticated' }>({ status: 'loading' });
  const { user, loading } = useAuth();
  
  // State for floating messages
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({ type: 'success' as 'success' | 'error' | 'info', text: '' });
  
  // Settings state
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: '',
      email: '',
      bio: '',
      timezone: 'UTC',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      jobAlerts: true,
      weeklyDigest: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      allowMessages: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
      compactMode: false,
    }
  });

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      setStatus({ status: 'unauthenticated' });
      router.push('/');
      return;
    }
    
    setStatus({ status: 'authenticated' });
    
    // Initialize settings with user data
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
        email: user?.email || '',
      }
    }));
  }, [loading, user, router]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    setMessageContent({ type: 'success', text: 'Settings saved successfully!' });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  if (status.status === 'loading') {
    return <Loading />;
  }

  if (status.status === 'unauthenticated') {
    return <Loading />; // Show loading while redirecting
  }

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy & Security', icon: FaChild },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'data', label: 'Data & Storage', icon: FaDatabase },
    { id: 'account', label: 'Account', icon: FaKey },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={settings.profile.bio}
                onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.profile.timezone}
                onChange={(e) => handleSettingChange('profile', 'timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                      {key === 'pushNotifications' && 'Get push notifications in your browser'}
                      {key === 'jobAlerts' && 'Get notified about new job opportunities'}
                      {key === 'weeklyDigest' && 'Receive a weekly summary of your activity'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Show Email Address</h4>
                  <p className="text-sm text-gray-600">Allow others to see your email address</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Allow Messages</h4>
                  <p className="text-sm text-gray-600">Let other users send you messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.allowMessages}
                    onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex space-x-4">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <label key={theme} className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={settings.appearance.theme === theme}
                        onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={settings.appearance.language}
                  onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Compact Mode</h4>
                  <p className="text-sm text-gray-600">Use a more compact layout to fit more content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.appearance.compactMode}
                    onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'data':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Data & Storage</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-4">Download a copy of your data</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Data
                </button>
              </div>
              
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                <p className="text-sm text-red-600 mb-4">Permanently delete your account and all associated data</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'account':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                <p className="text-sm text-gray-600 mb-4">Update your account password</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Change Password
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Connected Accounts</h4>
                <p className="text-sm text-gray-600 mb-4">Manage your connected social media accounts</p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Manage Connections
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }}
      />

      {/* Header */}
      <Header
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
          email: user?.email || 'user@example.com',
        }}
      />

      {/* Floating Messages Container - Positioned after header */}
      <div className={`fixed transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-16'} right-0 top-20 z-[60] pointer-events-none`}>
        {showMessage && (
          <div className="flex justify-center pt-4 pointer-events-auto">
            <FloatingMessage type={messageContent.type}>
              {messageContent.text}
            </FloatingMessage>
          </div>
        )}
      </div>

      {/* Main Content Container */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-20`}>
        <div className="px-6 py-8">
          {/* Settings content area */}
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Settings Header */}
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account preferences and settings</p>
            </div>

            {/* Settings Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <nav className="space-y-2">
                    {settingsTabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-100 text-blue-900'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <IconComponent className="mr-3 h-5 w-5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {renderTabContent()}
                  
                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          // Reset to original values - you'd implement this logic
                          setMessageContent({ type: 'info', text: 'Changes discarded' });
                          setShowMessage(true);
                          setTimeout(() => setShowMessage(false), 3000);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveSettings}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}