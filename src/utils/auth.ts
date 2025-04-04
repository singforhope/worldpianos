import { type User, type Session, type AuthError } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

// Environment detection
const isBrowser = typeof window !== 'undefined';

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
      
      // First, check localStorage directly for session data
      try {
        const storedSession = localStorage.getItem('worldpianos-auth');
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          // If the stored session has a non-expired access token, consider the user authenticated
          if (parsedSession && parsedSession.access_token && parsedSession.expires_at) {
            const expiresAt = new Date(parsedSession.expires_at * 1000);
            // Check if the token is not expired (with 60 seconds buffer)
            if (expiresAt > new Date(Date.now() + 60000)) {
              return true;
            }
          }
        }
      } catch (e) {
        // Silent fail for storage errors
      }
      
      // If localStorage check failed or returned false, try the Supabase API
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return false;
      }
      
      return !!data.session;
    } catch (err) {
      // In case of errors, default to not authenticated for security
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
   * Sign in with magic link (passwordless)
   */
  async signInWithOtp(email: string, redirectTo?: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo || (isBrowser ? `${window.location.origin}/auth-callback` : undefined)
        }
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