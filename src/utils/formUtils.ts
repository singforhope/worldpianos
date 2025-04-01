import { supabase } from './supabaseClient';
import { auth } from './auth';
import { v4 as uuidv4 } from 'uuid';
import { StorageError } from '@supabase/storage-js';

// Define window extensions for TypeScript
declare global {
  interface Window {
    checkUrlExists?: (url: string, callback: (exists: boolean) => void) => void;
    showToast?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  }
}

/**
 * Generate a unique ID with collision prevention
 * @param prefix Prefix for the ID
 * @returns A unique ID
 */
export function generateUniqueId(prefix: string = 'item'): string {
  // Use UUID v4 for guaranteed uniqueness
  return `${prefix}_${uuidv4()}`;
}

/**
 * Upload an image to Supabase storage
 * @param imageFile The file to upload
 * @param bucketName The storage bucket name
 * @param description Optional description for the image
 * @returns The public URL of the uploaded image or null if upload failed
 */
export async function uploadImage(
  imageFile: File,
  bucketName: string,
  description?: string
): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) {
    return null;
  }
  
  try {
    // Generate a unique file name
    const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    // Check if bucket exists and create if needed
    try {
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketName);
      if (bucketError && (bucketError as any).code === 'PGRST116') {
        // Bucket doesn't exist, create it
        await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      }
    } catch (bucketError) {
      console.error(`Error checking/creating bucket ${bucketName}:`, bucketError);
    }
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, imageFile);
      
    if (uploadError) {
      throw uploadError;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

/**
 * Create a media entry for an item
 * @param tableName The table to insert into (e.g., 'piano_media', 'event_media')
 * @param itemId The ID of the related item
 * @param imageUrl The URL of the uploaded image
 * @param description Optional description for the media
 * @returns The created media entry or null if creation failed
 */
export async function createMediaEntry(
  tableName: string,
  itemId: string,
  imageUrl: string,
  description?: string
): Promise<any | null> {
  if (!itemId || !imageUrl) {
    return null;
  }
  
  try {
    const itemType = tableName.split('_')[0]; // 'piano' or 'event'
    const idField = `${itemType}_id`;
    
    const { data, error } = await supabase
      .from(tableName)
      .insert({
        [idField]: itemId,
        media_type: 'image',
        url: imageUrl,
        description: description || `Image for ${itemType} ${itemId}`
      })
      .select();
      
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error) {
    console.error(`Error creating ${tableName} entry:`, error);
    return null;
  }
}

/**
 * Check if the user is authenticated
 * @returns An object with user ID if authenticated, or error if not
 */
export async function checkAuthentication(): Promise<{ userId: string | null; error: string | null }> {
  try {
    const session = await auth.getSession();
    
    if (!session) {
      return { userId: null, error: 'You must be logged in to perform this action.' };
    }
    
    return { userId: session.user.id, error: null };
  } catch (error) {
    return { 
      userId: null, 
      error: error instanceof Error ? error.message : 'Authentication error. Please try logging in again.' 
    };
  }
}

/**
 * Standard error handler for form submissions
 * @param error The error object
 * @returns A user-friendly error message
 */
export function handleFormError(error: any): string {
  if (!error) {
    return 'An unknown error occurred';
  }
  
  // Handle specific error types
  if (error.message) {
    if (error.message.includes('Location not selected')) {
      return 'Please select a location using the map.';
    } else if (error.message.includes('permission') || error.message.includes('access')) {
      return 'Permission denied. You may need to log in or check your access rights.';
    } else if (error.message.includes('network') || error.message.includes('connection')) {
      return 'Network error. Please check your internet connection.';
    } else if (error.message.includes('validation')) {
      return 'Validation error. Please check your form inputs.';
    } else if (error.message.includes('bucket')) {
      return 'Error with image storage. Please try again or skip adding an image.';
    } else if (error.message.includes('already created')) {
      return 'An item was already submitted in this session.';
    }
    
    return error.message;
  }
  
  // Handle database-specific errors
  if (error.code) {
    if (error.code === '42501' || error.code === 'PGRST301') {
      return 'Permission denied: You may need to log in to perform this action';
    } else if (error.code === '23505') {
      return 'An item with this information already exists';
    } else if (error.code === '23502') {
      return `Missing required fields: ${error.details || ''}`;
    } else if (error.code === '400') {
      return `Bad request: ${error.details || 'Check your data format'}`;
    }
    
    return `Database error (${error.code}): ${error.message || 'Unknown error'}`;
  }
  
  return 'An error occurred. Please try again.';
}

/**
 * Show a toast notification
 * @param message The message to display
 * @param type The type of toast (success, error, warning, info)
 */
export function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
  if (typeof window === 'undefined' || !window.showToast) {
    console.log(`Toast (${type}): ${message}`);
    return;
  }
  
  window.showToast(message, type);
}

/**
 * Log form data for debugging
 * @param formData The FormData object to log
 */
export function logFormData(formData: FormData): void {
  const formDataObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value instanceof File ? `File: ${value.name}` : String(value);
  });
  console.log("Form data:", formDataObj);
}

/**
 * Check if a URL exists before redirecting
 * @param url The URL to check
 * @param callback Callback function to execute with the result (true if URL exists, false otherwise)
 */
export function checkUrlExists(url: string, callback: (exists: boolean) => void): void {
  // If we're not in a browser, return false
  if (typeof window === 'undefined') {
    callback(false);
    return;
  }

  // Make the URL absolute if it's relative
  const absoluteUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  
  // Use fetch with HEAD method to check if the URL exists
  fetch(absoluteUrl, { method: 'HEAD' })
    .then(response => {
      // If the response is ok (status in the range 200-299), the URL exists
      callback(response.ok);
    })
    .catch(error => {
      // If there's an error, the URL doesn't exist or is inaccessible
      console.error(`Error checking if URL exists: ${error}`);
      callback(false);
    });
}

// Expose the function to the window object
if (typeof window !== 'undefined') {
  window.checkUrlExists = checkUrlExists;
}