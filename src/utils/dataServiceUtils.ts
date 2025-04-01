import { PostgrestError } from '@supabase/supabase-js';

/**
 * Standard error handler for data service operations
 * @param operation The operation being performed (e.g., 'fetching', 'creating', 'updating')
 * @param resource The resource being operated on (e.g., 'piano', 'event')
 * @param error The error object
 * @param id Optional ID of the resource for specific error messages
 * @returns A standardized error object
 */
export function handleDataServiceError(
  operation: string,
  resource: string,
  error: any,
  id?: string
): { message: string; details: any } {
  // Create a base error message
  let message = `Error ${operation} ${resource}`;
  if (id) {
    message += ` with id ${id}`;
  }

  // Log the error for debugging
  console.error(message, error);

  // Check for specific error types
  if (error && error.code) {
    switch (error.code) {
      case 'PGRST301':
        console.error('Authentication error: This might be due to Row Level Security (RLS) policies requiring authentication');
        message += ': Authentication required';
        break;
      case '42501':
        console.error('Permission denied: This might be due to Row Level Security (RLS) policies');
        message += ': Permission denied';
        break;
      case '42P01':
        console.error(`Table not found: The "${resource}s" table might not exist`);
        message += ': Table not found';
        break;
      case '23505':
        message += ': Duplicate entry';
        break;
      case '23502':
        message += ': Missing required fields';
        break;
    }
  }

  // Return a standardized error object
  return {
    message,
    details: error
  };
}

/**
 * Safely handle single item results
 * @param data The data returned from a query
 * @param defaultValue The default value to return if data is null or undefined
 * @returns The data or default value
 */
export function handleSingleResult<T>(data: T | null, defaultValue: T | null = null): T | null {
  return data || defaultValue;
}

/**
 * Safely handle array results
 * @param data The data returned from a query
 * @returns The data as an array or an empty array
 */
export function handleArrayResult<T>(data: T[] | null): T[] {
  return data || [];
}

/**
 * Safely handle first item of array results
 * @param data The data returned from a query
 * @param defaultValue The default value to return if data is null, undefined, or empty
 * @returns The first item or default value
 */
export function handleFirstResult<T>(data: T[] | null, defaultValue: T | null = null): T | null {
  return (data && data.length > 0) ? data[0] : defaultValue;
}

/**
 * Check if a PostgrestError is a not found error
 * @param error The error to check
 * @returns True if the error is a not found error
 */
export function isNotFoundError(error: PostgrestError): boolean {
  return error.code === 'PGRST116' || 
         error.message.includes('not found') || 
         error.details?.includes('not found') || 
         false;
}

/**
 * Check if a PostgrestError is a permission error
 * @param error The error to check
 * @returns True if the error is a permission error
 */
export function isPermissionError(error: PostgrestError): boolean {
  return error.code === '42501' || 
         error.code === 'PGRST301' || 
         error.message.includes('permission denied') || 
         false;
}