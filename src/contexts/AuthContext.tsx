import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthError } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
  status_message?: string;
  timezone?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  url?: string; // For compatibility with existing components
  icon?: string; // Add icon property for compatibility
}

// Extend User type to include displayName and other properties for compatibility
export interface ExtendedUser extends User {
  displayName?: string;
  status?: {
    text?: string;
    emoji?: string;
  };
  presence?: 'active' | 'away' | 'offline' | 'dnd';
  avatar?: string;
  role?: string;
  timezone?: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  profile: Profile | null;
  workspace: Workspace | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setWorkspace: (workspace: Workspace | null) => void;
  updateUserStatus: (status: { text?: string; emoji?: string }) => void;
  updateUserPresence: (presence: 'active' | 'away' | 'offline' | 'dnd') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const extendedUser: ExtendedUser = {
          ...session.user,
          displayName: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'Unknown User',
          status: { text: '', emoji: '😀' },
          presence: 'active',
          avatar: session.user.user_metadata?.avatar_url,
          role: 'Member',
          timezone: 'UTC'
        };
        setUser(extendedUser);
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const extendedUser: ExtendedUser = {
          ...session.user,
          displayName: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'Unknown User',
          status: { text: '', emoji: '😀' },
          presence: 'active',
          avatar: session.user.user_metadata?.avatar_url,
          role: 'Member',
          timezone: 'UTC'
        };
        setUser(extendedUser);
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setWorkspace(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);

      // Load user's workspaces and set the first one as current
      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace_members')
        .select(`
          workspace_id,
          workspaces (
            id,
            name,
            slug,
            description,
            logo_url,
            owner_id,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', userId)
        .limit(1);

      if (!workspaceError && workspaceData && workspaceData.length > 0) {
        const workspace = workspaceData[0].workspaces as any;
        setWorkspace({
          ...workspace,
          url: workspace.slug, // Add url property for compatibility
          icon: workspace.name?.charAt(0)?.toUpperCase() || 'W' // Add icon property
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setWorkspace(null);
  };

  const logout = async () => {
    await signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const setCurrentWorkspace = (newWorkspace: Workspace | null) => {
    setWorkspace(newWorkspace);
  };

  const updateUserStatus = (status: { text?: string; emoji?: string }) => {
    setUser(prev => prev ? { ...prev, status } : null);
  };

  const updateUserPresence = (presence: 'active' | 'away' | 'offline' | 'dnd') => {
    setUser(prev => prev ? { ...prev, presence } : null);
  };

  const value = {
    user,
    profile,
    workspace,
    loading,
    signUp,
    signIn,
    signOut,
    logout,
    updateProfile,
    setCurrentWorkspace,
    setWorkspace: setCurrentWorkspace,
    updateUserStatus,
    updateUserPresence,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export User type for compatibility
export type { User };
