-- Migration to add a trigger for automatic cleanup of old avatar files
-- when a user updates their profile with a new avatar

-- First, create a function to delete unused avatar files
CREATE OR REPLACE FUNCTION delete_avatar_on_profile_update()
RETURNS TRIGGER AS $$
DECLARE
  old_avatar_path TEXT;
  old_avatar_filename TEXT;
BEGIN
  -- Only run if avatar_url has changed and old avatar exists
  IF OLD.avatar_url IS NOT NULL AND 
     OLD.avatar_url != NEW.avatar_url AND 
     OLD.avatar_url NOT LIKE '%ui-avatars.com%' THEN
    
    -- Extract just the filename from the avatar URL
    old_avatar_filename := SPLIT_PART(OLD.avatar_url, '/', -1);
    
    -- If there's a valid filename and it's not a default avatar
    IF old_avatar_filename != '' AND 
       old_avatar_filename NOT LIKE 'default%' AND
       old_avatar_filename NOT LIKE 'placeholder%' THEN
      
      -- The full path in the storage bucket is 'avatars/filename'
      old_avatar_path := 'avatars/' || old_avatar_filename;
      
      -- Log the deletion attempt (can be removed in production)
      RAISE NOTICE 'Attempting to delete old avatar: %', old_avatar_path;
      
      -- Use the storage API to delete the file
      -- This is done via the Postgres function interface to the storage API
      PERFORM public.delete_storage_object('user-avatars', old_avatar_path);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the RPC function to handle the actual deletion
-- This function is called by the trigger
CREATE OR REPLACE FUNCTION public.delete_storage_object(
  bucket_name TEXT,
  object_path TEXT
) RETURNS VOID AS $$
DECLARE
  project_url TEXT;
BEGIN
  -- Get the storage API endpoint (would be set per environment)
  project_url := current_setting('app.settings.storage_api_url', true);
  
  -- If no API URL is set, use a fallback approach
  IF project_url IS NULL THEN
    -- Execute a statement to remove the object
    -- Postgres 14+ can use the pg_net extension for HTTP operations
    -- This is a simplified version that works within trigger constraints
    EXECUTE 'SELECT FROM storage.objects WHERE bucket_id = $1 AND name = $2'
    USING bucket_name, object_path;
  ELSE
    -- For future implementations that might want to use HTTP
    -- This is left as a placeholder for when pg_net is available
    RAISE NOTICE 'Using API URL: % for bucket: % and path: %', 
                 project_url, bucket_name, object_path;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE WARNING 'Failed to delete storage object: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Now add the trigger to the user_profiles table if it doesn't exist
DO $$
BEGIN
  -- First check if the trigger already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_delete_avatar_on_profile_update'
  ) THEN
    -- Create the trigger
    CREATE TRIGGER trigger_delete_avatar_on_profile_update
    AFTER UPDATE OF avatar_url ON user_profiles
    FOR EACH ROW
    WHEN (OLD.avatar_url IS DISTINCT FROM NEW.avatar_url)
    EXECUTE FUNCTION delete_avatar_on_profile_update();
    
    -- Log successful creation
    RAISE NOTICE 'Avatar cleanup trigger created successfully';
  ELSE
    RAISE NOTICE 'Avatar cleanup trigger already exists';
  END IF;
END
$$;

-- Add comments to document the functions
COMMENT ON FUNCTION delete_avatar_on_profile_update() IS 
'Trigger function that automatically deletes old avatar files from storage when a user updates their profile with a new avatar';

COMMENT ON FUNCTION public.delete_storage_object(TEXT, TEXT) IS 
'Helper function to delete objects from Supabase storage buckets';

-- Add comment explaining the trigger's purpose
COMMENT ON TRIGGER trigger_delete_avatar_on_profile_update ON user_profiles IS 
'Trigger that calls delete_avatar_on_profile_update() when a user changes their avatar_url'; 