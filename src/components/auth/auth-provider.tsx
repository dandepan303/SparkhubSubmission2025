'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { User as AppUser } from '@/types';
import axios from 'axios';
import { config } from '@/lib/config';
import { parseError } from '@/lib/util/server_util';

interface AuthContextType {
  user: { data: User | null; loading: boolean };
  profile: { data: AppUser | null; loading: boolean };
  session: { data: Session | null; loading: boolean };
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AppUser>) => Promise<void>;
  getUser: () => Promise<User | null>;
  version: number;
}

const log: boolean = false;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ data: User | null; loading: boolean }>({ data: null, loading: true });
  const [profile, setProfile] = useState<{ data: AppUser | null; loading: boolean }>({ data: null, loading: true });
  const [session, setSession] = useState<{ data: Session | null; loading: boolean }>({ data: null, loading: true });
  const [version, setVersion] = useState<number>(0);

  const fetchProfile = useCallback(async (currSession: Session | null) => {
    if (log) console.log('fetchProfile called with session:', !!currSession);
    
    // Handle null session case - important for unauthenticated users
    if (!currSession?.user?.id) {
      console.log('No session or user, setting profile to null');
      setProfile({ data: null, loading: false });
      return;
    }
    
    try {
      const res = await axios.get(`/api/profile?id=${currSession.user.id}`, {
        validateStatus: () => true,
        withCredentials: true,
        headers: { Authorization: `Bearer ${currSession?.access_token}` },
      });
      
      if (res.data && res.data.user) {
        if (log) console.log('Profile fetched successfully');
        setProfile({ data: res.data.user, loading: false });
      } else {
        if (log) console.log('No profile data returned');
        setProfile({ data: null, loading: false });
      }
    } catch (error: any) {
      console.log('Error fetching profile:', error);
      setProfile({ data: null, loading: false });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!user.data) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.data?.id)
        .select()
        .single();

      if (error) {
        console.log('Error updating profile:', error);
        return;
      }

      setProfile({ data: data, loading: false });
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const getUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      
      if (error) {
        console.log('/components/auth-provider get_user error');
        parseError(error.message, error.code);
        return null;
      }
      
      return user;
    } catch (error: any) {
      console.error('/components/auth-provider get_user error');
      parseError(error?.message, error?.code);
      return null;
    }
  };

  useEffect(() => {
    if (log) console.log('Auth provider initializing...');
    
    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.warn('Auth loading timeout - forcing loading states to false');
      setUser(prev => ({ data: prev.data, loading: false }));
      setProfile(prev => ({ data: prev.data, loading: false }));
      setSession(prev => ({ data: prev.data, loading: false }));
    }, 10000); // 10 second timeout

    // Get initial session
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (log) console.log('Initial session loaded:', !!session);
        
        setSession({ data: session, loading: false });
        setUser({ data: session?.user ?? null, loading: false });
        
        // Always call fetchProfile - it will handle null session appropriately
        await fetchProfile(session);
        
        setVersion(v => v + 1);
        clearTimeout(timeout);
      })
      .catch(error => {
        console.log('Error getting initial session:', error);
        setUser({ data: null, loading: false });
        setProfile({ data: null, loading: false });
        setSession({ data: null, loading: false });
        clearTimeout(timeout);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (log) console.log('Auth state changed:', event, !!session);
      
      setSession({ data: session, loading: false });
      setUser({ data: session?.user ?? null, loading: false });

      if (event === 'SIGNED_IN' && session?.user) {
        await fetchProfile(session);
      } else if (event === 'SIGNED_OUT') {
        setProfile({ data: null, loading: false });
      } else {
        // Handle other events where session might be null
        await fetchProfile(session);
      }

      setVersion(v => v + 1);
    });

    return () => {
      if (log) console.log('Auth provider cleaning up...');
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [fetchProfile]);

  // Debug logging
  useEffect(() => {
   if (log)  console.log('Auth state:', {
      user: { data: !!user.data, loading: user.loading },
      profile: { data: !!profile?.data, loading: profile.loading },
      session: { data: !!session.data, loading: session.loading },
      version
    });
  }, [user, profile, session, version]);

  const value = {
    user,
    profile,
    session,
    signIn,
    signOut,
    updateProfile,
    getUser,
    version,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}