import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Check if the user is authenticated
 * @returns Promise<boolean> True if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

/**
 * Get the current user
 * @returns Promise<User | null> The current user or null
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

/**
 * Get the user's role
 * @returns Promise<string | null> The user's role or null
 */
export async function getUserRole(): Promise<string | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  
  if (!user) return null;
  
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return data?.role || 'user';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user'; // Default to user role
  }
}

/**
 * Check if the user is an admin
 * @returns Promise<boolean> True if the user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'admin';
}

/**
 * Create a user profile
 * @param userId The user's ID
 * @param displayName The user's display name
 * @returns Promise<any> The result of the insert operation
 */
export async function createUserProfile(userId: string, displayName: string) {
  return supabase
    .from('user_profiles')
    .insert({
      id: userId,
      display_name: displayName,
      role: 'user' // Default role
    });
}

/**
 * Sign out the current user
 * @returns Promise<void>
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/**
 * Get the user's profile
 * @param userId The user's ID
 * @returns Promise<any> The user's profile
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

/**
 * Update the user's profile
 * @param userId The user's ID
 * @param profile The profile data to update
 * @returns Promise<any> The result of the update operation
 */
export async function updateUserProfile(userId: string, profile: any) {
  return supabase
    .from('user_profiles')
    .update(profile)
    .eq('id', userId);
}