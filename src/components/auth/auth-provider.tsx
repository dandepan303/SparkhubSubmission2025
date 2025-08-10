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
    try {
      const res = await axios.get(`/api/profile/?id=${currSession.user.id}`, {
        validateStatus: () => true,
        withCredentials: true,
        headers: { Authorization: `Bearer ${currSession?.access_token}` },
      });
      if (res.data && res.data.user) {
        setProfile({ data: res.data.user, loading: false });
      } else {
        setProfile({ data: null, loading: false });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
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
    if (!user) return;

    try {
      const { data, error } = await supabase.from('profiles').update(updates).eq('id', user.data.id).select().single();

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      setProfile({ data: data, loading: false });
    } catch (error) {
      console.error('Error updating profile:', error);
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
    } catch (error) {
      console.error('/components/auth-provider get_user error');
      parseError(error.message, error.code);
      return null;
    }
  };

  useEffect(() => {
    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.warn('Auth loading timeout - setting loading to false');
      setUser({ data: user.data, loading: false });
      setProfile({ data: profile.data, loading: false });
      setSession({ data: session.data, loading: false });
    }, 10000); // 10 second timeout

    // Get initial session
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        setSession({ data: session, loading: false });
        setUser({ data: session?.user ?? null, loading: false });
        if (session?.user) {
          await fetchProfile(session);
        }
        setVersion(v => v + 1); // Increment version on initial session
        clearTimeout(timeout);
      })
      .catch(error => {
        setUser({ data: user.data, loading: false });
        setProfile({ data: profile.data, loading: false });
        setSession({ data: session.data, loading: false });
        clearTimeout(timeout);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession({ data: session, loading: false });
      setUser({ data: session?.user ?? null, loading: false });

      if (event === 'SIGNED_IN' && session?.user) {
        await fetchProfile(session);
      } else if (event === 'SIGNED_OUT') {
        setProfile({ data: null, loading: false });
      }

      setVersion(v => v + 1);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [fetchProfile]);

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
