import { createClient, type User, type Session, type AuthError } from '@supabase/supabase-js';

// Environment detection
const isBrowser = typeof window !== 'undefined';

// Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!', {
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey
  });
  throw new Error('Supabase configuration error: Missing environment variables');
}

// Storage interface for TypeScript
interface StorageInterface {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

// Create Supabase client with appropriate configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    storageKey: 'worldpianos-auth',
    detectSessionInUrl: isBrowser,
    storage: isBrowser ? {
      getItem: (key: string) => {
        try {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        } catch (error) {
          console.error('Error getting auth from storage:', error);
          return null;
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Error setting auth to storage:', error);
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error removing auth from storage:', error);
        }
      },
    } : undefined,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
});

// Supabase client initialization

/**
 * Authentication service class
 */
class AuthService {
  /**
   * Check if the user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      // In server-side rendering, we can't reliably check auth
      if (!isBrowser) {
        return false;
      }
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return false;
      }
      
      return !!data.session;
    } catch (err) {
      return false;
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      // In server-side rendering, we can't reliably get the user
      if (!isBrowser) {
        return null;
      }
      
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        return null;
      }
      
      return data.user;
    } catch (err) {
      return null;
    }
  }

  /**
   * Get the current session
   */
  async getSession(): Promise<Session | null> {
    try {
      if (!isBrowser) {
        return null;
      }
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return null;
      }
      
      return data.session;
    } catch (err) {
      return null;
    }
  }

  /**
   * Sign in with email and password
   */
  async signInWithPassword(email: string, password: string): Promise<{
    user: User | null;
    session: Session | null;
    error: AuthError | null;
  }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return {
        user: data?.user || null,
        session: data?.session || null,
        error
      };
    } catch (err) {
      return {
        user: null,
        session: null,
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          name: 'AuthException',
          status: 500
        } as AuthError
      };
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, metadata: Record<string, any> = {}): Promise<{
    user: User | null;
    session: Session | null;
    error: AuthError | null;
  }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      return {
        user: data?.user || null,
        session: data?.session || null,
        error
      };
    } catch (err) {
      return {
        user: null,
        session: null,
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          name: 'AuthException',
          status: 500
        } as AuthError
      };
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          name: 'AuthException',
          status: 500
        } as AuthError
      };
    }
  }

  /**
   * Reset password
   */
  async resetPasswordForEmail(email: string, redirectTo: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo
      });
      
      return { error };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          name: 'AuthException',
          status: 500
        } as AuthError
      };
    }
  }

  /**
   * Update user password
   */
  async updatePassword(password: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      return { error };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          name: 'AuthException',
          status: 500
        } as AuthError
      };
    }
  }

  /**
   * Get the return URL for redirects after authentication
   */
  getReturnUrl(): string {
    if (!isBrowser) return '/user/dashboard';
    
    const returnTo = localStorage.getItem('returnTo');
    if (returnTo) {
      localStorage.removeItem('returnTo');
      return returnTo;
    }
    
    return '/user/dashboard';
  }

  /**
   * Set the return URL for redirects after authentication
   */
  setReturnUrl(url: string): void {
    if (!isBrowser) return;
    localStorage.setItem('returnTo', url);
  }
}

// Create and export the auth service instance
export const auth = new AuthService();

/**
 * Profile service class
 */
class ProfileService {
  /**
   * Get user profile
   */
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        return null;
      }
      
      return data;
    } catch (err) {
      return null;
    }
  }

  /**
   * Create user profile
   */
  async createUserProfile(userId: string, displayName: string) {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', userId)
        .single();
      
      if (existingProfile) {
        return { data: existingProfile, error: null };
      }
      
      // Create profile
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          display_name: displayName,
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : 'Unknown error' }
      };
    }
  }

  /**
   * Create user profile via API (with service role)
   */
  async createUserProfileViaApi(userId: string, displayName: string) {
    try {
      if (!isBrowser) {
        return { success: false, error: 'Cannot call API from server-side' };
      }
      
      // Construct absolute URL for the API endpoint
      const apiUrl = new URL('/api/create-profile', window.location.origin).toString();
      
      // Call the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          displayName,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        return { success: false, error: result.message || 'Failed to create profile' };
      }
      
      return { success: true, data: result.data };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, profile: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(profile)
        .eq('id', userId)
        .select();
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : 'Unknown error' }
      };
    }
  }

  /**
   * Get user role
   */
  async getUserRole(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        return null;
      }
      
      return data?.role || 'user';
    } catch (err) {
      return null;
    }
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const role = await this.getUserRole(userId);
    return role === 'admin';
  }
}

// Create and export the profile service instance
export const profile = new ProfileService();

// Export types for convenience
export type { User, Session, AuthError };