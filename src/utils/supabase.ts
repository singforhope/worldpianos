// Re-export the supabase client from auth.ts
import { supabase as supabaseClient } from './auth';

// Export the supabase client
export const supabase = supabaseClient;