import { createClient, type User, type Session, type AuthError } from '@supabase/supabase-js';

// Environment detection
const isBrowser = typeof window !== 'undefined';

// Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
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
    // Don't throw errors for unauthenticated requests
    flowType: 'implicit',
    storage: isBrowser ? {
      getItem: (key: string) => {
        try {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        } catch (error) {
          return null;
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          // Silent fail for storage errors
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          // Silent fail for storage errors
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

// Export types for convenience
export type { User, Session, AuthError };